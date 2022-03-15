// create a middleware to upload a single file using multer
// put image to env UPLOAD_DIR
// return the path of the image
require("dotenv").config();
const path = require("path");
const multer = require("multer");

module.exports = (req, res, next) => {
    // create a storage object
    // destination is the path to the folder where the file will be stored
    // filename is the name of the file on the server
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(process.env.PUBLIC_DIR, process.env.UPLOAD_DIR));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    });
  
    // create a multer object
    // since we are only uploading a single file,
    // we can set the fileFilter to accept only a single file
    const upload = multer({
      storage: storage,
    }).single("image");
  
    // the middleware function
    upload(req, res, (err) => {
      if (err) {
        next(err);
      }
      next();
    });
  };
  