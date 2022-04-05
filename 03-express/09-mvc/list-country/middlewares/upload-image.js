// require yang dibutuhkan
require("dotenv").config();
const path = require("path");
const multer = require("multer");

// Instansiasi multer diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(process.env.PUBLIC_DIR, process.env.UPLOAD_DIR));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// Instansiasi multer
const multerInstance = multer({ storage: storage });

// Middlware untuk mengupload sebuah file
const uploadAnImage = (req, res, next) => {
  multerInstance.single("image")(req, res, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

// User mengupload beberapa file
const uploadImages = (req, res, next) => {
  multerInstance.array("images")(req, res, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

module.exports = { uploadAnImage, uploadImages };