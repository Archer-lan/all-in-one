const bcrypt = require("bcryptjs");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");
const { generateToken } = require("../config/jwt");

exports.userController = {
  // 用户注册
  register: async (req, res, next) => {
    try {
      const { username, password, telephone } = req.body;

      // 检查用户是否已存在
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return next(new AppError("用户名已存在", 400));
      }

      // 密码加密
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);

      // 创建新用户
      const user = await User.create({
        username,
        password: hashedPassword,
        telephone,
        permission: 1,
        create_time: new Date().toISOString(),
        use_state: "0",
      });

      // 生成token
      const token = generateToken(user.userid);

      logger.info("用户注册成功", { userId: user.userid });

      res.status(201).json({
        success: true,
        message: "注册成功",
        data: {
          userid: user.userid,
          username: user.username,
          telephone: user.telephone,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // 用户登录
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      // 查找用户
      const user = await User.findOne({
        where: {
          username,
          use_state: "0",
        },
      });

      // 验证密码
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError("用户名或密码错误", 401));
      }

      // 生成token
      const token = generateToken(user.userid);

      logger.info("用户登录成功", { userId: user.userid });

      res.status(200).json({
        success: true,
        message: "登录成功",
        data: {
          userid: user.userid,
          username: user.username,
          telephone: user.telephone,
          permission: user.permission,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // 获取当前用户信息
  getMe: async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        data: {
          userid: req.user.userid,
          username: req.user.username,
          telephone: req.user.telephone,
          permission: req.user.permission,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // 获取普通用户列表
  getUsers: async (req, res, next) => {
    try {
      logger.info("获取普通用户列表");
      const users = await User.findAll({
        where: {
          use_state: 0,
        },
      });

      if (!users.length) {
        return next(new AppError("没有找到用户", 404));
      }

      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  //获取指定用户
  getUser: async (req, res, next) => {
    try {
      logger.info("获取指定用户", { username: req.query.username });
      const user = await User.findOne({
        where: {
          username: req.query.username,
          use_state: 0,
        },
      });

      if (!user) {
        return next(new AppError("没有找到用户", 404));
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
