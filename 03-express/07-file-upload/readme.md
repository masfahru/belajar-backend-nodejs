# File Upload

File Upload tentu harus ada di setiap backend, biasanya terdapat dependensi yang bisa membantu kita untuk mengatur file upload, seperti multer, multer-s3, dan lain-lain.

Pada tutorial ini kita akan membuat project upload files yang akan disimpan di dalam server, kemudian link berisi file yang telah upload akan dikirimkan kepada User.

## Skenario

Upload file dengan menggunakan dependency multer. Method yang digunakan adalah POST.

1. User mengupload sebuah file endpoint `/single-upload`
2. User mengupload beberapa file endpoint `/multi-upload`
3. User mengupload sebuah file disertai data lain endpoint `/single-upload-with-data`

## Persiapan Project

1. Buatlah folder `upload-files`
2. Buka terminal dan masuk ke folder `upload-files`
3. Insiasi project dengan `npm init`
4. Install dependencies : `npm install express dotenv multer --save`
5. Install dev-dependency : `npm install nodemon --save-dev`

Pada langkah ke-4, kita menginstall dependensi `multer`, dependensi ini digunakan untuk mengatur upload.

## Struktur Project

Karena kita telah belajar mengenai middleware dan routes, maka struktur projectnya menyesuaikan menjadi seperti ini:

```text
upload-files
├───middlewares
│   ├───upload-image.js
├───public
│   └───uploads
├───routes
│   └───upload.js
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

`PUBLIC_DIR` nantinya sebagai folder yang bisa diakses oleh publik atau client. Kita bisa memasukkan folder ataupun file seperti javascript, css, html, dan lain-lain di sini. Cara akses file di dalam folder ini adalah dengan menggunakan `http://localhost:3000/filename.extension`.

`UPLOAD_DIR` nantinya sebagai folder yang akan digunakan untuk menyimpan file yang diupload, folder ini berada di dalam folder `PUBLIC_DIR`. Cara akses file yang diupload yakni dengan url `http://localhost:3000/uploads/filename.jpg`.

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

## index.js

```javascript
require("dotenv").config();
const express = require("express");
const path = require("path");

// Instansiasi express
const app = express();

// Built-in middleware pengganti body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk mengatur folder public
app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));

// Router

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).send({
    message: "Route tidak ditemukan. Periksa kembali URL yang Anda masukkan.",
  });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({
    message: err.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log("server started on port " + process.env.PORT);
});
```

Kita tidak lagi menggunakan middleware `body-parser` karena express telah memiliki built-in middleware berupa `express.json()` dan `express.urlencoded()`. Link: [express.json()](https://expressjs.com/en/api.html#express.json) dan [express.urlencoded()](https://expressjs.com/en/api.html#express.urlencoded).

Express menggunakan built-in middleware `express.static()` untuk mengatur folder public. Link: [express.static()](https://expressjs.com/en/api.html#express.static).

`path.resolve()` digunakan untuk mengubah string menjadi path yang valid. Contoh `path.resolve(__dirname, process.env.PUBLIC_DIR)` akan mengubah `__dirname` menjadi `upload-files` dan `process.env.PUBLIC_DIR` menjadi `public`, jadilah pathnya `upload-files/public`. Penggunaan path sangat disarankan ketika kita berurusan dengan file dan folder yang dinamis. Link: [path.resolve()](https://nodejs.org/api/path.html#path_path_resolve_paths).

## Middleware upload-image

Buat file `upload-image.js` di dalam folder `middlewares`. Kode yang perlu dimasukkan beserta penjelasannya adalah sebagai berikut:

Dependensi yang digunakan adalah `path` dan `multer`.

- `path` untuk mendapatkan path yang valid
- `multer` sebagai pemroses upload.
- `multer.diskStorage()` adalah konfigurasi multer yang mengatur penyimpanan file. Terdapat 2 parameter, yakni `destination` dan `filename`. File yang diupload disimpan di dalam folder `public/uploads` dan nama file diberi keunikan berupa adanya waktu upload, sehingga tidak khawatir terjadi duplikasi file.
- Instansiasi fungsi `multer` dengan membuat variabel `upload` berisi `multer({ storage })` dimana `storage` adalah konfigurasi yang telah dibuat diatas.

```javascript
require("dotenv").config();
const path = require("path");
const multer = require("multer");

// Konfigurasi storage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(process.env.PUBLIC_DIR, process.env.UPLOAD_DIR));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Instansiasi multer
const multerInstance = multer({ storage });
```

Kemudian buat fungsi middleware `uploadSingleImage`:

1. Panggil method `single()` dengan parameter `"image"` pada `multerInstance` untuk mendapatkan file dalam request dengan key `image`.
2. Gunakan error handling seperti yang dijelaskan pada artikel berikut: [Multer Error Handling](http://expressjs.com/en/resources/middleware/multer.html#error-handling).

```javascript
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
```

Setelah middleware untuk upload sebuah file dibuat, Kemudian buat fungsi middleware untuk mengupload beberapa gambar bernama `uploadMultiImage`:

Kodenya mirip dengan fungsinya `uploadSingleImage` hanya saja yang berbeda adalah kita gunakan `multer.array()` dengan parameter `images` untuk mengambil beberapa file yang diupload.

```javascript
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
```

Selanjutnya buat middleware untuk menangani upload sebuah file berisi data lain yakni `name`, `email`, beri nama `uploadSingleImageWithData`:

```javascript
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
```

Selanjutnya export semua fungsi agar bisa digunakan di routes.

```javascript
module.exports = {
  uploadSingleImage,
  uploadMultiImage,
  uploadSingleImageWithData,
};
```

Hasil akhir middleware `upload-image.js` adalah sebagai berikut:

```javascript
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
```

## Routes upload

Setelah middleware dibuat, selanjutnya kita bisa buat routes upload.

Penamaan `upload` karena seharusnya semua route yang berkaitan dengan upload ditulis di sini.

Kode beserta penjelasannya:

```javascript
// import dependsi yang dibutuhkan
require("dotenv").config();
const express = require("express");

// import juga middleware yang telah kita buat
const {
  uploadSingleImage,
  uploadMultiImage,
  uploadSingleImageWithData,
} = require("../middlewares/upload-image");

// buat instance router
const router = express.Router();

// route endpoint /single-upload
router.post("/single-upload", uploadSingleImage, (req, res) => {
  res.status(200).json({
    message: "File uploaded successfully",
    imageUrl: `http://localhost:${process.env.PORT}/${process.env.UPLOAD_DIR}/${req.file.filename}`,
  });
});

