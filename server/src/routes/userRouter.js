const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { userController } = require("../controllers/userController.js");
const validate = require("../middleware/validate");
const { protect, restrictTo } = require("../middleware/userAuth");

// 用户验证规则
const registerValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("用户名不能为空")
    .isLength({ min: 3, max: 11 })
    .withMessage("用户名至少需要3个字符"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("密码不能为空")
    .isLength({ min: 6, max: 11 })
    .withMessage("密码至少需要6个字符"),
  body("telephone")
    .trim()
    .notEmpty()
    .withMessage("手机号不能为空")
    .isMobilePhone()
    .withMessage("请输入有效的手机号"),
];

const loginValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("用户名不能为空")
    .isLength({ min: 3, max: 11 })
    .withMessage("用户名至少需要3个字符"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("密码不能为空")
    .isLength({ min: 6, max: 11 })
    .withMessage("密码至少需要6个字符"),
];

// 注册
router.post("/register", validate(registerValidation), userController.register);
// 登录
router.post("/login", validate(loginValidation), userController.login);
// 受保护的路由
// 获取自己的信息
router.get("/me", protect, userController.getMe);
// 管理员获取普通用户列表
router.get("/getUsers", protect, restrictTo(0), userController.getUsers); // 只允许权限为0的用户访问
// 管理员获取指定用户列表
router.get("/getUser", protect, restrictTo(0), userController.getUser);

module.exports = router;
