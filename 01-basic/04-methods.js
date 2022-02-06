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

  /**
   * Routing berarti memberi respons kepada client tergantung pada url path dan method
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
        data: "Request berhasil di halaman login menggunakan method POST",
      };
    } else {
      dataResponse = {
        data: "Tidak bisa melakukan request selain method POST di halaman Login",
      };
    }
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
   * localhost:3000/login dengan method get
   * localhost:3000/LOGIN dengan method post (gunakan Postman)
   * localhost:3000/random
   *
   */
});

// set port server
server.listen(3000);

/**
 *    PENTING !!!
 *
 *  Banyak method HTTP yang tersedia, bisa dicek di Postman ya
 *  Nah kami akan menjelaskan beberapa method yang sering dipakai,
 *  Menyesuaikan dengan metode CRUD (Create, Read, Update, Delete),
 *  yaitu:
 *
 *      1. GET
 *         Method untuk mendapatkan data saja (READ)
 *      2. POST
 *         Method untuk mengirim data ke server agar disimpan (CREATE)
 *      3. PUT
 *         Method untuk mengirim data ke server agar data yang telah ada diganti dengan data baru (UPDATE)
 *      4. DELETE
 *         Method untuk menghapus data yang ada di server (DELETE)
 *
 *
 *      Adanya perbedaan method ini agar kode memiliki makna yang sesuai (semantik),
 *      Kita juga bisa hanya gunakan method POST untuk menggantikan PUT dan DELETE.
 *
 *   Pembahasan lebih lanjut akan ada di modul Express ya
 *
 */
