// models/itemCart.js
export default (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
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
      // Array of items: [{ foodItemId, quantity, unitPrice }]
      items: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "ORDERED", "CANCELLED"),
        defaultValue: "ACTIVE",
      },
    },
    {
      tableName: "carts",
      timestamps: true,
    }
  );

  Cart.associate = (db) => {
    Cart.belongsTo(db.User, { foreignKey: "userId", as: "user" });
    Cart.belongsTo(db.Restaurant, {
      foreignKey: "restaurantId",
      as: "restaurant",
    });
  };

  return Cart;
};
