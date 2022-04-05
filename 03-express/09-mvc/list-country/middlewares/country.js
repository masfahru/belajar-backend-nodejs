// require yang dibutuhkan
require("dotenv").config();

// import class country
const Country = require('../models/country');

// buat middleware dapatkan semua data country
const getAllCountry = (req, res, next) => {
  // buat variable untuk menampung semua data country
  const countries = Country.fetchAll();

  // kirimkan data ke client
  res.status(200).json({
    status: 'success',
    data: {
      countries
    }
  });
}

// buat middleware untuk mendapatkan data country berdasarkan id
const getCountryById = (req, res, next) => {
  // buat variable untuk menampung data country
  const country = Country.findById(req.params.id);

  // kirimkan data ke client
  res.status(200).json({
    status: 'success',
    data: {
      country
    }
  });
}

// middleware untuk meghapus data country berdasarkan id
const deleteCountryById = (req, res, next) => {
  // buat variable untuk menampung data country
  const country = Country.deleteById(req.params.id);

  // kirimkan data ke client
  res.status(200).json({
    status: 'success delete country'
  });
}

// buat middleware untuk menambahkan data country
const addCountry = (req, res, next) => {
  // dapatkan url gambar dari middleware upload-image
   const flagUrl = `${req.protocol}://${req.get("host")}/${
    process.env.UPLOAD_DIR
  }/${req.file.filename}`;
  // buat variable untuk menampung data country
  const country = new Country(req.body.name, flagUrl, req.body.language, req.body.continent);

  // simpan data country ke database
  country.save();

  // kirimkan data ke client
  res.status(200).json({
    status: 'success add country'
  });
}

module.exports.getAllCountry = getAllCountry;
module.exports.getCountryById = getCountryById;
module.exports.deleteCountryById = deleteCountryById;
module.exports.addCountry = addCountry;