// src/controller/restaurant.controller.js
import { uploadOnCloudinary } from '../utils/Cloudinary.js';
import RestaurantService from '../service/restaurant.service.js'

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

        const cookieOptions = {
            httpOnly: true
        }

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
        const cookieOptions = {
            httpOnly: true
        }

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

    //IMAGE FUNCTIONALITY
    const profilePicLocalpath = req.file?.path
    let imageUrl;

    if (profilePicLocalpath) {

        const profilePicture = await uploadOnCloudinary(profilePicLocalpath)

        if (!profilePicture.url) {
            throw new ApiError(400, "Error while uploading the file")
        }

        imageUrl = profilePicture.url
    }

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

        console.log(response)

        return res
            .status(response.statusCode)
            .json({
                success: true,
                statusCode: 200,
                message: 'Items Fetched Successfully',
                data: response
            });

    } catch (error) {
        console.error("Could not get products", error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
        });
    }

}
