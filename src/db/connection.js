import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
import pg from 'pg';

dotenv.config();

const sequelize = new Sequelize({
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
        ssl: {
            require: true, 
            rejectUnauthorized: false,
        },
    },
    logging: false,
})

export const connectDb =  async () => {
    try{
        await sequelize.authenticate();
        console.log("Database connection has been established Successfully")
    }
    catch(error) {
        console.log("Unable to connect to database:", error)
    }
}

export default sequelize;