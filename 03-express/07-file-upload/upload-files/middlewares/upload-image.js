require("dotenv").config();
const path = require("path");
const multer = require("multer");

// Konfigurasi storage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(process.env.PUBLIC_DIR, process.env.UPLOAD_DIR));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

// Instansiasi multer
const multerInstance = multer({ storage });

const uploadSingleImage = (req, res, next) => {
  // Upload hanya sebuah file
  const upload = multerInstance.single("image");

  // Error Handling
  upload(req, res, (err) => {
    if (err) {
      return next(err);
    }
    return next();
  });
};

const uploadMultiImage = (req, res, next) => {
  // Upload beberapa file, maksimal 5 file
  const upload = multerInstance.array("images", 5);

  // Error Handling
  upload(req, res, (err) => {
    if (err) {
      return next(err);
    }
    return next();
  });
};

const uploadSingleImageWithData = (req, res, next) => {
  // upload file dengan key `image`
  const upload = multerInstance.single("image");

  // Error Handling
  upload(req, res, (err) => {
    // name dan email merupakan key yang ada di request body
    const { name, email } = req.body;
    // dengan kode destructuring request body di atas
    // name dan email ini bisa diakses oleh middleware selanjutnya

    // tampikan name dan email di console.log
    console.log(name, email);
    if (err) {
      return next(err);
    }
    return next();
  });
};

module.exports = {
  uploadSingleImage,
  uploadMultiImage,
  uploadSingleImageWithData,
};
