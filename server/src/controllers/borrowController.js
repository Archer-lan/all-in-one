const BorrowCar = require("../models/BorrowCar");
const Car = require("../models/Car");
const Driver = require("../models/Driver");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");
const { Op } = require("sequelize");

const BORROW_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  OVERDUE: "overdue",
};

exports.borrowController = {
  // 借车
  borrowCar: async (req, res, next) => {
    try {
      const {
        car_id,
        driver_id,
        borrower_name,
        borrow_time,
        end_time,
        mileage_start,
      } = req.body;

      // 检查时间格式是否合法
      if (new Date(end_time) <= new Date(borrow_time)) {
        return next(new AppError("结束时间必须晚于开始时间", 400));
      }

      // 检查该时间段是否可用
      const conflictingBookings = await BorrowCar.findAll({
        where: {
          car_id,
          status: BORROW_STATUS.ACTIVE,
          [Op.or]: [
            { borrow_time: { [Op.between]: [borrow_time, end_time] } },
            { end_time: { [Op.between]: [borrow_time, end_time] } },
            {
              [Op.and]: [
                { borrow_time: { [Op.lte]: borrow_time } },
                { end_time: { [Op.gte]: end_time } },
              ],
            },
          ],
        },
      });

      if (conflictingBookings.length > 0) {
        return next(new AppError("该时间段车辆已被预订", 400));
      }

      // 检查车辆是否存在且可用
      const car = await Car.findOne({
        where: {
          car_id,
          status: "available",
        },
      });

      if (!car) {
        return next(new AppError("车辆不存在或不可用", 400));
      }

      // 检查司机是否存在
      const driver = await Driver.findByPk(driver_id);
      if (!driver) {
        return next(new AppError("司机不存在", 400));
      }

      // 创建借车记录
      const borrowRecord = await BorrowCar.create({
        car_id,
        driver_id,
        borrower_name,
        borrow_time,
        end_time,
        mileage_start,
        status: BORROW_STATUS.ACTIVE,
      });

      // 更新车辆状态为使用中
      await car.update({ status: "in_use" });

      logger.info("借车成功", {
        recordId: borrowRecord.record_id,
        carId: car_id,
        driverId: driver_id,
      });

      res.status(201).json({
        success: true,
        message: "借车成功",
        data: borrowRecord,
      });
    } catch (error) {
      next(error);
    }
  },

  // 还车
  returnCar: async (req, res, next) => {
    try {
      const { record_id, return_time, mileage_end } = req.body;

      // 查找借车记录
      const borrowRecord = await BorrowCar.findOne({
        where: {
          record_id,
          status: BORROW_STATUS.ACTIVE,
        },
      });

      if (!borrowRecord) {
        return next(new AppError("借车记录不存在或已完成", 400));
      }

      // 更新借车记录
      await borrowRecord.update({
        return_time,
        mileage_end,
        status: BORROW_STATUS.COMPLETED,
      });

      // 更新车辆状态为可用
      await Car.update(
        { status: "available" },
        { where: { car_id: borrowRecord.car_id } }
      );

      logger.info("还车成功", {
        recordId: record_id,
        carId: borrowRecord.car_id,
      });

      res.status(200).json({
        success: true,
        message: "还车成功",
        data: borrowRecord,
      });
    } catch (error) {
      next(error);
    }
  },

  // 获取所有借车记录
  getBorrowRecords: async (req, res, next) => {
    try {
      const records = await BorrowCar.findAll({
        include: [
          { model: Car, attributes: ["license_plate", "model"] },
          { model: Driver, attributes: ["name", "phone"] },
        ],
        order: [["record_id", "DESC"]],
      });

      res.status(200).json({
        success: true,
        count: records.length,
        data: records,
      });
    } catch (error) {
      next(error);
    }
  },

  // 获取指定车辆的借车记录
  getCarBorrowRecords: async (req, res, next) => {
    try {
      const { car_id } = req.params;

      const records = await BorrowCar.findAll({
        where: { car_id },
        include: [{ model: Driver, attributes: ["name", "phone"] }],
        order: [["record_id", "DESC"]],
      });

      if (!records.length) {
        return next(new AppError("未找到该车辆的借车记录", 404));
      }

      res.status(200).json({
        success: true,
        count: records.length,
        data: records,
      });
    } catch (error) {
      next(error);
    }
  },

  // 查询车辆在指定时间段的可用性
  checkCarAvailability: async (req, res, next) => {
    try {
      const { car_id, start_time, end_time } = req.query;

      // 检查时间格式是否合法
      if (new Date(end_time) <= new Date(start_time)) {
        return next(new AppError("结束时间必须晚于开始时间", 400));
      }

      // 首先检查车辆是否存在
      const car = await Car.findByPk(car_id);
      if (!car) {
        return next(new AppError("车辆不存在", 404));
      }

      // 检查车辆是否处于维修状态
      if (car.status === "under_maintenance") {
        return res.status(200).json({
          success: true,
          data: {
            car_id,
            isAvailable: false,
            reason: "车辆正在维修中",
            start_time,
            end_time,
          },
        });
      }

      // 查找在指定时间段内的借车记录
      const conflictingBookings = await BorrowCar.findAll({
        where: {
          car_id,
          status: BORROW_STATUS.ACTIVE,
          [Op.or]: [
            { borrow_time: { [Op.between]: [start_time, end_time] } },
            { end_time: { [Op.between]: [start_time, end_time] } },
            {
              [Op.and]: [
                { borrow_time: { [Op.lte]: start_time } },
                { end_time: { [Op.gte]: end_time } },
              ],
            },
          ],
        },
        include: [
          {
            model: Driver,
            attributes: ["name", "phone"],
          },
        ],
      });

      const isAvailable = conflictingBookings.length === 0;

      res.status(200).json({
        success: true,
        data: {
          car_id,
          isAvailable,
          current_status: car.status,
          reason: isAvailable ? null : "该时间段已被预订",
          conflictingBookings: isAvailable
            ? []
            : conflictingBookings.map((booking) => ({
                record_id: booking.record_id,
                borrow_time: booking.borrow_time,
                end_time: booking.end_time,
                driver: booking.Driver,
              })),
          start_time,
          end_time,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // 获取车辆可用时间段
  getCarAvailableTimeSlots: async (req, res, next) => {
    try {
      const { car_id, start_date, end_date } = req.query;

      // 查找在指定日期范围内的所有借车记录
      const bookings = await BorrowCar.findAll({
        where: {
          car_id,
          status: BORROW_STATUS.ACTIVE,
          [Op.or]: [
            { borrow_time: { [Op.between]: [start_date, end_date] } },
            { end_time: { [Op.between]: [start_date, end_date] } },
          ],
        },
        order: [["borrow_time", "ASC"]],
      });

      // 计算可用时间段
      const busyTimeSlots = bookings.map((booking) => ({
        record_id: booking.record_id,
        start: booking.borrow_time,
        end: booking.end_time,
        actual_return: booking.return_time,
      }));

      // 检查车辆当前状态
      const car = await Car.findByPk(car_id);
      if (!car) {
        return next(new AppError("车辆不存在", 404));
      }

      res.status(200).json({
        success: true,
        data: {
          car_id,
          car_status: car.status,
          busy_time_slots: busyTimeSlots,
          start_date,
          end_date,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
