require("dotenv").config();
const express = require("express");

// import router
const indexRouter = require("./routers/index");
const userRouter = require("./routers/user");

// instansiasi app
const app = express();

// tambahkan router index ke app
app.use("/", indexRouter);

// tambahkan router user ke app
app.use("/user", userRouter);

// tentukan port sesuai dengan .env
app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
