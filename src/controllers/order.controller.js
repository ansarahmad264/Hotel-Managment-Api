// src/controller/order.controller.js
import OrderService from "../service/order.service.js";

/**
 * User: place an order using a cart
 * Route example: POST /orders/from-cart/:cartId
 * Body: { deliveryAddress: "..." }
 */
export const placeOrderFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { deliveryAddress } = req.body;

    // Assumes user auth middleware sets req.user
    const userId = req.user.id;

    const response = await OrderService.createOrderFromCart(
      cartId,
      userId,
      deliveryAddress
    );

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("Could not place order from cart", error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

/**
 * Restaurant: get all orders for this restaurant
 * Route example: GET /restaurant/orders
 */
export const getRestaurantOrders = async (req, res) => {
  try {
    // Assumes restaurant auth middleware sets req.restaurant
    const restaurantId = req.restaurant.id;

    const response = await OrderService.getOrdersForRestaurant(restaurantId);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("Could not get restaurant orders", error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

/**
 * User: get all their orders
 * Route example: GET /orders/my
 */
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const response = await OrderService.getOrdersForUser(userId);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("Could not get user orders", error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};
