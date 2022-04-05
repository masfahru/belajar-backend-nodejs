// database masih pakai array saja 
const database = []

// buat class country
class Country {

  // buat constructor
  // skema terdiri dari nama, bendera, bahasa, dan letak
   constructor(name, flag, language, continent){
    this.name = name;
    this.flag = flag;
    this.language = language;
    this.continent = continent;
  }
  
  // method untuk menyimpan data ke array
  save() {
    // jika array kosong maka isi dengan id 1
    if(database.length === 0) {
      this.id = 1
    } else {
    // id dibuat berdasarkan id terakhir + 1
      this.id = database[database.length - 1].id + 1;
    }

    // tambahkan object ke array
    database.push(this);
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
    let data = database.find(country => country.id == id);
    // jika tidak ditemukan, tampilkan error
    if(!data) {
      throw new Error('Data tidak ditemukan');
    }
    return data;
  }

  static deleteById(id) {
    // kita cari dulu country dengan id tersebut
    // bisa gunakan fungsi findById di atas
    const country = Country.findById(id);
    
    // gunakan array.splice untuk menghapus data tsb
    database.splice(database.indexOf(country), 1);
  }
}

// export class 
module.exports = Country;