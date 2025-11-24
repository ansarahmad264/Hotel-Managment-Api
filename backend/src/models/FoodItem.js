// models/FoodItem.js
export default (sequelize, DataTypes) => {
  const FoodItem = sequelize.define(
    "FoodItem",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "food_items",
      timestamps: true,
    }
  );

  FoodItem.associate = (db) => {
    FoodItem.belongsTo(db.Restaurant, {
      foreignKey: "restaurantId",
      as: "restaurant",
    });

    FoodItem.hasMany(db.OrderItem, {
      foreignKey: "foodItemId",
      as: "orderItems",
    });
  };

  return FoodItem;
};
