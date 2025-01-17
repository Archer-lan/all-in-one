const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./src/config/db");
const indexRouter = require("./src/routes/index");
const errorHandler = require("./src/middleware/errorHandler");

// 连接数据库
connectDB();

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use("/api", indexRouter);

app.get("/", (req, res) => {
  res.json({ message: "欢迎使用 Express API" });
});

// 错误处理中间件
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
