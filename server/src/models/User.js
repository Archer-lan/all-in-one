const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permission: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    create_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
  }
);

module.exports = User;
