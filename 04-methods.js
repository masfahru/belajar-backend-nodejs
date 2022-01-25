/**
 * Request Method
 *
 * Belajar routing dan method sederhana di Nodejs
 *
 * Ini adalah materi dasar agar kita tahu sedikit mengenai sistem di framework Backend seperti Expressjs, Hapijs, Nestjs, dll
 */

const http = require("http");

const server = http.createServer((req, res) => {
  /**
   * Inisiasi variabel yang akan dipakai
   *
   * url berisi path url di request
   * method berisi jenis method pada request, nilai defaultnya get
   * dataResponse berisi data yang akan dikirimkan kepada klien
   *
   * */
  let url, method, dataResponse;

  // Set response header berupa json
  res.setHeader("Content-Type", "application/json");

  // ambil path url dari request
  url = req.url;

  // ambil method, jika tidak ada isi dengan get
  method = req.method ?? "get";

  // ada baiknya cek ada tidaknya url
  if (!url) {
    dataResponse = {
      data: "Unknown URL",
    };
    res.end(JSON.stringify(dataResponse));
    return;
  }

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

    // hanya bisa diakses menggunakan method post
    if (method.toLowerCase() === "post") {
      dataResponse = {
        data: "Ini adalah halaman Login dengan method POST",
      };
    } else {
      dataResponse = {
        data: "Tidak bisa selain method POST di halaman Login",
      };
    }
  } else {
    // Selain url diatas dianggap 404 not found
    dataResponse = {
      data: "Halaman Tidak Ditemukan",
    };
  }

  // Kirim data berupa Json
  res.end(JSON.stringify(dataResponse));

  /**
   *
   * Setelah menjalankan server ini,
   * silahkan kunjungi url berikut
   *
   * localhost:3000
   * localhost:3000/login dengan method get
   * localhost:3000/LOGIN dengan method post (gunakan Postman)
   * localhost:3000/random
   *
   */
});

// set port server
server.listen(3000);
