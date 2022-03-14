require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

// isNumber untuk pengecekan data
const isNumber = require('is-number');

const app = express();

// Body Parser urlencoded untuk mengambil data body dari request
// Hanya method POST yang diperbolehkan
app.post(
  "/input",
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
    const { a, b } = req.body;
    // cek jika a dan b adalah number
    // jika tidak maka kirim pesan error
    if (!isNumber(a) || !isNumber(b)) {
        next(new Error("a dan b harus berupa number atau integer"));
    }
    // Number(a) dan Number(b) untuk mengubah data string menjadi number
    const add = (a, b) => Number(a) + Number(b);
    const result = add(a, b);
    if (result % 10 === 0) {
      // trigger middleware error
      next(new Error("Hasil jumlah a dan b merupakan kelipatan dari 10"));
    } else {
      // Secara default middleware ini akan mengirimkan response 200 OK
      res.send({
        message: `Hasil jumlah a dan b adalah ${result}`,
      });
    }
  }
);

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
  console.log(`Server running on port ${process.env.PORT}`);
});
