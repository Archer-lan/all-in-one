const { verifyToken } = require("../config/jwt");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const protect = async (req, res, next) => {
  try {
    // 获取token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("请先登录", 401));
    }

    // 验证token
    const decoded = verifyToken(token);

    // 检查用户是否存在
    const user = await User.findOne({
      where: {
        userid: decoded.userId,
        use_state: "0",
      },
    });

    if (!user) {
      return next(new AppError("用户不存在或已被禁用", 401));
    }

    // 将用户信息添加到请求对象中
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// 权限验证中间件
const restrictTo = (...permissions) => {
  return (req, res, next) => {
    if (!permissions.includes(req.user.permission)) {
      return next(new AppError("没有操作权限", 403));
    }
    next();
  };
};

module.exports = { protect, restrictTo };
