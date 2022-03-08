# Routers

Pada tutorial sebelumnya kita belajar tentang middleware, namun hanya menggunakan satu route yakni index `/`.

Kita memang bisa menulis route dan middleware-nya di dalam `index.js`, namun cara tersebut memiliki beberapa kelemahan yakni:

- Sebuah route bisa memiliki beberapa method, seperti `GET`, `POST`, `PUT`, `DELETE`, dan lain-lain. Setiap method bisa memiliki beberapa middleware. Tentu saja kodenya akan panjang jika kita tulis semua di dalam satu file `index.js`.
- Sulit untuk berkolaborasi, semisal Anda ditugaskan untuk mengatur route `/login` dan teman Anda ditugaskan untuk mengatur route `/register`. Jika kita menulis semua route di dalam satu file `index.js`, maka akan terjadi konflik pada version control karena file index.js Anda yang berbeda dengan file index.js teman Anda.
- Dengan alasan semua kode routers berada di dalam satu file, maka sulit untuk melakukan unit testing dan re-use code.

Jika kita ibaratkan index.js sebagai `main-app` atau aplikasi inti, maka solusi dari permasalaan di atas adalah dengan membuat `sub-app` atau `mini-app`, yakni aplikasi express yang digunakan untuk setiap route.

Agar lebih memahami tentang mini-app ini, yuk kita pelajari dengan membuat project.

## Membuat Project dan Persiapannya

Ada beberapa langkah untuk membuat sebuah server Express yang seharusnya telah kita hafal, yakni:

1. buat folder project (nama terserah Anda), arahkan terminal ke dalam folder tersebut
2. init project node dengan jalankan command: `npm init`
3. Install modul yang diperlukan seperti: `express, body-parser, dotenv, nodemon`
4. Modifikasi file `package.json` agar `scripts` menjadi `"dev": "nodemon index.js"`
5. Buat file `.env`, isi dengan `PORT=3000`
6. Buat file `index.js`, isi dengan:

```javascript
require("dotenv").config();
const express = require("express");

// Routers di sini

const app = express();
app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
```

7. Coba jalankan project dengan menjalankan command: `npm run dev`, cek jika console berhasil menampilkan `Server berjalan di port 3000`. Maka kita berhasil membuat project Express.

## Buat Router

Route kali ini tidak akan di tulis di _main-app_ atau `index.js` melainkan akan ditulis di dalam sebuah folder bernama `routers`.

Buatlah folder bernama `routers` di dalam project.

Kita akan membuat route untuk index atau `/`, buat file bernama `index.js` di dalam folder `routers`. Isi dengan kode berikut:

```javascript
// module express wajib ada
const express = require("express");
// module body-parser untuk memparsing data request
const bodyParser = require("body-parser");

// buat instance router
const router = express.Router();
// kita tidak membuat instance app karena app hanya boleh ada 1 di file root index.js

// kita buat route index
// method GET
router.get("/", (req, res, next) => {
  res.send("Wellcome to route Index method GET");
});

// method POST
/**
 * Skenario :
 * 1. Ubah data RAW request jadi JSON dengan middleware body-parser json
 * 2. Ekstrak data request body menjadi object dengan middleware body-parser urlencoded
 * 3. Kirim data request body ke User
 *
 * */
router.post(
  "/",
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
    res.send(req.body);
  }
);

// method DELETE
/**
 * Method DELETE biasanya digunakan untuk menghapus data berdasarkan parameter ID
 * Skenario:
 * 1. Kirimkan data pada user pesan berupa "Data dengan ID [ID] telah dihapus"
 * 2. Jika tidak ada parameter ID, maka kirmkan pesan berupa  "Masukkan ID yang akan dihapus"
 *
 * */
router.delete("/:id", (req, res, next) => {
  res.send(`Data dengan ID ${req.params.id} telah dihapus`);
});

// Route DELETE jika lupa memasukkan id
router.delete("/", (req, res, next) => {
  res.send(`Masukkan ID yang akan dihapus`);
});

// export router agar bisa kita pakai di file root index.js
module.exports = router;
```

Note: Dalam Project yang Anda buat, Anda tidak perlu menulis komentar kode seperti di atas, yang penting Anda memahami cara kerjanya.

## Modifikasi file index.js

Saatnya kita impor router yang kita buat sebelumnya ke dalam file root `index.js`. Ubah file `index.js` menjadi:

```javascript
require("dotenv").config();
const express = require("express");

// import router index
const indexRouter = require("./routers/index");

// instansiasi app
const app = express();

// tambahkan indexRouter ke dalam app
app.use("/", indexRouter);

// tentukan port sesuai dengan .env
app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
```

Jalankan server dengan command: `npm run dev`, karena kita menggunakan nodemon maka tidak perlu khawatir untuk restart server.

## Buat Router Untuk User

Skenario route `/user`:

1. Buat file `user.js` di dalam folder `routers`
2. Di dalam file `user.js`, buat array dummy beberapa object `user`
3. Tambahkan method GET untuk menampilkan semua data user
4. Tambahkan method GET `/user/:id` untuk menampilkan data user berdasarkan ID
5. Tambahkan method POST untuk menambahkan data user
6. Tambahkan method DELETE `/user/:id` untuk menghapus data user

Karena kita belum menggunakan database, maka ketika server direstart, data user dummy akan kembali ke awal.

### File `user.js`

Buat file bernama `user.js` di dalam folder `routers`

### Dummy Data User

Modifikasi file `user.js` untuk menambahkan dummy data berisi 2 user:

```javascript
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "John@Doe.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "Jane@Doe.com",
  },
];
```

### Method GET untuk tampilkan semua data user

Method GET `/user` akan menampilkan semua data user yang ada di dalam array `users` dalam bentuk object JSON.

