const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Car = sequelize.define(
  "Car",
  {
    car_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    license_plate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_male: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "in_use", "under_maintenance"),
      allowNull: false,
    },
  },
  {
    tableName: "car",
  }
);

module.exports = Car;
