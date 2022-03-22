# 404 Not Found dan Error Handling

Kita membahas tentang middleware not found dan error handling setelah materi routes, karena urutan dari routes sangat diperhatikan dalam express.

Middleware Not Found adalah middleware yang akan dijalankan ketika route yang dituju tidak ditemukan.

Middleware Error Handling adalah middleware yang akan dijalankan ketika terjadi error pada proses request.

Kode keduanya kurang lebih seperti ini:

```javascript
app.use((req, res, next) => {
  res.status(404).send({
    message: "Halaman tidak ditemukan.",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Terjadi kesalahan pada server.",
  });
});
```

Penempatan kedua kode di atas berada di `index.js`.

## 404 Not Found

Middleware ini ada di bawah sehingga akan dijalankan jika tidak ada route yang ditemukan.

## Error Handling

Middleware Error Handling terdiri dari 4 parameter, yaitu: `err`, `req`, `res`, dan `next`. Parameter error berisi data error yang terjadi.

Terdapat dua cara untuk memicu terjadinya error, yaitu dengan menggunakan `throw` pada fungsi synchronous atau dengan fungsi `next(err)` pada fungsi asynchronous. Karena kebanyakan error akan terjadi pada fungsi asynchronous, maka kita akan mempelajari penggunaan `next(err)`.

## Praktikum

Buatlah sebuah project Nodejs bernama `express-error-handling`

### Persiapan Project

1. Buatlah folder `express-error-handling`
2. Buka terminal dan masuk ke folder `express-error-handling`
3. Insiasi project dengan `npm init`
4. Install dependencies : `npm install express dotenv body-parser is-number --save`
5. Install dev-dependency : `npm install nodemon --save-dev` 
6. Buatlah file `.env`, isi dengan `PORT=3000`
7. Buatlah file `.gitignore` dengan isi `node_modules`
8. Modifikasi script `package.json` agar `scripts` berisi `"dev": "nodemon index.js"`

### Skenario

Skenarionya kurang lebih seperti ini:

1. Buat Route dengan endpoint `/input` dengan method `POST`
2. Selain Route pada nomor 1, Kita anggap sebagai 404 Not Found.
3. Request berisi data a dan b, yang akan dijadikan sebagai parameter untuk fungsi `add`.
4. Middleware `/input` akan menghitung hasil penjumlahan a dan b.
5. jika jumlahnya kelipatan 10 maka kirimkan pesan error `"Hasil jumlah a dan b merupakan kelipatan dari 10"`.
6. Selainnya, kita akan mengirimkan pesan `"Hasil jumlah a dan b adalah ... "`.

### index.js

```javascript
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

// isNumber untuk pengecekan data
const isNumber = require('is-number');

const app = express();

// Body Parser urlencoded untuk mengambil data body dari request
// Hanya method POST yang diperbolehkan
app.post(
  "/input",
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
    const { a, b } = req.body;
    // cek jika a dan b adalah number
    // jika tidak maka kirim pesan error
    if (!isNumber(a) || !isNumber(b)) {
        next(new Error("a dan b harus berupa number atau integer"));
    }
    // Number(a) dan Number(b) untuk mengubah data string menjadi number
    const add = (a, b) => Number(a) + Number(b);
    const result = add(a, b);
    if (result % 10 === 0) {
      // trigger middleware error
      next(new Error("Hasil jumlah a dan b merupakan kelipatan dari 10"));
    } else {
      // Secara default middleware ini akan mengirimkan response 200 OK
      res.send({
        message: `Hasil jumlah a dan b adalah ${result}`,
      });
    }
  }
);

// Middleware Not Found
app.use((req, res, next) => {
  // Not Found statusnya 404
  res.status(404).send({
    message: "Halaman tidak ditemukan.",
  });
});

// Middleware Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  // Status 500 Internal Server Error
  res.status(500).send({
    message: "Terjadi kesalahan pada server.",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
```

### Jalankan Project

Jalankan project dengan command: `npm run dev`. Coba test endpoint `/input` dengan request body berisi key `a` dan `b`.