require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// import routes
const indexRouter = require("./routes/index");

// ubah raw request menjadi json
app.use(express.json());

// Middleware menjadikan file public bisa diakses oleh client
app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));

// Route ada di sini
app.use("/", indexRouter);

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).send({
    message: "Route tidak ditemukan. Periksa kembali URL yang Anda masukkan.",
  });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({
    message: err.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});