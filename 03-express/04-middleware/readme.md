# Middleware

Middleware adalah sebutan untuk kode yang memproses request menjadi response. Kita sudah pernah menggunakan middleware sebelumnya, seperti pada modul `01-basic/09-require-module.js`.

Contoh middleware yang telah kita buat sebelumnya pada modul tersebut dengan nama fungsi `requestHandler`:

```javascript
const querystring = require("querystring");
const fs = require("fs");
const requestHandler = (req, res) => {
  let urlReq, methodReq, dataRequest;
  const chunkArr = [];
  const dataResponse = {};
  urlReq = req.url;
  methodReq = req.method ?? "get";
  res.setHeader("Content-Type", "application/json");
  if (urlReq !== "/login" || methodReq.toLowerCase() !== "post") {
    dataResponse.data = "Silahkan akses endpoint /login dengan method post";
    return res.end(JSON.stringify(dataResponse));
  } else {
    req.on("data", (chunk) => {
      chunkArr.push(chunk);
    });
    req.on("end", () => {
      if (chunkArr.length !== 0) {
        dataRequest = Buffer.concat(chunkArr).toString();
        let requestObj = querystring.parse(dataRequest);
        dataResponse.data = requestObj;
      }
      let dataObj = JSON.stringify(dataResponse);
      return res.end(dataObj);
    });
  }
};
```

Yang kemudian kita gunakan pada http server Nodejs sebagai berikut:

```javascript
const http = require("http");

// Gunakan middleware requestHandler di atas pada server
const server = http.createServer(requestHandler);

server.listen(3000);
```

Kekurangan dari pembuatan middlerware seperti di atas yakni semua kode ditulis pada sebuah fungsi. Pada contoh di atas kita hanya menulis kode untuk sebuah route `/login`, bayangkan jika ratusan route, maka kode akan menjadi sangat panjang.

## Express

Express adalah modul framework pada Nodejs yang berfungsi untuk menyederhanakan middleware. Dengan menggunakan Express, memungkinkan kita menulis banyak fungsi sebagai middleware. Express juga memungkinkan penulisan route dan method request yang lebih mudah.

## Express Middleware

Adanya middleware pada Express bertujuan agar kode yang ditulis dapat digunakan kembali (reusable-code), pada contoh di bawah nanti. Selain kita akan membuat middleware sendiri, kita juga akan menggunakan middleware yang telah dibuat oleh developer lain, salah satunya adalah `body-parser`.

Fungsi Middleware Express memiliki 3 parameter yaitu `req`, `res` dan `next`. Kita telah mengenal `req` dan `res` sebelumnya di module Node basic.

- `req` adalah object berisi request dari client.
- `res` adalah object berisi response yang akan dikirimkan ke client.
- `next` adalah fungsi yang digunakan untuk mengirimkan request ke middleware berikutnya.

## Middleware Stack

Sebuah route bisa terdiri dari beberapa fungsi middleware, ini disebut dengan middleware stack.

Contoh dari middleware stack adalah sebagai berikut:

```javascript
app.get('/', middleware1, (req, res, next) => {
  // do something
  next();
}, middleware2, middleware3, (req, res, next) => {
  // kirim data ke client
  return res.send('Hello World!');
});
```

middleware1, middleware2, dan middleware3 adalah middleware yang diimport dari folder middlewares, tentu saja kita buat sendiri fungsinya.

## Next Function

Fungsi `next` memiliki 3 cara pemanggilan, yaitu:

1. `next()`
2. `next('route')`
3. `next(error)`

Mari kita buat sebuah project untuk mempelajari fungsi `next`:

### Buat Project

Buat project dalam folder bernama `express-next`

### Install Dependensi

`npm install express body-parser dotenv --save`

`npm install nodemon --save-dev`

### Scripts 

Modifikasi package.json bagian scripts:

```javascript
"scripts": {
    "dev": "nodemon index.js"
  }
```

### File .env

Buat file .env, isi dengan port

```dotenv
PORT="3000"
```

### File index.js

Buat file index.js, isi dengan kode sebagai berikut:

```javascript
require("dotenv").config();
const express = require("express");
// body-parser adalah middleware untuk menyaring data request
const bodyParser = require("body-parser");
const app = express();

// Kode middleware di sini

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
```

### Skenario Middleware

Skenario aplikasi kali ini berpusat pada middleware, yakni sebagai berikut:

1. Middleware pertama mengubah data request menjadi object,
2. Middleware kedua menampilkan informasi header
3. Middleware ketiga menampilkan informasi body jika methodnya POST
4. Middleware keempat mengirim data ke client

### Buat folder bernama middlewares

Yap buat folder bernama `middlewares`, kita akan membuat beberapa middleware disini untuk diimport ke dalam index.js

### Middlewares pertama

Middleware pertama adalah middleware dari body-parser untuk mengubah data raw request menjadi object request. Kita gunakan `app.use` agar berlaku untuk semua method request.

file `index.js` menjadi seperti berikut ini:

```javascript
require("dotenv").config();
const express = require("express");
// body-parser adalah middleware untuk menyaring data request
const bodyParser = require("body-parser");
const app = express();

// Kode middleware di sini
app.use('/', bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
```

Note:

* Middleware yang menggunakan `app.use` berlaku untuk semua jenis method
* Middleware yang menggunakan `app.METHOD` seperti `app.get` berlaku untuk method GET saja, atau `app.post` untuk method POST saja, dst.

### Middelware kedua

Middleware kedua adalah middleware untuk menampilkan header request. Buat file `headers.js` di dalam folder `middlewares`, isi dengan kode berikut:

```javascript
module.exports = (req, res, next) => {
  // tampilkan beberapa data yang telah disaring oleh body-parser
  console.log("METHOD: ", req.method);
  console.log("URL Path: ", req.path);
  console.log("Headers: ", req.headers);

  // gunakan next untuk lanjut ke middleware berikutnya dengan route yang sama
  next();
};
```

Kita berencana untuk menggunakan middleware ini pada semua method request.

file `index.js` menjadi seperti berikut ini:

```javascript
require("dotenv").config();
const express = require("express");
// body-parser adalah middleware untuk menyaring data request
const bodyParser = require("body-parser");
// import middleware pertama
const middleware1 = require("./middlewares/headers");
const app = express();

// Kode middleware di sini
app.use('/', bodyParser.json(), middleware1);

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
```

### Middleware Ketiga

Middleware ketiga menampilkan body request jika methodnya POST. Buat file `body.js` di dalam folder `middlewares`, isi dengan kode berikut:

```javascript
// buat fungsi cek jika object kosong
function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}

module.exports = (req, res, next) => {
  // Jika object req.body kosong kita skip middleware ini
  if (isEmpty(req.body)) next('route');

  // Jika object req.body tidak kosong kita tampilkan body request
  console.log("Body: ", req.body);
  next();
};
```

Selanjutnya kita gunakan middleware ini pada method POST. Oh iya, kita membutuhkan middleware body-parser urlencoded untuk mendapatkan object dari body request.

Modifikasi file `index.js` menjadi seperti berikut:

```javascript
require("dotenv").config();
const express = require("express");
// body-parser adalah middleware untuk menyaring data request
const bodyParser = require("body-parser");
// import middleware pertama
const middlewareHeader = require("./middlewares/headers");
// import middleware kedua
const middlewareBody = require("./middlewares/body");

const app = express();

// Middleware untuk semua method request pada url /
app.use('/', bodyParser.json(), middlewareHeader);

// Middleware untuk method POST pada url /
app.post('/', bodyParser.urlencoded({ extended: true }), middlewareBody);

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
```

### Middleware Keempat

Middleware keempat mengirimkan data ke client. Jika klien mengirim request dengan method POST, kirimkan object request body. Sedangkan jika selainnya, kita tampilkan informasi header request.

Modifikasi file `index.js` menjadi seperti berikut:

```javascript
require("dotenv").config();
const express = require("express");
// body-parser adalah middleware untuk menyaring data request
const bodyParser = require("body-parser");
// import middleware pertama
const middlewareHeader = require("./middlewares/headers");
// import middleware kedua
const middlewareBody = require("./middlewares/body");

const app = express();

// Middleware untuk semua method request pada url /
app.use('/', bodyParser.json(), middlewareHeader);

// Middleware untuk method POST pada url /
app.post('/', bodyParser.urlencoded({ extended: true }), middlewareBody, (req, res) => {
  // Kirimkan object request body jika method POST
  return res.send(req.body);
});

// Kirimkan header jika tidak method POST
app.use('/', (req, res) => {
  return res.send(req.headers);
});

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
```

### Jalankan server

Jalankan server dengan menggunakan command `npm run dev`.

### Tes server

Tes server dengan menggunakan Postman, gunakan method GET dan method POST untuk testing.

Pada method POST, tambahkan data body dengan key dan value yang anda inginkan.