Modifikasi `user.js` untuk menambahkan route method GET `/user`:

```javascript
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "John@Doe.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "Jane@Doe.com",
  },
];

const express = require("express");
const router = express.Router();

// Route GET `/user`
router.get("/user", (req, res, next) => {
  res.send({ users });
});

module.exports = router;
```

Modifikasi `index.js` untuk menambahkan route method GET `/user`:

```javascript
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");

// import router
const indexRouter = require("./routers/index");
const userRouter = require("./routers/user");

// instansiasi app
const app = express();

app.use(
  bodyParser.json(),
  (req, res, next) => {
    res.header("content-type", "application/json");
    next();
  },
  indexRouter,
  userRouter
);

// tentukan port sesuai dengan .env
app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
```

Buka Postman, masukkan URL `http://localhost:3000/user` dan klik tombol `GET`, maka akan muncul object data users.

### Method GET `/user/:id`

Method GET `/user/:id` akan menampilkan data user berdasarkan ID yang dikirimkan. `:id` dalam route ini disebut dengan parameter, pemberian nama parameter mengikuti camelCase.

Tambaahkan method GET `/user/:id` ke file `user.js`:

```javascript
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "John@Doe.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "Jane@Doe.com",
  },
];

const express = require("express");
const router = express.Router();

// Route GET `/user`
router.get("/user", (req, res, next) => {
  res.send({ users });
});

// Route GET `/user/:id`
router.get("/user/:id", (req, res, next) => {
  // dapatkan id dari parameter
  const id = req.params.id;

  // lakukan perulangan untuk mencari user.id yang sama dengan id yang dikirimkan
  // jika ditemukan maka kirim data user yang ditemukan
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.id === parseInt(id)) {
      res.send(user);
      return next("route");
    }
  }

  // jika tidak ditemukan maka kirim pesan error
  res.send({
    error: "User not found",
  });
});

module.exports = router;
```

### Method POST untuk menambahkan data user

Method POST pada route `/user` akan menambahkan data user baru ke dalam array `users`, kemudian kirim data semua user ke client.

```javascript
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "John@Doe.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "Jane@Doe.com",
  },
];

const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

// Route GET `/user`
router.get("/user", (req, res, next) => {
  res.send({ users });
});

// Route GET `/user/:id`
router.get("/user/:id", (req, res, next) => {
  // dapatkan id dari parameter
  const id = req.params.id;

  // lakukan perulangan untuk mencari user.id yang sama dengan id yang dikirimkan
  // jika ditemukan maka kirim data user yang ditemukan
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.id === parseInt(id)) {
      res.send(user);
      return next("route");
    }
  }

  // jika tidak ditemukan maka kirim pesan error
  res.send({
    error: "User not found",
  });
});

// Route POST `/user`
router.post(
  "/user",
  bodyParser.urlencoded({ extended: true }), // middleware untuk mengambil data request body
  (req, res, next) => {
    // dapatkan data dari body request
    const { name, email } = req.body;

    // jika data name dan email kosong
    if (!name || !email) {
      res.send({
        error: "Membutuhkan name dan email",
      });
      return next("route");
    }

    // buat object user baru
    const user = {
      id: users.length + 1,
      name,
      email,
    };

    // tambahkan user baru ke dalam array `users`
    users.push(user);

    // kirim data semua user ke client
    res.send({ users });
  }
);

module.exports = router;
```

Coba untuk menambahkan data user baru dengan mengirimkan data dengan method POST `/user`.

Catatan: Karena kita menggunakan variabel `users` untuk menyimpan data user, maka `users` akan direset setiap kali server direstart.

### Method DELETE untuk menghapus data user

Skenario mirip dengan mencari user dengan ID, bedanya kita hapus data yang ditemukan, kemudian kirim data users ke client.

```javascript
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "John@Doe.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "Jane@Doe.com",
  },
];

const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

// Route GET `/user`
router.get("/user", (req, res, next) => {
  res.send({ users });
});

// Route GET `/user/:id`
router.get("/user/:id", (req, res, next) => {
  // dapatkan id dari parameter
  const id = req.params.id;

  // lakukan perulangan untuk mencari user.id yang sama dengan id yang dikirimkan
  // jika ditemukan maka kirim data user yang ditemukan
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.id === parseInt(id)) {
      res.send(user);
      return next("route");
    }
  }

  // jika tidak ditemukan maka kirim pesan error
  res.send({
    error: "User not found",
  });
});

// Route POST `/user`
router.post(
  "/user",
  bodyParser.urlencoded({ extended: true }), // middleware untuk mengambil data request body
  (req, res, next) => {
    // dapatkan data dari body request
    const { name, email } = req.body;

    // jika data name dan email kosong
    if (!name || !email) {
      res.send({
        error: "Membutuhkan name dan email",
      });
      return next("route");
    }

    // buat object user baru
    const user = {
      id: users.length + 1,
      name,
      email,
    };

    // tambahkan user baru ke dalam array `users`
    users.push(user);

    // kirim data semua user ke client
    res.send({ users });
  }
);

// Route DELETE `/user/:id`
router.delete(
  "/user/:id",
  (req, res, next) => {
    // dapatkan id dari parameter
    const id = req.params.id;

    // lakukan perulangan untuk mencari user.id yang sama dengan id yang dikirimkan
    // jika ditemukan maka hapus data user yang ditemukan
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      if (user.id === parseInt(id)) {
        users.splice(i, 1);
        res.send({ users });
        return next("route");
      }
    }

    // jika tidak ditemukan maka kirim pesan error
    res.send({
      error: "User not found",
    });
  }
);

module.exports = router;
```

Coba hapus data user dengan id 1 dengan mengirimkan data dengan method DELETE `/user/1`.