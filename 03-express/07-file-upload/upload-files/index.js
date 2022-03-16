require("dotenv").config();
const express = require("express");
const path = require("path");

// Import router upload
const uploadRoutes = require("./routes/upload");

// Instansiasi express
const app = express();

// Built-in middleware pengganti body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk mengatur folder public
app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));

// Router
app.use(uploadRoutes);

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
  console.log("server started on port " + process.env.PORT);
});