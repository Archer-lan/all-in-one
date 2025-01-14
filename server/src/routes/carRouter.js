const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { carController } = require("../controllers/carController.js");
const validate = require("../middleware/validate");
const { protect, restrictTo } = require("../middleware/userAuth");

// 用户验证规则
const addValidation = [
  body("license_plate")
    .trim()
    .notEmpty()
    .withMessage("车牌号不能为空")
    .isLength({ min: 7, max: 8 })
    .withMessage("车牌号长度为7位或8位"),
  body("total_male").trim().notEmpty().withMessage("里程数不能为空"),
  body("status").trim().notEmpty().withMessage("车辆状态不能为空"),
];

// 添加车辆
router.post("/addCar", validate(addValidation), protect, carController.addCar);
// 获取所有车辆
router.get("/getAllCars", protect, carController.getAllCars);
// 获取指定状态车辆
router.get("/getSomeCars", protect, carController.getSomeCars);
// 获取指定车辆
router.get("/getOneCar", protect, carController.getOneCar);

module.exports = router;
