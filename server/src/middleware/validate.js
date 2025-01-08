const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

const validate = (validations) => {
  return async (req, res, next) => {
    // 执行所有验证
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const messages = errors.array().map((err) => err.msg);
    next(new AppError(messages.join(", "), 400));
  };
};

module.exports = validate;
