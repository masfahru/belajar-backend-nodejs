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