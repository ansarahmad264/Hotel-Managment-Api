// src/service/order.service.js
import db from "../models/index.js";
import { randomUUID } from "crypto";

export default class OrderService {
  /**
   * Checkout payload expected:
   * {
   *   userId: number,
   *   phone: string,                // optional for now - used for records if needed
   *   deliveryAddress: string,
   *   cartItems: [{ foodItemId: number, quantity: number }]
   * }
   *
   * Returns { success, statusCode, data: { checkoutSession, orders: [...] } }
   */
  static async checkout(payload) {
    const { userId, deliveryAddress, cartItems } = payload;

    if (!userId) {
      return { success: false, statusCode: 400, message: "userId is required" };
    }
    if (!deliveryAddress) {
      return { success: false, statusCode: 400, message: "deliveryAddress is required" };
    }
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return { success: false, statusCode: 400, message: "cartItems must be a non-empty array" };
    }

    // Unique food item ids
    const foodItemIds = [...new Set(cartItems.map((c) => c.foodItemId))];

    // Load food items
    const foodItems = await db.FoodItem.findAll({
      where: { id: foodItemIds },
    });

    if (foodItems.length !== foodItemIds.length) {
      const foundIds = new Set(foodItems.map((f) => f.id));
      const missing = foodItemIds.filter((id) => !foundIds.has(id));
      return {
        success: false,
        statusCode: 400,
        message: `Some items not found: ${missing.join(", ")}`,
      };
    }

    // Map food items by id
    const foodMap = {};
    for (const f of foodItems) {
      foodMap[f.id] = f;
    }

    // Group cart items by restaurantId
    const groups = {}; // restaurantId -> [{ foodItem, quantity }]
    for (const ci of cartItems) {
      const fi = foodMap[ci.foodItemId];
      const qty = Number(ci.quantity) || 1;
      if (!groups[fi.restaurantId]) groups[fi.restaurantId] = [];
      groups[fi.restaurantId].push({
        foodItem: fi,
        quantity: qty,
      });
    }

    const checkoutSession = randomUUID();

    // Run in a transaction
    const resultOrders = [];

    const transaction = await db.sequelize.transaction();
    try {
      for (const [restaurantId, items] of Object.entries(groups)) {
        // compute total for this restaurant
        let total = 0;
        const orderItemsPayload = [];
        for (const it of items) {
          const unitPrice = parseFloat(it.foodItem.price);
          const qty = Number(it.quantity);
          total += unitPrice * qty;
          orderItemsPayload.push({
            foodItemId: it.foodItem.id,
            quantity: qty,
            unitPrice: unitPrice.toFixed(2),
            foodName: it.foodItem.name,
          });
        }

        // create order record
        const order = await db.Order.create(
          {
            userId,
            restaurantId: Number(restaurantId),
            deliveryAddress,
            status: "PENDING",
            totalPrice: total.toFixed(2),
            checkoutSession,
          },
          { transaction }
        );

        // attach orderId to order items and bulk create
        const orderItemsToCreate = orderItemsPayload.map((oi) => ({
          ...oi,
          orderId: order.id,
        }));

        await db.OrderItem.bulkCreate(orderItemsToCreate, { transaction });

        // fetch items to include in result for convenience
        const createdItems = await db.OrderItem.findAll({
          where: { orderId: order.id },
          transaction,
        });

        resultOrders.push({
          order: order.toJSON(),
          items: createdItems.map((i) => i.toJSON()),
        });
      }

      await transaction.commit();

      return {
        success: true,
        statusCode: 201,
        data: {
          checkoutSession,
          orders: resultOrders,
        },
      };
    } catch (err) {
      await transaction.rollback();
      console.error("OrderService.checkout error:", err);
      return {
        success: false,
        statusCode: 500,
        message: "Internal server error during checkout",
      };
    }
  }

  // Fetch orders for a given restaurant (only their orders)
  static async getOrdersByRestaurant(restaurantId, { status } = {}) {
    if (!restaurantId) {
      return { success: false, statusCode: 400, message: "restaurantId is required" };
    }

    const where = { restaurantId };
    if (status) where.status = status;

    const orders = await db.Order.findAll({
      where,
      include: [
        { model: db.OrderItem, as: "items" },
        { model: db.User, as: "user", attributes: ["id", "name", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    return { success: true, statusCode: 200, data: orders };
  }

  // Update order status by restaurant (restaurant must own the order)
  static async updateOrderStatus(restaurantId, orderId, status) {
    if (!restaurantId || !orderId) {
      return { success: false, statusCode: 400, message: "restaurantId and orderId are required" };
    }

    const order = await db.Order.findOne({ where: { id: orderId, restaurantId } });
    if (!order) {
      return { success: false, statusCode: 404, message: "Order not found for this restaurant" };
    }

    if (!["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"].includes(status)) {
      return { success: false, statusCode: 400, message: "Invalid status" };
    }

    order.status = status;
    await order.save();

    return { success: true, statusCode: 200, data: order };
  }

  // Fetch all orders of a user (useful for mobile)
  static async getOrdersByUser(userId) {
    if (!userId) {
      return { success: false, statusCode: 400, message: "userId is required" };
    }

    const orders = await db.Order.findAll({
      where: { userId },
      include: [{ model: db.OrderItem, as: "items" }, { model: db.Restaurant, as: "restaurant" }],
      order: [["createdAt", "DESC"]],
    });

    return { success: true, statusCode: 200, data: orders };
  }
}
