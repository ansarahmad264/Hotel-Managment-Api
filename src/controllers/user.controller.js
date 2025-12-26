import { where } from "sequelize";
import db from "../models/index.js";

export const createUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await db.User.findOne({ where: { email } });

        if (existingUser) {
            return res
                .json({ success: false, statusCode: 400, message: 'user already exist'});
        }
        
        const newUser = await db.User.create({
            name,
            email,
            password
        });
        
        if (!newUser) {
            return res
                .json({ success: true, statusCode: 201, message: 'Something went wrong while creating user'});
        }

        const { createdAt, updatedAt, password: _password, refreshToken, ...userData } = newUser.toJSON();
        
        return res
                .json({ success: true, statusCode: 201, data: userData });

    }
    catch (error) {

        console.error('Error creating user:', error);

        return res
            .status(error.statusCode || 500)
            .json({ success: false, statusCode: error.statusCode, message: error.message || 'Internal server error' });
    }
};

export const loginUser = async ( req, res) => {
    const { email, password} = req.body;

    const response = await db.User.findOne({where: {email}})

    if(!response){
        return res.json({
            status : 400,
            sucess: false,
            messgae: 'user not found'
        })
    }

    const validateUser = await response.isPasswordCorrect(password)
    
    if(validateUser.success == false){
        return res.json(validateUser)
    }

    const { createdAt, updatedAt, password: _password, ...userData } = response.toJSON();

    return res.json({
        status: 200,
        success: true,
        message: 'user logged in successfully',
        data: userData
    })
}