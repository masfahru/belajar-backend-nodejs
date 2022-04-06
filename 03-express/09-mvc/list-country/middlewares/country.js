// require yang dibutuhkan
require("dotenv").config();

// import class country
const Country = require("../models/country");

// buat middleware dapatkan semua data country
const getAllCountry = (req, res, next) => {
  // buat variable untuk menampung semua data country
  const countries = Country.fetchAll();

  // kirimkan data ke client
  res.status(200).json({
    status: "success",
    data: {
      countries,
    },
  });
};

// buat middleware untuk mendapatkan data country berdasarkan id
const getCountryById = (req, res, next) => {
  // buat variable untuk menampung data country yang ditemukan
  const country = Country.findById(req.params.id);

  if (!country) {
    return next("route");
  }

  // kirimkan data ke client
  res.status(200).json({
    status: "success",
    data: {
      country,
    },
  });
};

// middleware untuk meghapus data country berdasarkan id
const deleteCountryById = (req, res, next) => {
  // buat variable untuk menampung data country
  const country = Country.deleteById(req.params.id);

  if (!country) {
    return next("route");
  }

  // kirimkan data ke client
  res.status(200).json({
    status: "success delete country",
  });
};

// buat middleware untuk menambahkan data country
const addCountry = (req, res, next) => {
  // dapatkan url gambar dari middleware upload-image
  const flagUrl = `${req.protocol}://${req.get("host")}/${
    process.env.UPLOAD_DIR
  }/${req.file.filename}`;
  // buat variable untuk menampung data country
  const country = new Country(
    req.body.name,
    flagUrl,
    req.body.language,
    req.body.continent
  );

  // simpan data country ke database
  country.save();

  // kirimkan data ke client
  res.status(200).json({
    status: "success add country",
  });
};

// buat middleware untuk mengubah data country
const updateCountryById = (req, res, next) => {
  // tampung id
  let id = req.params.id;

  // buat variable yang menampung data country
  let name, flag, language, continent;
  // tampung data yang akan diupdate dalam bentuk object
  // semisal tidak ada file foto, skip
  if (req.body.name) name = req.body.name;
  if (req.file.filename)
    flag = `${req.protocol}://${req.get("host")}/${process.env.UPLOAD_DIR}/${
      req.file.filename
    }`;
  if (req.body.language) language = req.body.language;
  if (req.body.continent) continent = req.body.continent;

  // buat object Country
  let data = new Country(name, flag, language, continent);
  let updateCountry = data.updateById(id);

  // jika update country gagal karena id tidak ditemukan
  if (!updateCountry) {
    return next("route");
  }

  // kirimkan data ke client
  res.status(200).json({
    status: "success update country",
  });
};

module.exports.getAllCountry = getAllCountry;
module.exports.getCountryById = getCountryById;
module.exports.deleteCountryById = deleteCountryById;
module.exports.addCountry = addCountry;
module.exports.updateCountryById = updateCountryById;
