/**
 *      Synchronous Asynchronous
 */

/**
 *  Normalnya, kode dijalankan secara berurutan dari kode baris paling atas sampai baris paling bawah
 *
 *  Synchronous berarti jalannya kode ini sinkron, semisal ada kode yang membutuhkan waktu pemrosesan cukup lama
 *  maka kode setelahnya harus menunggu dulu sampai selesai baru kemudian dijalankan.
 *  Kasus seperti di atas disebut juga dengan Blocking code (kode yang memblokir jalannya kode setelahnya).
 *
 *  Asynchronous berarti jalannya kode tidak harus sinkron, kode yang disetel asynchronous tidak memblokir jalannya kode berikutnya.
 *  Kode seperti kasus ini disebut dengan non-blocking code.
 *
 *  Demi kenyamanan programmer, beberapa fungsi dan library Nodejs telah asynchronous,
 *  contoh seperti pada lab sebelumnya yakni req dan res adalah asynchronous yang bergantung pada event.
 *
 */

/**
 *  Pembelajaran kali ini kita akan menggunakan fitur membuat file di Nodejs
 *
 *  Module Nodejs yang digunakan adalah fs (filesystem)
 *
 *  Skenarionya:
 *      1. User membuat request di postman dengan method post pada endpoints /login
 *      2. Mulai timer
 *      3. Ekstrak data request
 *      4. Tulis data hasil ekstrak ke file (dengan sync maupun async)
 *      5. Matikan timer dan tampilkan di console
 *
 */

const http = require("http");
const querystring = require("querystring");
const fs = require("fs");

const server = http.createServer((req, res) => {
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
      // fs.writeFile("request.txt", dataObj, (err) => {
      //   // Jika ada error maka tampilkan di console
      //   if (err) {
      //     console.log(err.toString());
      //     throw err;
      //   }
      //   // jika sukses tampilkan di console pesan
      //   console.log("file telah disimpan");
      // });

      /**
       *  writeFileSync tidak membutuhkan callback, jika terjadi error sistem akan berhenti
       */
      fs.writeFileSync("request.txt", dataObj);
      console.log("file telah disimpan");

      // akhiri timer dan munculkan selisih waktu di console
      console.timeEnd("Timer");
      return res.end(dataObj);
    });
  }
});

server.listen(3000);

/**
 *    Silahkan jalankan server dengan uncomment kode fs.write secara bergantian
 *
 *    Perhatikan perbedaan output di console
 *
 *    Ketika menggunakan fs.writeFile yang merupakan asynchronous code
 *    maka di console log: "Timer" akan muncul terlebih dahulu sebelum "file disimpan"
 *
 *    Ketika menggunakan fs.writeFileSync yang merupakan synchronous code
 *    maka di console log: "file disimpan" akan muncul terlebih dahulu sebelum "Timer"
 *
 *    Hal ini terjadi karena kode asynchronous tidak menghambat jalan kode setelahnya.
 */
