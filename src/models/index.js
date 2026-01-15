// models/index.js
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

import UserModel from './user.js'
import RestaurantModel from "./Restaurant.js";
import FoodItemModel from "./FoodItem.js";
import OrderModel from "./Order.js";
import OrderItemModel from "./OrderItem.js";
import itemCartModel from "./itemCart.js";


const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize all models
db.User = UserModel(sequelize, DataTypes);
db.Restaurant = RestaurantModel(sequelize, DataTypes);
db.FoodItem = FoodItemModel(sequelize, DataTypes);
db.Order = OrderModel(sequelize, DataTypes);
db.OrderItem = OrderItemModel(sequelize, DataTypes);
db.itemCart = itemCartModel(sequelize,DataTypes);

await db.sequelize.sync();  // IMPORTANT
console.log("All models synchronized");

// Run associations
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
