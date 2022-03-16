require("dotenv").config();
const express = require("express");

// import juga middleware yang telah kita buat
const {
  uploadSingleImage,
  uploadMultiImage,
  uploadSingleImageWithData,
} = require("../middlewares/upload-image");

// buat instance router
const router = express.Router();

// route endpoint /single-upload
router.post("/single-upload", uploadSingleImage, (req, res) => {
  res.status(200).json({
    message: "File uploaded successfully",
    imageUrl: `http://localhost:${process.env.PORT}/${process.env.UPLOAD_DIR}/${req.file.filename}`,
  });
});

// route endpoint /multi-upload
router.post("/multi-upload", uploadMultiImage, (req, res) => {
  // buat variabel berisi array url gambar
  const imageUrls = [];

  // masukkan semua url gambar ke dalam array
  req.files.forEach((file) => {
    imageUrls.push(
      `http://localhost:${process.env.PORT}/${process.env.UPLOAD_DIR}/${file.filename}`
    );
  });

  // tambahkan images ke response
  res.status(200).json({
    message: "File uploaded successfully",
    imageUrls,
  });
});

// route endpoint /single-upload-with-data
router.post(
  "/single-upload-with-data",
  uploadSingleImageWithData,
  (req, res) => {
    // dapatkan name dan email dari request body
    const { name, email } = req.body;

    res.status(200).json({
      message: "File uploaded successfully",
      name,
      email,
      imageUrl: `http://localhost:${process.env.PORT}/${process.env.UPLOAD_DIR}/${req.file.filename}`,
    });
  }
);

module.exports = router;