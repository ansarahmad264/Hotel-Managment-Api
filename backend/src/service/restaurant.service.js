// src/service/restaurant.service.js
import db from '../models/index.js';

export default class RestaurantService {

    static async createRestaurant(name, email, password) {
        try {
            // Check if restaurant already exists
            const existingRestaurant = await db.Restaurant.findOne({ where: { email } });

            if (existingRestaurant) {
                return {
                    success: false,
                    statusCode: 409,
                    message: 'Restaurant already exists',
                };
            }

            // Create restaurant
            const newRestaurant = await db.Restaurant.create({ name, email, password });

            if (!newRestaurant) {
                return {
                    success: false,
                    statusCode: 500,
                    message: 'Something went wrong while creating restaurant',
                };
            }

            // Remove sensitive / unnecessary fields from response
            const {
                password: _password,
                createdAt,
                updatedAt,
                ...restaurantData
            } = newRestaurant.toJSON();

            return {
                success: true,
                statusCode: 201,
                data: restaurantData,
            };
        } catch (err) {
            console.error('Error in RestaurantService.createRestaurant:', err);

            return {
                success: false,
                statusCode: 500,
                message: 'Internal server error',
            };
        }
    }

    static async loginRestaurant(email, password) {
        try {
            // Find restaurant by email
            const restaurant = await db.Restaurant.findOne({ where: { email } });

            if (!restaurant) {
                return {
                    success: false,
                    statusCode: 404,
                    message: "Restaurant not found",
                };
            }

            // Validate password
            const isPasswordValid = await restaurant.isPasswordCorrect(password);

            if (!isPasswordValid) {
                return {
                    success: false,
                    statusCode: 401,
                    message: "Invalid email or password",
                };
            }

            // Generate JWT token
            const accessToken = restaurant.generateAccessToken();

            // Remove sensitive data
            const { password: _password, createdAt, updatedAt, ...restaurantData } =
                restaurant.toJSON();

            return {
                success: true,
                statusCode: 200,
                message: "Login successful",
                data: {
                    restaurant: restaurantData,
                    accessToken,
                },
            };

        } catch (error) {
            console.error("Error in RestaurantService.loginRestaurant:", error);

            return {
                success: false,
                statusCode: 500,
                message: "Internal server error",
            };
        }
    }

    static async logoutRestaurant(userID) {

        const user = await db.Restaurant.findOne({ where: { id: userID } })

        if (!user) {
            return {
                success: false,
                statusCode: 500,
                message: 'user not found',
            }
        }

        return { success: true, statusCode: 200, message: "User logged out successfully" };
    }

    static async addItem(name, description, price, restaurantId, imageUrl) {

        try {
            const newItem = await db.FoodItem.create({ name, description, price, restaurantId, imageUrl })

            if (!newItem) {
                return {
                    success: false,
                    statusCode: 500,
                    message: 'Something went wrong while adding Food item',
                }
            }

            return {
                success: true,
                statusCode: 201,
                data: newItem,
            };
        } catch (error) {
            console.error("Error in RestaurantService.loginRestaurant:", error);

            return {
                success: false,
                statusCode: 500,
                message: "Internal server error",
            };
        }
    }

    static async getItemsByRestaurantID(id) {

        const items = await db.FoodItem.findAll({ where: { restaurantId: id } })

        if (!items) {
            return {
                success: false,
                statusCode: 500,
                message: 'no Items found',
            }
        }

        return {
            success: true,
            statusCode: 201,
            data: items,
        };
    }

}