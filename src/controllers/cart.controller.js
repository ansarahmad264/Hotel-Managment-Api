// src/controller/cart.controller.js
import CartService from "../service/cart.service.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodItemId, quantity } = req.body;

    const response = await CartService.addToCart(
      userId,
      Number(foodItemId),
      quantity
    );

    return res.status(response.statusCode).json(response);
    
  } catch (error) {
    console.error("Could not add item to cart", error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

export const getCartById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartId } = req.params;

    const response = await CartService.getCartById(cartId, userId);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("Could not get cart", error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};
