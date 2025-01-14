const Driver = require("../models/Driver");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");

exports.driverController = {
  // 添加驾驶员
  addDriver: async (req, res, next) => {
    try {
      const { name, phone } = req.body;

      const existingDriver = await Driver.findOne({
        where: {
          phone: phone,
          name: name,
        },
      });
      if (existingDriver) {
        return next(new AppError("司机已经存在", 400));
      }

      // 创建新用户
      const driver = await Driver.create({
        name,
        phone,
      });

      logger.info("添加司机成功", { driverId: driver.id });

      res.status(201).json({
        success: true,
        message: "添加司机成功",
        data: {
          driver,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // 获取全部司机
  getAllDrivers: async (req, res, next) => {
    try {
      logger.info("获取全部司机");
      const drivers = await Driver.findAll();

      if (!drivers.length) {
        return next(new AppError("没有找到司机", 404));
      }

      res.status(200).json({
        success: true,
        count: drivers.length,
        data: drivers,
      });
    } catch (error) {
      next(error);
    }
  },

  // 获取指定司机
  getOneDriver: async (req, res, next) => {
    try {
      const driver_id = req.query.driver_id;
      logger.info("获取指定车辆", { driver_id: driver_id });
      const driver = await Driver.findOne({
        where: {
          driver_id: driver_id,
        },
      });
      if (!driver) {
        return next(new AppError("没有找到车辆", 404));
      }

      res.status(200).json({
        success: true,
        data: driver,
      });
    } catch (e) {
      next(error);
    }
  },
};
