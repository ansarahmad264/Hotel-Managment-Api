// models/User.js
import bcrypt from "bcrypt";

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
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
      tableName: "users",
      timestamps: true,
    }
  );

  // Hash password before create
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.prototype.isPasswordCorrect = async function (password, res) {
    const validateUser = await bcrypt.compare(password, this.password);

    if(!validateUser){

      return {
        status: 400,
        success: false,
        message: 'invalid credentials'
      }
    }

    return {
      status: 200,
      success: true,
      message: 'Password Correct'
    }

  };

  User.associate = (db) => {
    User.hasMany(db.Order, {
      foreignKey: "userId",
      as: "orders",
    });
  };

  return User;
};
