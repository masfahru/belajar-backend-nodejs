/**
 *  Require Module
 *
 *  Kita akan belajar membuat module Nodejs berupa file js yang diexport
 *  sehingga bisa di-import menggunakan require di file server 09-require.js
 */

const querystring = require("querystring");
const fs = require("fs");

// kita ambil bagian req, res dari file 08-sync-async.js
// kemudian jadikan fungsi sendiri beri nama requestHandler

const requestHandler = (req, res) => {
  let urlReq, methodReq, dataRequest;
  const chunkArr = [];
  const dataResponse = {};

  urlReq = req.url;
  methodReq = req.method ?? "get";

  res.setHeader("Content-Type", "application/json");

  // Mulai timer
  console.time("Timer");

  // hanya setujui endpoint /login
  if (urlReq !== "/login" || methodReq.toLowerCase() !== "post") {
    dataResponse.data = "Silahkan akses endpoint /login dengan method post";
    return res.end(JSON.stringify(dataResponse));
  } else {
    req.on("data", (chunk) => {
      chunkArr.push(chunk);
    });

    // Setelah data request selesai (end) diterima oleh server
    req.on("end", () => {
      // jika chunkArr berisi data
      if (chunkArr.length !== 0) {
        // proses chunkArr menjadi data asli
        dataRequest = Buffer.concat(chunkArr).toString();

        // kita ubah dataRequest menjadi object
        let requestObj = querystring.parse(dataRequest);

        // masukkan requestObj ke dalam dataResponse
        dataResponse.data = requestObj;
      }

      /**
       *    fs.writeFile merupakan kode asynchronous untuk membuat file
       *    cek: https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback
       *
       *    fs.writeFileSync merupakan kode synchronous untuk membuat file
       *    cek: https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options
       */

      /**
       *    Untuk mengetahui efek synchronous dan asynchronous, maka
       *    secara bergantian jalankan server dengan uncomment writeFile dan writeFilesync
       */

      let dataObj = JSON.stringify(dataResponse);

      /**
       *  writeFile membutuhkan callback ketika file berhasil dibuat maupun jika ada error
       */
      fs.writeFile("request.txt", dataObj, (err) => {
        // Jika ada error maka tampilkan di console
        if (err) console.log(err.toString());
        // jika sukses tampilkan di console pesan
        console.log("file disimpan");
      });

      // akhiri timer dan munculkan selisih waktu di console
      console.timeEnd("Timer");
      return res.end(dataObj);
    });
  }
};

// Export fungsi requestHandler dengan sintaks module.exports seperti berikut
module.exports = requestHandler
module.exports.handler = requestHandler