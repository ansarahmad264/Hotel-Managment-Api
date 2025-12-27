// src/routes/order.routes.js
import express from "express";
import { checkout, getRestaurantOrders, updateOrderStatus, getUserOrders } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/protect.js";

const router = express.Router();

/**
 * Mobile app -> Checkout
 * Body: { userId, deliveryAddress, cartItems: [{ foodItemId, quantity }] }
 */
router.post("/checkout", checkout);

/**
 * Restaurant -> Get orders (verifyJWT should set req.restaurant or req.user)
 * You already map /v1/api/restaurant/orders to controller in restaurant.routes.js,
 * but this route is here if you prefer direct order routes for restaurants.
 */
router.get("/restaurant", verifyJWT, getRestaurantOrders);

/**
 * Restaurant updates status
 * Body: { status: "CONFIRMED" }
 */
router.patch("/restaurant/:orderId/status", verifyJWT, updateOrderStatus);

/**
 * Get orders of a user (for mobile)
 */
router.get("/user/:userId", getUserOrders);

export default router;
