# Routes dan Error Handling Express

Pada tutorial sebelumnya kita belajar tentang middleware, namun hanya menggunakan satu route yakni index `/`.

Kita memang bisa menulis route dan middleware-nya di dalam `index.js`, namun cara tersebut memiliki beberapa kelemahan yakni:

- Sebuah route bisa memiliki beberapa method, seperti `GET`, `POST`, `PUT`, `DELETE`, dan lain-lain. Setiap method bisa memiliki beberapa middleware. Tentu saja kodenya akan panjang jika kita tulis semua di dalam satu file `index.js`.
- Sulit untuk berkolaborasi, semisal Anda ditugaskan untuk mengatur route `/login` dan teman Anda ditugaskan untuk mengatur route `/register`. Jika kita menulis semua route di dalam satu file `index.js`, maka akan terjadi konflik pada version control karena file index.js Anda yang berbeda dengan file index.js teman Anda.
- Dengan alasan semua kode routes berada di dalam satu file, maka sulit untuk melakukan unit testing dan re-use code.

Jika kita ibaratkan index.js sebagai `main-app` atau aplikasi inti, maka solusi dari permasalaan di atas adalah dengan membuat `sub-app` atau `mini-app`, yakni aplikasi express yang digunakan untuk setiap route.

Agar lebih memahami tentang mini-app ini, yuk kita pelajari dengan membuat project.

## Membuat Project dan Persiapannya

Ada beberapa langkah untuk membuat sebuah server Express yang seharusnya telah kita hafal, yakni:

1. buat folder project, arahkan terminal ke dalam folder tersebut
2. init project node dengan jalankan command: `npm init`
3. Install modul yang diperlukan seperti: `express, body-parser, dotenv, nodemon`
4. Modifikasi file `package.json` agar `scripts` menjadi `"dev": "nodemon index.js"`
5. Buat file `dotenv`, isi dengan `PORT=3000`
6. Buat file `index.js`, isi dengan:
```javascript
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Routes di sini

const app = express();
app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
```
7. Coba jalankan project dengan menjalankan command: `npm run dev`, cek jika console berhasil menampilkan `Server berjalan di port 3000`. Maka kita berhasil membuat project Express.

## Buat Route

Route kali ini tidak akan di tulis di _main-app_ atau `index.js` melainkan akan ditulis di dalam sebuah folder bernama `routes`.

Buatlah folder bernama `routes` di dalam project.


