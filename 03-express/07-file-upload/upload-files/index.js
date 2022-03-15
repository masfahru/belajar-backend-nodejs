require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// routes image upload
const imageUpload = require("./routes/image-upload");

app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(imageUpload);

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).send({
    message: "Route tidak ditemukan. Periksa kembali URL yang Anda masukkan."
  });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({
    message: err.message
  });
});

app.listen(process.env.PORT, () => {
  console.log("server started on port " + process.env.PORT);
});

