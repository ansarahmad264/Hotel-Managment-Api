// src/service/order.service.js
import db from "../models/index.js";

export default class OrderService {
  /**
   * Create an order from a cart
   * @param {number} cartId
   * @param {number} userId - must match the cart's userId
   * @param {string} deliveryAddress
   */
  static async createOrderFromCart(cartId, userId, deliveryAddress) {
    try {
      const cart = await db.Cart.findByPk(cartId);

      if (!cart) {
        return {
          success: false,
          statusCode: 404,
          message: "Cart not found",
        };
      }

      if (cart.userId !== userId) {
        return {
          success: false,
          statusCode: 403,
          message: "You are not allowed to place order for this cart",
        };
      }

      if (cart.status !== "ACTIVE") {
        return {
          success: false,
          statusCode: 400,
          message: "Cart is not active",
        };
      }

      const items = cart.items || [];

      if (!items.length) {
        return {
          success: false,
          statusCode: 400,
          message: "Cart is empty",
        };
      }

      // Recalculate totalPrice to be safe
      let totalPrice = 0;
      for (const item of items) {
        const qty = Number(item.quantity || 1);
        const price = Number(item.unitPrice || 0);
        totalPrice += qty * price;
      }

      // Create order
      const order = await db.Order.create({
        userId,
        restaurantId: cart.restaurantId,
        deliveryAddress,
        totalPrice,
        status: "PENDING",
      });

      // Create order items
      const orderItemsPayload = items.map((item) => ({
        orderId: order.id,
        foodItemId: item.foodItemId,
        quantity: item.quantity || 1,
        unitPrice: item.unitPrice,
      }));

      await db.OrderItem.bulkCreate(orderItemsPayload);

      // Mark cart as ORDERED
      cart.status = "ORDERED";
      await cart.save();

      // Fetch full order with relations
      const fullOrder = await db.Order.findByPk(order.id, {
        include: [
          {
            model: db.OrderItem,
            as: "items",
            include: [{ model: db.FoodItem, as: "foodItem" }],
          },
          { model: db.User, as: "user", attributes: ["id", "name", "email"] },
          {
            model: db.Restaurant,
            as: "restaurant",
            attributes: ["id", "name", "email"],
          },
        ],
      });

      return {
        success: true,
        statusCode: 201,
        message: "Order placed successfully",
        data: fullOrder,
      };
    } catch (error) {
      console.error("Error in OrderService.createOrderFromCart:", error);

      return {
        success: false,
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  /**
   * Get all orders for a restaurant
   */
  static async getOrdersForRestaurant(restaurantId) {
    try {
      const orders = await db.Order.findAll({
        where: { restaurantId },
        include: [
          {
            model: db.OrderItem,
            as: "items",
            include: [{ model: db.FoodItem, as: "foodItem" }],
          },
          { model: db.User, as: "user", attributes: ["id", "name", "email"] },
        ],
        order: [["createdAt", "DESC"]],
      });

      return {
        success: true,
        statusCode: 200,
        data: orders,
      };
    } catch (error) {
      console.error("Error in OrderService.getOrdersForRestaurant:", error);

      return {
        success: false,
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  /**
   * Get all orders for a user
   */
  static async getOrdersForUser(userId) {
    try {
      const orders = await db.Order.findAll({
        where: { userId },
        include: [
          {
            model: db.OrderItem,
            as: "items",
            include: [{ model: db.FoodItem, as: "foodItem" }],
          },
          {
            model: db.Restaurant,
            as: "restaurant",
            attributes: ["id", "name", "email"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return {
        success: true,
        statusCode: 200,
        data: orders,
      };
    } catch (error) {
      console.error("Error in OrderService.getOrdersForUser:", error);

      return {
        success: false,
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }
}
