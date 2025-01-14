const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Driver = sequelize.define(
  "Driver",
  {
    driver_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "driver",
  }
);

module.exports = Driver;
