require("dotenv").config();
const express = require("express");

const router = express.Router();

// import middleware
const { uploadAnImage, uploadImages } = require('../middlewares/upload-image');

// Route mengupload sebuah file endpoint /single-upload
router.post("/single-upload", uploadAnImage, (req, res) => {
  const imageUrl = `${req.protocol}://${req.get("host")}/${
    process.env.UPLOAD_DIR
  }/${req.file.filename}`;
  res.send({
    message: "File berhasil diupload",
    imageUrl,
  });
});

// Route mengupload beberapa file endpoint /multi-upload
router.post("/multi-upload", uploadImages, (req, res) => {
  const imageUrls = req.files.map((file) => {
    return `${req.protocol}://${req.get("host")}/${process.env.UPLOAD_DIR}/${
      file.filename
    }`;
  });
  res.send({
    message: "File berhasil diupload",
    imageUrls,
  });
});

// Route mengupload sebuah file disertai data lain endpoint /single-upload-with-data
router.post("/single-upload-with-data", uploadAnImage, (req, res) => {
  const imageUrl = `${req.protocol}://${req.get("host")}/${
    process.env.UPLOAD_DIR
  }/${req.file.filename}`;
  res.send({
    message: "File berhasil diupload",
    imageUrl,
    data: req.body,
  });
});

module.exports = router;
