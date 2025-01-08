const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { testController } = require("../controllers/index");
const validate = require("../middleware/validate");

// 用户验证规则
const userValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("用户名不能为空")
    .isLength({ min: 3 })
    .withMessage("用户名至少需要3个字符"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("请输入有效的邮箱地址"),
];

// 测试路由
router.get("/test", testController.getTest);

// 用户相关路由
router.post("/users", validate(userValidation), testController.createUser);
router.get("/users", testController.getUsers);

module.exports = router;
