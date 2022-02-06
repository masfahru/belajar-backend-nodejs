/**
 * Request Body
 *
 * Belajar parsing data body dari request
 *
 * Ini adalah materi dasar agar kita tahu sedikit mengenai sistem di framework Backend seperti Expressjs, Hapijs, Nestjs, dll
 */

/**
 *  Data dari formulir HTML dikirim ke server melalui request body
 *
 *  Semisal kita hendak membuat akun atau login ke suatu website,
 *  biasanya kita diminta untuk mengisi formulir dengan banyak kolom.
 *  Nah data yang kita inputkan pada kolom tersebut dikirim ke server dalam request body
 *
 *  Kali ini kita belajar menampilkan cara untuk membaca request body pada server Nodejs
 */

/**
 *  Ada 2 bentuk transaksi data antara klien dan server:
 *      1. Upload: merupakan pengiriman data dari klien ke server
 *      2. Download: merupakan pengiriman data dari server ke klien
 *
 *  Stream adalah seluruh kegiatan transaksi data dari awal sampai selesai, yakni:
 *      1. Mulai dari inisiasi data pada tujuan
 *      2. Pemisahan data yang akan dikirim menjadi bagian kecil (chunks)
 *      3. Pengiriman data chunks ke tujuan disebut dengan Buffering
 *      4. Setelah data selesai dibuffer semua, proses data agar menjadi utuh kembali
 *
 *  Chunks memiliki tipe data Buffer
 *  Chunks dikumpulkan pada sebuah array
 *
 *  Seiring kemajuan teknologi, pada stream video seperti di Youtube,
 *  kita bisa menonton video yang sedang distreaming, selama tidak buffer aja videonya
 *
 *  Pada data request dengan ukuran data sangat kecil seperti data formulir maka proses stream ini tidak terasa.
 *  Namun pada data request dengan ukurannya besar seperti video yang diupload ke youtube,
 *  maka data tersebut diupload secara bertahap, yang ditandai dengan adanya progress bar atau status upload
 */

/**
 *  Lab ini sebatas menerima request body ukuran kecil
 */

const http = require("http");

// modul querystring untuk mengubah format query string menjadi object
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  /**
   * Inisiasi variabel yang akan dipakai
   *
   * urlReq berupa string berisi path url di request
   * methodReq berupa string berisi jenis method pada request
   * chunkArr berupa array yang akan diisi dengan chunks dari request
   * dataRequest berupa string berisi hasil konversi chunkArr ke data asal
   * dataResponse berupa object dari request body yang akan dikirim ke klien
   *
   * */
  let urlReq, methodReq, dataRequest;

  // pakai const agar tipe datanya tidak diubah
  const chunkArr = [];
  const dataResponse = {};

  res.setHeader("Content-Type", "application/json");

  // dapatkan path dari url
  urlReq = req.url;

  // Jika method tidak disertakan, isi dengan get
  methodReq = req.method ?? "get";

  /**
   *  Kita buat routing ke /login
   *  yang hanya menerima method GET dan POST
   */

  // jika /login diakses
  if (urlReq.toLowerCase() === "/login") {
    // dengan method get
    if (methodReq.toLowerCase() === "get") {
      // berikan respon berisi keterangan halaman login
      dataResponse.data = "ini adalah halaman login";
    } else if (methodReq.toLowerCase() === "post") {
      // selama buffering data body
      req.on("data", (chunk) => {
        // kita tambahkan data chunk ke chunkArr
        chunkArr.push(chunk);
      });
    } else {
      dataResponse.data = "Hanya menerima method GET dan POST";
    }
  } else {
    // jika bukan /login yang diakses, ya beritahu aja
    dataResponse.data = "Gunakan endpoint /login";
  }

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
    // kemudian kirim ke client
    return res.end(JSON.stringify(dataResponse));
  });

  /**
   *
   * Setelah menjalankan server ini,
   * silahkan buka postman dan lakukan request dengan method get dan post
   *
   * localhost:3000/login
   *
   * saat menggunakan method post di postman, tambahkan Body berisi x-www-form-urlencoded
   * x-www-form-urlencoded ini setara dengan form yang ada di html
   *
   */

  /**
   *  Notice !!!!!
   *
   *  Lab ini bertujuan untuk memberi informasi mengenai bagaimana framework backend bekerja
   *  Semua hal di atas akan disederhanakan dan dipermudah oleh framework backend seperti ExpressJS, HapiJS, dan NestJS
   *
   */
});

// set port server
server.listen(3000);
