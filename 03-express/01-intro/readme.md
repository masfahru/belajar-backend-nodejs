# Express: Apa dan Kenapa ?

Apa itu Express ? Kenapa kita menggunakannya dalam pemrograman server ?

Setelah melalui beberapa lab sederhana sebelumnya, kita tahu bahwa logika untuk membuat server cukup kompleks. Kita harus menuliskan kode untuk mengatur route, mengatur method request, mengatur middleware, dan mengatur response.

Sebagai contoh untuk mengambil data formulir dari body request, kita perlu melakukan req on data, buffer, dan req on end. Itu pun jika data berupa string, lantas bagaimana jika data berupa media yang berbentuk file, seperti gambar, video, atau audio ? tentu cukup rumit jika kita membuat kodenya sendiri.

Kita tentu saja tidak ingin dirumitkan oleh hal yang teknikal seperti di atas, kita berharap bisa lebih berfokus pada logika pemrograman. Agar tidak terlalu rumit, kita bisa menggunakan framework yang sudah ada.

Framework pada dasarnya adalah kumpulan dari library (perpustakaan) fungsi-fungsi yang berguna untuk suatu tujuan tertentu dan terdapat juga beberapa tools (alat-alat) pendukungnya.

Express adalah sebuah framework Nodejs yang berfungsi untuk mengatur route, method request, middleware, dan response. Dengan menggunakan Express, kita dapat menuliskan kode yang lebih mudah dan lebih rapi.

## Fitur-fitur Express

Beberapa fitur-fitur yang dapat kita gunakan pada Express:

1.  Menerima Request
2.  Mengirim Response
3.  Routing
4.  Validasi Data Request
5.  Manajemen Data (Seperti menghubungkan database, menyimpan session, menyimpan file, berinteraksi dengan web api lain, dll).

Hampir semua hal di atas pernah kita coba lakukan dengan menulis kode buatas sendiri di labs sebelumnya, namun membutuhkan banyak kode sehingga terasa kurang efisien untuk mengatur request, response, routing, dan validasi data request.

Pada Express, kita menggunakan istilah _middleware_ karena kode yang ditulis merupakan kode pemrosesan data dari data request menjadi data response.

Mari kita buat project baru dengan Express.
## Buat Project Baru

Kita buat project baru dengan menggunakan command berikut:

    npm init

### Catatan Untuk Project Nodejs

Agar menghemat ruang penyimpanan, hapus folder _node_modules_ yang ada di project Nodejs yang tidak lagi digunakan. Jika suatu saat nanti project sebelumnya perlu digunakan lagi, maka kita hanya perlu menginstall kembali dependensinya dengan command:

    npm install
## Cara Install Express

Cara instalasi Express kita gunakan command berikut:

    npm install express --save

## Install Nodemon

Nodemon tetap diperlukan dalam development agar kita tidak perlu meng-restart server setiap kali kode diubah. Lakukan instalasi dengan command berikut:

    npm install nodemon --save-dev

## Tambahkan Scripts

Setelah proses instalasi express dan nodemon selesai, kurang lebih struktur dari package.json adalah seperti ini

```javascript
{
  "name": "belajar-install-express",
  "version": "1.0.0",
  "description": "Project belajar instalasi ExpressJS",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Imam Fahrur Rofi",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
```

Properti berikut ini bisa diisi sesuai keinginan:

    name
    version
    description
    author
    
Kemudian kita perlu mengubah isi properti _scripts_ agar mendukung penggunaan nodemon.

Menjadi seperti berikut ini:

```javascript
{
  "name": "belajar-install-express",
  "version": "1.0.0",
  "description": "Project belajar instalasi ExpressJS",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js",
    "start-server": "node index.js"
  },
  "author": "Imam Fahrur Rofi",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
```

## Buat index.js

Selanjutnya kita buat file _index.js_ sebagai entry point dari project kita. File entry point adalah file yang menjadi pusat dari project Nodejs. Setiap module yang ada di Nodejs memiliki file entry point, termasuk express dan nodemon. Umumnya nama file entry point adalah _index.js_, namun kita bisa mengubahnya sesuai keinginan, nama yang umum dipakai antara lain _main.js_, _app.js_, dan _server.js_.

Buat file _index.js_ berdampingan dengan file _package.json_, isi dengan kode berikut ini:

```javascript
// Import module express yang dibutuhkan
const express = require('express');

// Tentukan Port Server
const port = 3000;

// Buat express app
const app = express();

// Buat sebuah route / dengan menggunakan express middleware
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Tambahkan server ke port
app.listen(port);
```

Dengan menggunakan Express, kita tidak perlu lagi mengimport module http dikarenakan Express merupakan framework yang menggunakan `http` sebagai dasarnya.

## Jalankan Server

Jalankan server dengan menggunakan command berikut:

    npm run start

## Cek Response Server

Cek response server dengan membuka halaman url http://localhost:3000/ pada browser.

Jika terdapat response yang berisi kata _Hello World_, maka server Nodejs berhasil dijalankan.

## Hapus Folder node_modules

Setelah server berhasil dijalankan, matikan server. Hapus folder _node_modules_ agar tidak menghabiskan penyimpanan.