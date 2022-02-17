// Import module express yang dibutuhkan
const express = require('express');

// Tentukan Port Server
const port = 3000;

// Buat express app
const app = express();

// Buat sebuah route / dengan menggunakan express middleware
app.get('/', (req, res) => {
  // Kirim data Hello world ke Client
  res.send('Hello World!');
});

// Tambahkan server ke port
app.listen(port);