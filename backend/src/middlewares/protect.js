import jwt from "jsonwebtoken";
import db from "../models/index.js";
import jwt from 'jsonwebtoken'
import db from '../models/index.js'

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res
                .status(401)
                .json({ success: false, statusCode: 401, message: 'Unathurized Request' })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken, decodedToken.id)
        const user = await db.Restaurant.findOne({ where: { id: decodedToken.id } });
        
        if (!user) {
            return res
                .status(401)
                .json({ success: false, statusCode: 401, message: 'Invalid access token' });
        }

        req.user = user

        next()

    } catch (error) {

        console.error('JWT verification failed:', error.message);

    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid or expired token",
    });
  }
};
