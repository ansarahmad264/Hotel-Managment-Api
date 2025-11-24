
import express from 'express';
import { createRestaurant, loginRestaurant } from '../controllers/restaurants.controller.js';
import { validateBody } from '../middlewares/validate.js';
import { restaurantSignupSchema, restaurantLoginSchema} from '../validators/restaurantValidator.js';

const router = express.Router();

router.post('/signup', validateBody(restaurantSignupSchema), createRestaurant);
router.post('/signin', validateBody(restaurantLoginSchema), loginRestaurant)

export default router;
