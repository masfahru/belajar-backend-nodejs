const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

// buat array dummy beberapa object user
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

// Tambahkan method GET untuk menampilkan semua data user
router.get("/user", (req, res, next) => {
  res.status(200).json({
    message: "Tampilkan semua user",
    users,
  });
});

// Tambahkan method GET /user/:id untuk menampilkan data user berdasarkan ID
router.get("/user/:id", (req, res, next) => {
  // kita ambil parameter user id dari url
  const userId = req.params.id;
  // cari user dengan id yang sama
  // jika user.id itu sama dengan parameter id dari url, maka tampilkan user tersebut
  // parseInt digunakan karena parameter dalam url dianggap string
  const user = users.find((user) => user.id === parseInt(userId));

  // jika user tidak ditemukan, maka tampilkan pesan error
  if (!user) {
    res.status(404).json({
      message: `User dengan id: ${userId} tidak ditemukan`,
    });
  } else {
    res.status(200).json(user);
  }
});

// Tambahkan method POST untuk menambahkan data user
router.post(
  "/user",
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
    const { name, email } = req.body;
    // const name = req.body.name;
    // const email = req.body.email;

    // dapatkan user terakhir dari array users
    const lastUser = users[users.length - 1];
    // dapatkan id terakhir dari user yang ada, tambahkan 1
    const id = lastUser.id + 1;
    users.push({ id, name, email });
    res.status(201).json({
      message: `User dengan id: ${id} name: ${name} email: ${email} berhasil ditambahkan`,
    });
  });

// Tambahkan method DELETE /user/:id untuk menghapus data user
router.delete("/user/:id", (req, res, next) => {
  const { id } = req.params;

  // cari user dengan id yang sama
  const user = users.find((user) => user.id === parseInt(id));
  
  // jika tidak ditemukan, maka tampilkan pesan error
  if (!user) {
    res.status(404).json({
      message: `User dengan id: ${id} tidak ditemukan`,
    });
  }
  
  // jika ditemukan, maka hapus user tersebut
  // kita cari index dari user yang ditemukan
  const index = users.indexOf(user);
  // hapus data user dari index tersebut
  // 1 berarti hanya menghapus satu data
  // semisal 2, berarti yang dihapus adalah data tersebut dan data selanjutnya
  users.splice(index, 1);

  // setelah menghapus user, tampilkan pesan sukses hapus user
  res.status(200).json({
    message: `User dengan id: ${id} berhasil dihapus`,
  });
});

module.exports = router;
