// models/Restaurant.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    "Restaurant",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "restaurants",
      timestamps: true,
    }
  );

  // Hash password
  Restaurant.beforeCreate(async (rest) => {
    rest.password = await bcrypt.hash(rest.password, 10);
  });

  Restaurant.beforeUpdate(async (rest) => {
    if (rest.changed("password")) {
      rest.password = await bcrypt.hash(rest.password, 10);
    }
  });

  Restaurant.prototype.isPasswordCorrect = function (password) {
    return bcrypt.compare(password, this.password);
  };

  Restaurant.prototype.generateAccessToken = function () {
    return jwt.sign(
      { id: this.id, name: this.name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
  };

  Restaurant.associate = (db) => {
    Restaurant.hasMany(db.FoodItem, {
      foreignKey: "restaurantId",
      as: "foodItems",
    });

    Restaurant.hasMany(db.Order, {
      foreignKey: "restaurantId",
      as: "orders",
    });
  };

  return Restaurant;
};
