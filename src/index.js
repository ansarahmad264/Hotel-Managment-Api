import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from "cors";
//import Routes
import restaurantRouter from './routes/restaurant.routes.js';
import orderRouter from "./routes/order.routes.js"
import cartRouter from './routes/cart.routes.js'
import { connectDb } from './db/connection.js';

dotenv.config()

// app
const app = express();


// middlewares
app.use(express.static("public"))
app.use(express.json({ limit: "50mb" }));
app.use(urlencoded({ limit: '50mb', extended: true }))

// cors
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

app.use(cookieParser())

app.use('/v1/api', restaurantRouter)
app.use('/v1/api', orderRouter)
app.use('/v1/api', cartRouter)


connectDb()
    .then(() => {

        app.get("/", (req, res) => {
            res.status(200).json({ status: 200, success: true, message: "Hello from Crazy" })
        })

        app.listen(process.env.PORT, () => {
            console.log(`🌐 HTTP server running at http://localhost:${process.env.PORT}`)
        })
    })

export default app;

