/**
 * Routing
 *
 * Belajar routing sederhana di Nodejs
 *
 * Ini adalah materi dasar agar kita tahu sedikit mengenai sistem di framework Backend seperti Expressjs, Hapijs, Nestjs, dll
 */

const http = require("http");

const server = http.createServer((req, res) => {
  /**
   * Inisiasi variabel yang akan dipakai
   *
   * url berisi path url di request
   * dataResponse berisi data yang akan dikirimkan kepada klien
   *
   * */
  let url, dataResponse;

  // Set response header berupa json
  res.setHeader("Content-Type", "application/json");

  // ambil path url dari request
  url = req.url;

  /**
   * Routing berarti memberi respons kepada client tergantung pada url
   */

  // kita buat routing untuk homepage, login, dan 404 not found
  // routing homepage
  if (url === "/") {
    dataResponse = {
      data: "Ini adalah Homepage",
    };
  } else if (url.toLowerCase() === "/login") {
    // routing login
    // penggunaan toLowerCase untuk mengurangi kesalahan karena case-sensitive
    dataResponse = {
      data: "Ini adalah halaman Login",
    };
  } else if (url.toLowerCase() === "/register") {
    // routing register
    dataResponse = {
      data: "Ini adalah halaman Register",
    };
  } else {
    // Selain url diatas dianggap 404 not found
    dataResponse = {
      data: "Halaman Tidak Ditemukan",
    };
  }

  // Kirim data berupa Json
  return res.end(JSON.stringify(dataResponse));

  /**
   *
   * Setelah menjalankan server ini,
   * silahkan kunjungi url berikut
   *
   * localhost:3000
   * localhost:3000/login
   * localhost:3000/LOGIN
   * localhost:3000/random
   *
   */
});

// set port server
server.listen(3000);
