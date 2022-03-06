// aktifkan dotenv
require("dotenv").config();

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // Jika portnya 5000 maka kita berada di production, selainnya berarti development
  let status = process.env.PORT == 5000 ? "Production" : "Development";
  res.send(`Hello World! This is ${status} App !`);
});

// Tambahkan server ke port
app.listen(process.env.PORT, function () {
  console.log(`Server berjalan di port: ${process.env.PORT}`);
});
