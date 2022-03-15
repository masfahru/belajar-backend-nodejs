require("dotenv").config();
const express = require("express");

const singleUpload = require("../middlewares/single-upload");

const router = express.Router();

router.post("/single-upload", singleUpload, (req, res) => {
  res.status(200).json({
    message: "File uploaded successfully",
    imageUrl: `http://localhost:${process.env.PORT}/${process.env.UPLOAD_DIR}/${req.file.filename}`,
  });
});

module.exports = router;