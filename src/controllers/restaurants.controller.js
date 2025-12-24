// src/controller/restaurant.controller.js
import RestaurantService from '../service/restaurant.service.js'

export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000
}

export const createRestaurant = async (req, res) => {
    try {
        console.log("req body---in controller--", req.body);

        const { name, email, password } = req.body;

        const response = await RestaurantService.createRestaurant(
            name,
            email,
            password
        );

        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.error('Error creating restaurant:', error);

        return res
            .status(500)
            .json({
                success: false,
                statusCode: 500,
                message: 'Internal server error',
            });
    }
};

export const loginRestaurant = async (req, res) => {
    try {
        const { email, password } = req.body;

        const response = await RestaurantService.loginRestaurant(
            email,
            password
        );


        return res.status(response.statusCode)
            .cookie('accessToken', response.data?.accessToken, cookieOptions)
            .json(response);

    } catch (error) {
        console.error("Error logging in restaurant:", error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
        });
    }
};

export const logoutResturant = async (req, res) => {
    try {
        const userId = req.user.id;

        const response = await RestaurantService.logoutRestaurant(userId);
        console.log(response)

        return res.status(response.statusCode)
            .clearCookie("accessToken", cookieOptions)
            .json(response)

    } catch (error) {
        console.error("Error logout in restaurant:", error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
        });
    }
}

export const addFoodItem = async (req, res) => {

    const { id } = req.params

    const resturantId = id;

    const { name, description, price } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = req.file?.path;

    //let response = resturantObj.addItem(name, description, price, resturantId, imageUrl)

    let response = await RestaurantService.addItem(name, description, price, resturantId, imageUrl)

    return res
        .status(response.statusCode)
        .json({
            success: true,
            statusCode: 200,
            message: 'Item Added Successfully',
            data: response
        });

}

export const GetFoodItemByRestaurantID = async (req, res) => {

    try {
        const { id } = req.params

        const response = await RestaurantService.getItemsByRestaurantID(id)

        return res
            .status(response.statusCode)
            .json(response);

    } catch (error) {
        console.error("Could not get products", error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
        });
    }

}

export const deleteItem = async (req, res) => {

    try {

        const { id } = req.params

        const response = await RestaurantService.deleteItemById(id)
        console.log(response)
        return res
            .status(200)
            .json(response);

    } catch (error) {
        console.error("Could not get products", error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
        });
    }
}

export const updateFoodItem = async (req, res) => {
    try {
        const { id } = req.params; // this is the FoodItem ID
        const { name, description, price } = req.body;

        const imageUrl = req.file?.path;

        // Assuming verifyJWT sets req.restaurant from the token
        const restaurantId = req.restaurant?.id;

        const response = await RestaurantService.updateItem(
            id,
            { name, description, price, imageUrl },
            restaurantId
        );

        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.error('Could not update product', error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};

export const getAllRestaurants = async (req, res) => {

    const response = await RestaurantService.allRestaurants();

    return res
        .status(response.statusCode)
        .json(
            {
                success: response?.success,
                message: response?.message,
                data: response?.data
            })
}

export const getAllFoodItems = async (req, res) => {

    const response = await RestaurantService.allFoodItems();

    return res
        .status(response.statusCode)
        .json(
            {
                success: response?.success,
                message: response?.message,
                data: response?.data
            })
}
