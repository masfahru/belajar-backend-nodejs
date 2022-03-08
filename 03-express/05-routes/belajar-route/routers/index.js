// module express wajib ada
const express = require('express');
// module body-parser untuk memparsing data request
const bodyParser = require('body-parser');

// buat instance router
const router = express.Router();
// kita tidak membuat instance app karena app hanya boleh ada 1 di file root index.js

// kita buat route index 
// method GET
router.get('/', (req, res, next) => {
  res.send('Wellcome to route Index method GET');
});

// method POST
/**
 * Skenario :
 * 1. Ubah data RAW request jadi JSON dengan middleware body-parser json
 * 2. Ekstrak data request body menjadi object dengan middleware body-parser urlencoded
 * 3. Kirim data request body ke User
 * 
 * */
router.post('/', bodyParser.urlencoded({ extended: true }), (req, res, next) => {
  res.send(req.body);
});

// method DELETE
/**
 * Method DELETE biasanya digunakan untuk menghapus data berdasarkan parameter ID
 * Skenario:
 * 1. Kirimkan data pada user pesan berupa "Data dengan ID [ID] telah dihapus"
 * 2. Jika tidak ada parameter ID, maka kirmkan pesan berupa  "Masukkan ID yang akan dihapus"
 * 
 * */
router.delete('/:id', (req, res, next) => {
    res.send(`Data dengan ID ${req.params.id} telah dihapus`);
});

// Route DELETE jika lupa memasukkan id
router.delete('/', (req, res, next) => {
res.send(`Masukkan ID yang akan dihapus`);
});

// export router agar bisa kita pakai di file root index.js
module.exports = router;