// src/controllers/order.controller.js
import OrderService from "../service/order.service.js";

export const checkout = async (req, res) => {
  try {
    // Expect body: { userId, deliveryAddress, cartItems: [{ foodItemId, quantity }] }
    const payload = {
      userId: req.body.userId,
      deliveryAddress: req.body.deliveryAddress || req.body.address || req.body.delivery_address,
      cartItems: req.body.cartItems || req.body.items || [],
    };

    const response = await OrderService.checkout(payload);

    return res.status(response.statusCode).json(response);
  } catch (err) {
    console.error("checkout controller error:", err);
    return res.status(500).json({ success: false, statusCode: 500, message: "Internal server error" });
  }
};

export const getRestaurantOrders = async (req, res) => {
  try {
    // verifyJWT in routes should set req.restaurant or req.user. Accept either.
    const restaurantId = req.restaurant?.id || req.user?.id;
    const { status } = req.query;

    const response = await OrderService.getOrdersByRestaurant(restaurantId, { status });

    return res.status(response.statusCode).json(response);
  } catch (err) {
    console.error("getRestaurantOrders error:", err);
    return res.status(500).json({ success: false, statusCode: 500, message: "Internal server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const restaurantId = req.restaurant?.id || req.user?.id;
    const { orderId } = req.params;
    const { status } = req.body;

    const response = await OrderService.updateOrderStatus(restaurantId, orderId, status);

    return res.status(response.statusCode).json(response);
  } catch (err) {
    console.error("updateOrderStatus error:", err);
    return res.status(500).json({ success: false, statusCode: 500, message: "Internal server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId || req.query.userId || req.body.userId;
    const response = await OrderService.getOrdersByUser(userId);

    return res.status(response.statusCode).json(response);
  } catch (err) {
    console.error("getUserOrders error:", err);
    return res.status(500).json({ success: false, statusCode: 500, message: "Internal server error" });
  }
};
