const { Sequelize } = require("sequelize");
const logger = require("./logger");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: (msg) => logger.debug(msg), // 使用logger记录SQL查询
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("数据库连接成功");
    // 同步所有模型
    await sequelize.sync({ alter: true });
    console.log("数据库模型同步完成");
  } catch (error) {
    console.error("数据库连接失败:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
