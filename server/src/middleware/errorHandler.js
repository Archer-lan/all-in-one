const logger = require("../config/logger");
const AppError = require("../utils/AppError");

// 处理 Sequelize 错误
const handleSequelizeError = (err) => {
  if (err.name === "SequelizeValidationError") {
    const message = err.errors.map((e) => e.message).join(", ");
    return new AppError(message, 400);
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    const message = "数据已存在";
    return new AppError(message, 400);
  }
  return err;
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // 处理特定类型的错误
  if (err.name && err.name.startsWith("Sequelize")) {
    err = handleSequelizeError(err);
  }

  // 记录错误日志
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  // 开发环境返回详细错误信息
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // 生产环境只返回基本错误信息
    res.status(err.statusCode).json({
      status: err.status,
      message: err.isOperational ? err.message : "服务器内部错误",
    });
  }
};

module.exports = errorHandler; 