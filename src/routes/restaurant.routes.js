import express from "express";
import {
  addFoodItem,
  createRestaurant,
  deleteItem,
  GetFoodItemByRestaurantID,
  loginRestaurant,
  logoutResturant,
  updateFoodItem,
} from "../controllers/restaurants.controller.js";
import {
  restaurantSignupSchema,
  restaurantLoginSchema,
} from "../validators/restaurantValidator.js";
import { validateBody } from "../middlewares/validate.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/protect.js";

const router = express.Router();

router.post("/signup", validateBody(restaurantSignupSchema), createRestaurant);
router.post("/signin", validateBody(restaurantLoginSchema), loginRestaurant);

router.post("/add-item/:id", verifyJWT, upload.single("image"), addFoodItem);
router.post("/signout", verifyJWT, logoutResturant);
router.get("/products/:id", verifyJWT, GetFoodItemByRestaurantID);
router.delete("/delete/:id", verifyJWT, deleteItem);
router.put(
  "/update-item/:id",
  verifyJWT,
  upload.single("image"),
  updateFoodItem
);

export default router;
