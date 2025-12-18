// models/Order.js
export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deliveryAddress: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"),
        defaultValue: "PENDING",
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
    },
    {
      tableName: "orders",
      timestamps: true,
    }
  );

  Order.associate = (db) => {
    Order.belongsTo(db.User, { foreignKey: "userId", as: "user" });
    Order.belongsTo(db.Restaurant, { foreignKey: "restaurantId", as: "restaurant" });
    Order.hasMany(db.OrderItem, {
      foreignKey: "orderId",
      as: "items",
    });
  };

  return Order;
};
