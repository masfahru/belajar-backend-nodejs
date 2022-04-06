# MMR

Setelah mengetahui arsitektur project express di penjelasan sebelumnya, kita akan membuat project sederhana yang menggunakan arsitektur MCR (Model-Middleware-RestAPI).

## Skenario

Project yang akan dibuat adalah project menyimpan informasi negara dan bendera

1. Client mengirim data informasi negara berisi nama, bendera, bahasa, dan letak (ASEAN/ASIA/EROPA/AUSTRALIA/AFRIKA/AMERIKA)
2. Data diolah dalam middleware
3. Data disimpan dalam database yang ada di Model
4. Data ditampilkan dalam bentuk RestAPI

## Persiapan Project

1. Buatlah folder `list-country`
2. Buka terminal dan masuk ke folder `list-country`
3. Insiasi project dengan `npm init`
4. Install dependencies : `npm install express dotenv multer --save`
5. Install dev-dependency : `npm install nodemon --save-dev`

Pada langkah ke-4, kita menginstall dependensi `multer`, dependensi ini digunakan untuk mengatur upload.

## Struktur Project

Karena kita hanya belajar Model, maka struktur projectnya menyesuaikan menjadi seperti ini:

```text
list-country
├───models
│   ├───country.js
├───middlewares
│   ├───country.js
│   ├───upload-image.js
├───public
│   └───uploads
├───routes
│   └───index.js
├───.env
├───.gitignore
├───index.js
├───package-lock.json
└───package.json
```

## .env

Buatlah file `.env`, isi dengan:

```text
PORT=3000
PUBLIC_DIR=public
UPLOAD_DIR=uploads
```

## .gitignore

Buatlah file `.gitignore` dengan isi yang ada pada file ini: [Node.gitignore](https://github.com/github/gitignore/blob/main/Node.gitignore)

Setelahnya tambahkan juga `public\uploads` ke dalam file `.gitignore` agar file yang kita upload ketika testing tidak ikut masuk ke dalam repository.

## Modifikasi package.json

Modifikasi script `package.json` bagian `scripts` hingga menjadi:

```javascript
scripts: {
  "start": "nodemon index.js"
}
```

## Model - country.js

Model berisi skema atau struktur dari data yang akan disimpan. Model dibuat menggunakan class agar semua data object yang dibuat dengan class ini memiliki struktur yang sama.

Buat folder `models`, di dalamnya buat file `country.js` dengan isi sebagai berikut:

```javascript
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
```

`static` merupakan keyword yang digunakan untuk membuat fungsi yang tidak mempengaruhi object.

## Middleware - upload-image.js

Buat folder `middlewares`, di dalamnya buat file `upload-image.js`, isinya sama seperti pada project upload image sebelumnya, yakni dengan isi sebagai berikut:

```javascript
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
```

## Middleware - country.js

Didalam folder `middleware` buat file `country.js` dengan isi sebagai berikut:

```javascript
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
```

## Routes - index.js

Kita hanya akan membuat route ke index, jadi buat folder `routes` dan di dalamnya buat file `index.js` dengan isi sebagai berikut:

```javascript
require("dotenv").config();
const express = require("express");

const router = express.Router();

// import middleware
const { uploadAnImage, uploadImages } = require("../middlewares/upload-image");
const countryMiddleware = require("../middlewares/country");

// Route menambahkan data pada endndpoint /
router.post("/", uploadAnImage, countryMiddleware.addCountry);

// Route menampilkan semua data pada endndpoint /
router.get("/", countryMiddleware.getAllCountry);

// Route menampilkan data berdasarkan id pada endndpoint /:id
router.get("/:id", countryMiddleware.getCountryById);

// Route untuk mengubah data pada endndpoint /:id
router.post("/:id", uploadAnImage, countryMiddleware.updateCountryById);

// Route menghapus data berdasarkan id pada endndpoint /:id
router.delete("/:id", countryMiddleware.deleteCountryById);

module.exports = router;
```

## index.js

`index.js` sebagai file utama, kita buat file ini sebagai berikut:

```javascript
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// import routes
const indexRouter = require("./routes/index");

// ubah raw request menjadi json
app.use(express.json());

// Middleware menjadikan file public bisa diakses oleh client
app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));

// Route ada di sini
app.use("/", indexRouter);

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).send({
    message: "Route tidak ditemukan. Periksa kembali URL yang Anda masukkan.",
  });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  res.status(500).send({
    message: err.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
```

## Buat folder public dan uploads

Dikarenakan kita menyetel static folder di `public/uploads`, maka kita perlu membuat folder `public` dan `uploads` di dalamnya.

## Jalankan server

dengan menggunakan command `npm run dev`
