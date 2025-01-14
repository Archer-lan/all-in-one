const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const MaintenCar = sequelize.define(
  "MaintenCar",
  {
    maintanance_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maintenance_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    repair_details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
    },
    technician_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "maintenance_records",
  }
);

module.exports = MaintenCar;
