# Konfigurasi Express

Kita bisa mengatur konfigurasi express dengan 2 cara:

1. In app configuration
2. External configuration

Beberapa konfigurasi express bisa dilihat di sini: [Application Settings](https://expressjs.com/en/api.html#app.settings.table)

## In app configuration

In app configuration adalah konfigurasi yang dilakukan di dalam aplikasi, biasanya di tulis di dalam file root app seperti index.js. Semua project yang kita pelajari sebelumnya menggunakan cara konfigurasi ini, seperti menyetel nomor port.

Contoh:

```javascript
const express = require("express");

const app = express();

// konfigurasi untuk mengatur sensitifitas typing
// Jika diaktifkan, route /index tidak sama dengan /INDEx
app.enable("case sensitive routing");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// konfigurasi untuk mengatur port
app.listen(3000);
```

Konfigurasi seperti cara di atas memiliki kelemahan yakni sulit digunakan ketika berkolaborasi karena setiap developer mungkin memiliki konfigurasi yang berbeda.

## External configuration

External configuration menggunakan file external bernama `.env` untuk konfigurasi projectnya. ikuti langkah berikut untuk mempelajari konfigurasi external.

### Buat project baru

Buat project baru. Dalam tutorial ini saya buat project di dalam folder bernama `env-config`. Gunakan command `npm init` untuk membuat project Nodejs baru.

### Skenario project

Skenario project ini adalah kita akan membedakan environment development dan production berdasarkan port, pada development menggunakan port `3000`, sedangkan pada production menggunakan port `5000`.

Pada real-world scenario, environment bisa berisi banyak hal seperti:

- Token untuk autentikasi ke suatu server (seperti upload gambar ke Amazon Web Sever S3)
- Database yang berbeda untuk development dan production, demi keamanan biasanya akun dan password database local berbeda dengan server.
- Dan data rahasia lainnya.

### Install Dependencies

Install dependensi yang dibutuhkan, antara lain: `express`, `nodemon`, `cross-env`, dan `dotenv`.

- express dan nodemon telah dijelaskan sebelumnya
- cross-env adalah library untuk mengatur environment pada scripts secara cross-platform, dikarenakan cara atur env di Windows dan di Linux/MacOS berbeda.
- dotenv adalah library untuk membaca file dalam project yang dimulai dengan nama `.env`.

```javascript
npm install express dotenv --save
npm install nodemon cross-env --save-dev
```

Note: `--save` berarti modul digunakan untuk development dan production, sedangkan `--save-dev` berarti modul digunakan untuk development saja. Membedakan keduanya sangat bermanfaat ketika deploy project, karena modul yang berada di development saja tidak akan diinstal, hal ini bisa menghemat ruang dan mempercepat proses deploy.

### Modifikasi scripts di package.json

Modifikasi script di `package.json` agar bisa menjalankan project menggunakan `nodemon`, menjadi seperti ini:

```javascript
"scripts": {
    "dev": "nodemon index.js",
    "production": "npx cross-env PORT=5000 node index.js"
  }
```

nanti kita bisa menjalankan project melalui terminal dengan command `npm run dev` ketika development dan `npm run production` ketika deploy.

Note: Pada server, kita TIDAK mengatur environment production menggunakan scripts seperti cara di atas, melainkan terdapat fitur sendiri untuk mengaturnya, contoh pada heroku seperti ini: [Config Vars](https://devcenter.heroku.com/articles/config-vars).

### Buat file .env

Buat file bernama `.env` di dalam folder project. Isi file tersebut dengan konfigurasi yang diinginkan.

Karena skenario kita hanya mengatur port, jadi ya masukkan port di dalam file .env.

```dotenv
PORT="3000"
```

### Masukkan .env ke dalam .gitignore

Buat file bernama .gitignore, tuliskan `.gitignore` di dalamnya. Hal ini dikarenakan .env berisi data penting, maka perlu kita kecualikan dari git agar tidak terupload, masukkan nama .env ke dalam .gitignore.

Note: Sangat DISARANKAM untuk menggunakan .gitignore dari link berikut: [NODE.gitignore](https://github.com/github/gitignore/blob/main/Node.gitignore), karena di dalamnya telah ada .env dan nama lain yang perlu dikecualikan pada project Nodejs

### Buat file index.js

Buat file index.js, tuliskan:

```javascript
// aktifkan dotenv
require("dotenv").config();

// kini environment bisa diakses dengan cara
// process.env.{nama variabel}
// contoh untuk port : process.env.PORT

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // Jika portnya 5000 maka kita berada di production, selainnya berarti development
  let status = process.env.PORT == 5000 ? "Production" : "Development";
  res.send(`Hello World! This is ${status} App !`);
});

// Tambahkan server ke port
app.listen(process.env.PORT, function () {
  console.log(`Server berjalan di port: ${process.env.PORT}`);
});
```

### Jalankan Server Development

Jalankan server development melalui terminal dengan command `npm run dev`.

### Jalankan Server Production

Buka terminal baru di dalam folder project, jalankan command `npm run production`.

### Cek Server

Cek server development dan server production dengan membuka alamat: `localhost:3000` dan `localhost:5000` di browser.

Dengan menggunakan environment external, kita bisa menjalankan 2 server secara bersama-sama dengan syarat beda portnya saja. Hal ini tentu tidak bisa dilakukan jika kita menggunakan in-app configuration.

### Bersih-bersih

Setelah kita mempelajari tentang environment configuration dan cara kerjanya, bersihkan folder project agar hemat ruang penyimpanan dengan cara:

1. Matikan server yang sedang berjalan
2. Hapus folder `node_modules`

Untuk menjalankan server kembali, kita perlu menjalankan command `npm install` lagi. Tenang saja hal ini tidak akan mendownload dependensi lagi melainkan hanya mengekstrak dari dependensi sebelumnya yang telah didownload oleh Nodejs.