// route endpoint /multi-upload
router.post("/multi-upload", uploadMultiImage, (req, res) => {
  // buat variabel berisi array url gambar
  const imageUrls = [];

  // masukkan semua url gambar ke dalam array
  req.files.forEach((file) => {
    imageUrls.push(
      `http://localhost:${process.env.PORT}/${process.env.UPLOAD_DIR}/${file.filename}`
    );
  });

  // tambahkan images ke response
  res.status(200).json({
    message: "File uploaded successfully",
    imageUrls,
  });
});

// route endpoint /single-upload-with-data
router.post(
  "/single-upload-with-data",
  uploadSingleImageWithData,
  (req, res) => {
    // dapatkan name dan email dari request body
    const { name, email } = req.body;

    res.status(200).json({
      message: "File uploaded successfully",
      name,
      email,
      imageUrl: `http://localhost:${process.env.PORT}/${process.env.UPLOAD_DIR}/${req.file.filename}`,
    });
  }
);

module.exports = router;
```

## Update index.js

Update `index.js` untuk menambahkan router `upload` yang telah dibuat.

```javascript
require("dotenv").config();
const express = require("express");
const path = require("path");

// Import router upload
const uploadRoutes = require("./routes/upload");

// Instansiasi express
const app = express();

// Built-in middleware pengganti body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk mengatur folder public
app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));

// Router
app.use(uploadRoutes);

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).send({
    message: "Route tidak ditemukan. Periksa kembali URL yang Anda masukkan.",
  });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({
    message: err.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log("server started on port " + process.env.PORT);
});
```

## Jalankan Project

Jalankan project tersebut dengan command: `npm run dev`

## Error yang mungkin terjadi

Error yang mungkin terjadi ketika ditesting adalah:

- Unexpected Field, hal ini dikarenakan key yang dimasukkan pada request dari client tidak sesuai.

## Testing Upload

Lakukan testing dengan menggunakan postman.

Gunakan method POST untuk mengirimkan file. Sesuaikan body masing-masing request sebagai berikut:

1. Endpoint: `localhost:3000/single-upload`, body: key `image`, tipe data file, value: file yang akan diupload.
2. Endpoint: `localhost:3000/multi-upload`, body: key `images`, tipe data file, value: file yang akan diupload, buat beberapa key `images` dengan tipe data file.
3. Endpoint: `localhost:3000/single-upload-with-data`, body: key `name` => value `nama-kalian`, key `email` => value `email-kalian`, dan key `image` dengan tipe data file => value: file yang akan diupload.

## Eksplorasi

Selain penentuan lokasi penyimpanan file dan penamaan file di server, terdapat beberapa pengaturan lain pada multer, seperti memfilter jenis file yang diupload, ukuran maksimal file yang diupload, dan lain-lain.
