// src/service/cart.service.js
import db from "../models/index.js";

export default class CartService {
  static async addToCart(userId, foodItemId, quantity = 1) {
    try {
      quantity = Number(quantity) || 1;

      const foodItem = await db.FoodItem.findByPk(foodItemId);

      if (!foodItem) {
        return {
          success: false,
          statusCode: 404,
          message: "Food item not found",
        };
      }

      const restaurantId = foodItem.restaurantId;
      const unitPrice = Number(foodItem.price);

      // Find existing ACTIVE cart for this user + restaurant
      let cart = await db.Cart.findOne({
        where: { userId, restaurantId, status: "ACTIVE" },
      });

      // If no cart, create one
      if (!cart) {
        cart = await db.Cart.create({
          userId,
          restaurantId,
          items: [],
          totalPrice: 0,
          status: "ACTIVE",
        });
      }

      const items = cart.items || [];

      // See if item already exists in cart
      const index = items.findIndex(
        (item) => item.foodItemId === foodItemId
      );

      if (index !== -1) {
        // Increase quantity
        items[index].quantity = Number(items[index].quantity || 1) + quantity;
      } else {
        // Add new item
        items.push({
          foodItemId,
          quantity,
          unitPrice,
        });
      }

      // Recalculate total price
      let totalPrice = 0;
      for (const item of items) {
        const q = Number(item.quantity || 1);
        const p = Number(item.unitPrice || 0);
        totalPrice += q * p;
      }

      cart.items = items;
      cart.totalPrice = totalPrice.toFixed(2);

      await cart.save();

      return {
        success: true,
        statusCode: 200,
        message: "Item added to cart successfully",
        data: cart,
      };
    } catch (error) {
      console.error("Error in CartService.addToCart:", error);

      return {
        success: false,
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  static async getCartById(cartId, userId) {
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
          message: "You are not allowed to access this cart",
        };
      }

      return {
        success: true,
        statusCode: 200,
        data: cart,
      };
    } catch (error) {
      console.error("Error in CartService.getCartById:", error);

      return {
        success: false,
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }
}
