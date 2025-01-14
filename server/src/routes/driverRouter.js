const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { driverController } = require("../controllers/driverController.js");
const validate = require("../middleware/validate");
const { protect, restrictTo } = require("../middleware/userAuth");

// 用户验证规则
const addValidation = [
  body("name").trim().notEmpty().withMessage("姓名不能为空"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("电话号码不能为空")
    .isMobilePhone()
    .withMessage("号码格式错误请重新输入"),
];

// 添加司机
router.post(
  "/addDriver",
  validate(addValidation),
  protect,
  driverController.addDriver
);
// 获取所有司机
router.get("/getAllDrivers", protect, driverController.getAllDrivers);
// 获取指定车辆
router.get("/getOneDriver", protect, driverController.getOneDriver);

module.exports = router;
