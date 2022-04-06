// fs dan path digunakan untuk mencari file
require("dotenv").config();
const fs = require("fs");
const path = require("path");

// database masih pakai array saja
const database = [];

// buat class country
class Country {
  // buat constructor
  // skema terdiri dari nama, bendera, bahasa, dan letak
  constructor(name, flag, language, continent) {
    this.name = name;
    this.flag = flag;
    this.language = language;
    this.continent = continent;
  }

  // method untuk mendapatkan semua data dari array
  static fetchAll() {
    // return database karena database telah berbentuk array
    return database;
  }

  // method untuk mendapatkan data berdasarkan id
  static findById(id) {
    // karena database berupa array biasa
    // maka kita bisa gunakan array method find
    let data = database.find((country) => country.id == id);
    // jika tidak ditemukan, selesaikan fungsi
    if (!data) return;

    return data;
  }

  static deleteById(id) {
    // kita cari dulu country dengan id tersebut
    // bisa gunakan fungsi findById di atas
    const country = Country.findById(id);

    // jika data tidak ditemukan, selesaikan fungsi
    if (!country) return;

    // kita perlu menghapus file gambar benderanya dulu
    if (country.flag) {
      // parse url dari string
      let url = new URL(country.flag);
      // dapatkan nama file gambar
      let fileName = url.pathname.split("/").pop();
      // dapatkan path file gambar
      let pathFile = path.resolve(
        process.env.PUBLIC_DIR,
        process.env.UPLOAD_DIR,
        fileName
      );
      console.log(pathFile);

      // Hapus file
      fs.unlink(pathFile, (err) => {
        if (err && err.code == "ENOENT") {
          // file doens't exist
          console.info("File doesn't exist, won't remove it.");
        } else if (err) {
          // other errors, e.g. maybe we don't have enough permission
          console.error("Error occurred while trying to remove file");
        } else {
          console.info(`removed`);
        }
      });
    }

    // gunakan array.splice untuk menghapus data tsb
    database.splice(database.indexOf(country), 1);

    return true;
  }

  // method untuk menyimpan data ke array
  save() {
    // jika array kosong maka isi dengan id 1
    if (database.length === 0) {
      this.id = 1;
    } else {
      // id dibuat berdasarkan id terakhir + 1
      this.id = database[database.length - 1].id + 1;
    }

    // tambahkan object ke array
    database.push(this);

    return true;
  }

  updateById(id) {
    // cari data country dengan id tersebut
    const country = Country.findById(id);

    // jika data tidak ditemukan, tampilkan error
    if (!country) return;

    // jika data ditemukan, dapatkan index country dalam array
    let index = database.indexOf(country);

    // update data yang dibutuhkan, sedangkan id biarkan saja
    if (this.name) country.name = this.name;
    if (this.flag) country.flag = this.flag;
    if (this.language) country.language = this.language;
    if (this.continent) country.continent = this.continent;

    // simpan data yang telah diupdate kembali ke dalam array
    database[index] = country;

    return true;
  }
}

// export class
module.exports = Country;
