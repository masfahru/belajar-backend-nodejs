require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");

// import router
const indexRouter = require("./routers/index");
const userRouter = require("./routers/user");

// instansiasi app
const app = express();

app.use(
  bodyParser.json(),
  (req, res, next) => {
    res.header("content-type", "application/json");
    next();
  },
  indexRouter,
  userRouter
);

// tentukan port sesuai dengan .env
app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
