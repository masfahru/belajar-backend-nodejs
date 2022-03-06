require("dotenv").config();
const express = require("express");
// body-parser adalah middleware untuk menyaring data request
const bodyParser = require("body-parser");
// import middleware pertama
const middlewareHeader = require("./middlewares/headers");
// import middleware kedua
const middlewareBody = require("./middlewares/body");

const app = express();

// Middleware untuk semua method request pada url /
app.use('/', bodyParser.json(), middlewareHeader);

// Middleware untuk method POST pada url /
app.post('/', bodyParser.urlencoded({ extended: true }), middlewareBody, (req, res) => {
  // Kirimkan object request body jika method POST
  return res.send(req.body);
});

// Kirimkan header jika tidak method POST
app.use('/', (req, res) => {
  return res.send(req.headers);
});

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});