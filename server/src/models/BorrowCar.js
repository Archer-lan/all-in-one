const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const BorrowCar = sequelize.define(
  "BorrowCar",
  {
    record_id: {
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
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    borrower_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borrow_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    return_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mileage_start: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mileage_end: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "completed", "overdue"),
      allowNull: false,
    },
  },
  {
    tableName: "borrow_records",
  }
);

module.exports = BorrowCar;
