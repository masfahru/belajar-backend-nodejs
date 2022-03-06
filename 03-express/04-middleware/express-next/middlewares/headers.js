module.exports = (req, res, next) => {
    // tampilkan beberapa data yang telah disaring oleh body-parser
    console.log("METHOD: ", req.method);
    console.log("URL Path: ", req.path);
    console.log("Headers: ", req.headers);
  
    // gunakan next untuk lanjut ke middleware berikutnya dengan route yang sama
    next();
  };