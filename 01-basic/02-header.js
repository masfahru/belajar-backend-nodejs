/**
 *  Header HTTP
 *
 *  Kita belajar menerima otentikasi berupa username dan password
 *  Juga belajar untuk mengirim token bearer
 *
 *  Ini adalah materi dasar agar kita tahu sedikit mengenai sistem di framework Backend seperti Expressjs, Hapijs, Nestjs, dll
 */

// Import module http dengan require
const http = require("http");

// buat server dengan method createServer
const server = http.createServer((req, res) => {
  /**
   * Inisiasi variabel yang akan dipakai
   *
   * dataHeader akan berisi object dari header request
   * dataAuthorization akan berisi property authorization dari object dataHeader
   * splitData akan berisi hasil pemisahan value authorization
   * dataUser akan berisi kode base64 dari user dan password
   * userPass akan berisi hasil decode base64 to string dari datauser
   * dataResponse akan berisi data yang dikirim ke user
   *
   * */
  let dataHeader,
    dataAuthorization,
    splitData,
    dataUser,
    userPass,
    dataResponse;

  // Set response header berupa json
  res.setHeader("Content-Type", "application/json");

  // Dapatkan header dari request
  dataHeader = req.headers;

  // tampilkan object dataHeader pada console.log
  console.log(dataHeader);

  // Dapatkan data otorisasi
  dataAuthorization = dataHeader.authorization;

  // jika tidak ada authorization, kita kirim data peringatan
  if (!dataAuthorization) {
    dataResponse = {
      data: "Undefined Authorization",
    };

    // kirim ke client dan return agar behenti menjalankan kode setelah ini
    return res.end(JSON.stringify(dataResponse));
  }

  /**
   *  Format data authorization adalah "{jenis token} {Kode Base64}"
   *  contoh dalam kasus ini adalah "Basic dXNlcjEyMzpwYXNzMTIz" yang dipisahkan oleh spasi
   *  kita akan ambil bagian "dXNlcjEyMzpwYXNzMTIz"
   * */

  // split string menjadi array dengan batasan spasi
  splitData = dataAuthorization.split(" ");

  // Dapatkan kode base64nya, ada di index 1
  dataUser = splitData[1];

  // convert dataUser dari base64 ke string
  userPass = Buffer.from(dataUser, "base64").toString();

  // buat data respons berisi token dan userPass
  dataResponse = {
    token: dataHeader.authorization,
    userPass,
  };

  // Kirim data berupa Json
  return res.end(JSON.stringify(dataResponse));
});

// set port server
server.listen(3000);
