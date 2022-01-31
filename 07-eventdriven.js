/**
 * Event Driven Execution
 *
 * Memahami eksekusi kode berdasarkan adanya event
 *
 */

/**
 *  Pada lab sebelumnya kita menemukan kode
 *      req.on()
 *      res.end()
 *      dan sejenisnya
 *
 *  Kode di atas merupakan bagian dari Event Driven Execution, yakni kode yang dijalankan berdasarkan event
 *  Sebagai contoh:
 *      req.on('data', callback) akan menjalankan fungsi callback selama buffer data
 *      req.on('end', callback) akan menjalankan fungsi callback setelah buffer data berakhir (end)
 *      res.end(callback) digunakan untuk menjalankan fungsi callback saat mengakhiri response
 *
 *  Dengan adanya event driven code execution memungkinkan kode kita berjalan secara Asynchronous
 *  sehingga kita tidak harus menulis kode secara berurutan.
 *
 */

const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  /**
   *    Inisiasi variabel yang dibutuhkan:
   *
   *    urlReq berupa string berisi path url di request
   *    methodReq berupa string berisi jenis method pada request
   *    chunkArr berupa array yang akan diisi dengan chunks dari request
   *    dataRequest berupa string berisi hasil konversi chunkArr ke data asal
   *    dataResponse berupa object dari request body yang akan dikirim ke klien
   *
   */

  let urlReq, methodReq, dataRequest;
  const chunkArr = [];
  const dataResponse = {};

  // dapatkan path dan method
  urlReq = req.url;
  methodReq = req.method ?? "get";

  // kita hanya acc request dengan method POST pada endpoint login
  // jadi selainnya kita kirimi pemberitahuan
  if (urlReq !== "/login" || methodReq.toLowerCase() !== "post") {
    dataResponse.data = "Silahkan akses endpoint /login dengan method post";
    return res.end(JSON.stringify(dataResponse));
  } else {
    // selama buffering data body
    req.on("data", (chunk) => {
      // kita tambahkan data chunk ke chunkArr
      chunkArr.push(chunk);
    });

    // Setelah data request selesai (end) diterima oleh server
    req.on("end", () => {
      // jika chunkArr berisi data
      if (chunkArr.length !== 0) {
        // proses chunkArr menjadi data asli
        // cara ini biasa dipakai, so don't ask why 😅
        dataRequest = Buffer.concat(chunkArr).toString();

        // tampilkan dataRequest pada console.log
        console.log(dataRequest);
        // perhatikan di console log bahwa dataRequest mengikuti format querystring

        // kita ubah dataRequest menjadi object
        let requestObj = querystring.parse(dataRequest);

        // masukkan requestObj ke dalam dataResponse
        dataResponse.data = requestObj;
      }

      // tampulkan dataResponse pada console.log
      console.log(JSON.stringify(dataResponse));

      // [TASK]: Uncomment secara bergantian baris res.end()
      // untuk mengetahui efek dari event req.on
      // return res.end(JSON.stringify(dataResponse));
    });

    // [TASK]: Uncomment secara bergantian baris res.end()
    // untuk mengetahui efek dari event req.on
    return res.end(JSON.stringify(dataResponse));
  }
});

server.listen(3000);

/**
 *    Info !!!
 *
 *    Nodejs mendukung asynchronous dengan menggunakan event driven execution
 *    Sebisa mungkin tempatkan kode sesuai konteksnya.
 *
 *    Pada contoh di atas:
 *      req.on("end") hanya akan menjalankan fungsi ketika data request selesai diterima
 *
 *    Ketika res.end ditulis diluar req.on("end") maka res.end akan dijalankan segera
 *
 *    Ketika res.end ditulis didalam req.on("end") maka res.end akan dijalankan ketika data selesai diterima server
 *
 */
