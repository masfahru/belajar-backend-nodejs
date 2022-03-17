require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

// import router
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

const app = express();

app.use(bodyParser.json());
// Routes di bawah sini
app.use(userRouter, indexRouter) ;

// Middleware Not Found
app.use((req, res, next) => {
  // Not Found statusnya 404
  res.status(404).send({
    message: "Halaman tidak ditemukan.",
  });
});

// Middleware Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  // Status 500 Internal Server Error
  res.status(500).send({
    message: "Terjadi kesalahan pada server.",
  });
});


app.listen(process.env.PORT, () => {
  console.log("Server berjalan di PORT " + process.env.PORT);
})