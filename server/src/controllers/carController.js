const Car = require("../models/Car");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");

const CARSTATUS = {
  0: "available",
  1: "in_use",
  2: "under_maintenance",
};

exports.carController = {
  // 添加车辆
  addCar: async (req, res, next) => {
    try {
      const { license_plate, model, total_male, status } = req.body;

      const existingCar = await Car.findOne({
        where: {
          license_plate: license_plate,
        },
      });
      if (existingCar) {
        return next(new AppError("车辆已存在", 400));
      }

      // 创建新用户
      const car = await Car.create({
        license_plate,
        model,
        total_male,
        status: CARSTATUS[status],
      });

      logger.info("添加车辆成功", { carId: car.car_id });

      res.status(201).json({
        success: true,
        message: "添加车辆成功",
        data: {
          car_id: car.car_id,
          license_plate: car.license_plate,
          model: car.model,
          total_male: car.total_male,
          status: car.status,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // 获取全部车辆
  getAllCars: async (req, res, next) => {
    try {
      logger.info("获取全部车辆列表");
      const cars = await Car.findAll();

      if (!cars.length) {
        return next(new AppError("没有找到车辆", 404));
      }

      res.status(200).json({
        success: true,
        count: cars.length,
        data: cars,
      });
    } catch (error) {
      next(error);
    }
  },

  //获取指定状态车辆
  getSomeCars: async (req, res, next) => {
    try {
      const status = CARSTATUS[req.query.status];
      logger.info("获取车辆列表", { status: status });
      const cars = await Car.findAll({
        where: {
          status: status,
        },
      });

      if (!cars.length) {
        return next(new AppError("没有找到车辆", 404));
      }

      res.status(200).json({
        success: true,
        count: cars.length,
        data: cars,
      });
    } catch (error) {
      next(error);
    }
  },

  // 获取指定车辆
  getOneCar: async (req, res, next) => {
    try {
      const car_id = req.query.car_id;
      logger.info("获取指定车辆", { car_id: car_id });
      const car = await Car.findOne({
        where: {
          car_id: car_id,
        },
      });
      if (!car) {
        return next(new AppError("没有找到车辆", 404));
      }
      res.status(200).json({
        success: true,
        data: car,
      });
    } catch (e) {
      next(error);
    }
  },
};
