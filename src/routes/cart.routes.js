// src/routes/cart.routes.js
import express from "express";
import { addToCart, getCartById } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/protect.js";

const router = express.Router();

// User clicks on "Add to cart" for a food item
// Body: { foodItemId, quantity }
router.post("/add", verifyJWT, addToCart);

// (Optional) Get cart details (for showing cart on frontend)
router.get("/:cartId", verifyJWT, getCartById);

export default router;
