const User = require("../models/User");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");

exports.testController = {
  getTest: (req, res) => {
    res.json({ message: "来自控制器的响应" });
  },

  // 创建用户
  createUser: async (req, res, next) => {
    try {
      logger.info("创建用户", { body: req.body });
      const user = await User.create(req.body);

      logger.info("用户创建成功", { userId: user.id });
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // 获取所有用户
  getUsers: async (req, res, next) => {
    try {
      logger.info("获取用户列表");
      const users = await User.findAll();

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
};
