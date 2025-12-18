import express from "express";
import { placeOrderFromCart, getUserOrders } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/protect.js";
const router = express.Router();

router.post("/from-cart/:cartId", verifyJWT, placeOrderFromCart);
router.get("/my", verifyJWT, getUserOrders);

export default router;
