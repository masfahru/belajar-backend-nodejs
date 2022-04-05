require("dotenv").config();
const express = require("express");

const router = express.Router();

// import middleware
const { uploadAnImage, uploadImages } = require('../middlewares/upload-image');
const countryMiddleware = require('../middlewares/country');

// Route menambahkan data pada endndpoint /
router.post("/", uploadAnImage, countryMiddleware.addCountry);

// Route menampilkan semua data pada endndpoint /
router.get("/", countryMiddleware.getAllCountry);

// Route menampilkan data berdasarkan id pada endndpoint /:id
router.get("/:id", countryMiddleware.getCountryById);

// Route menghapus data berdasarkan id pada endndpoint /:id
router.delete("/:id", countryMiddleware.deleteCountryById);

module.exports = router;