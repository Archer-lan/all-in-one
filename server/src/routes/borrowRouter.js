const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { borrowController } = require("../controllers/borrowController.js");
const validate = require("../middleware/validate");
const { protect, restrictTo } = require("../middleware/userAuth");

// 借用规则验证
const borrowValidation = [
  body("car_id").notEmpty().withMessage("车辆ID不能为空"),
  body("driver_id").notEmpty().withMessage("司机ID不能为空"),
  body("borrower_name").notEmpty().withMessage("借用人姓名不能为空"),
  body("borrow_time")
    .notEmpty()
    .withMessage("借用开始时间不能为空")
    .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
    .withMessage("借用开始时间格式不正确"),
  body("end_time")
    .notEmpty()
    .withMessage("预计结束时间不能为空")
    .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
    .withMessage("预计结束时间格式不正确"),
  body("mileage_start").notEmpty().withMessage("起始里程不能为空"),
];

// 借车
router.post(
  "/borrow",
  validate(borrowValidation),
  protect,
  borrowController.borrowCar
);

// 还车
router.post("/returnCar", protect, borrowController.returnCar);
// 获取所有借用记录
router.get("/getBorrowRecords", protect, borrowController.getBorrowRecords);
// 获取指定车辆借用记录
router.get(
  "/getCarBorrowRecords",
  protect,
  borrowController.getCarBorrowRecords
);
// 查询车辆在指定时间段内是否可用
router.get(
  "/checkCarAvailability",
  protect,
  borrowController.checkCarAvailability
);
// 获取车辆可用时间段
router.get(
  "/getCarAvailableTimeSlots",
  protect,
  borrowController.getCarAvailableTimeSlots
);
module.exports = router;
