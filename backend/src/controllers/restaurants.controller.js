// src/controller/restaurant.controller.js
import RestaurantService from '../service/restaurant.service.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.js';

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

    const { resturantId } = req.params

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

    let resturantObj = new RestaurantService();

    let response = resturantObj.addItem(name, description, price, resturantId, imageUrl)

    return res
        .status(response.statusCode)
        .json({
            success: true,
            statusCode: 200,
            message: 'Item Added Successfully',
            data: response
        });

}
