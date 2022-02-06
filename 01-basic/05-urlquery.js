/**
 * URL QUERY String
 *
 * Query String adalah pasangan key - value yang ada pada url.
 *
 * Ini adalah materi dasar agar kita tahu sedikit mengenai sistem di framework Backend seperti Expressjs, Hapijs, Nestjs, dll
 */

/**
 *  Pernah ga sih kalian search di Google kemudian urlnya memanjang?
 *
 *  URL dari sekedar https://www.google.com/
 *  Kemudian kita masukkan keyword Indonesia di kolom pencarian Google
 *  Tetiba URLnya menjadi https://www.google.com/search?q=Indonesia
 *
 *  adanya tanda tanya (?) digunakan untuk memisahkan antara url dengan querynya
 *
 *  URL https://www.google.com/search tersebut ditambahkanlah query berikut:
 *
 *                  q=Indonesia
 *
 *  yang merupakan pasangan key - value:
 *           key = q
 *           value = Indonesia
 *
 *  Query digunakan untuk mengirim data ke server dengan menggunakan method GET
 */

const http = require("http");

// modul url untuk mengekstract query pada url
const url = require("url");

// modul querystring untuk membuat object dari query yang di url
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  /**
   * Inisiasi variabel yang akan dipakai
   *
   * urlRequest berisi path url di request
   * urlObj berisi url yang telah diproses
   * urlQuery berisi object dari query
   * dataResponse berisi object dari query yang telah diparsing
   *
   * */
  let urlRequest, urlObj, urlQuery, dataResponse;

  res.setHeader("Content-Type", "application/json");

  urlRequest = req.url;

  // jadikan string urlRequest menjadi object URL
  urlObj = url.parse(urlRequest);

  console.log(urlObj)

  // ambil property query dari object URL
  urlQuery = urlObj.query;

  // Jika tidak ada query pada url maka kirim pemberitahuan
  if (!urlQuery) {
    dataResponse = {
      data: "Tidak ada query string",
    };

    // Kirim data ke klien
    return res.end(JSON.stringify(dataResponse));
  }

  // isi dataResponse dengan hasil parsing urlQuery
  dataResponse = querystring.parse(urlQuery);

  // Kirim data ke klien
  return res.end(JSON.stringify(dataResponse));

  /**
   *
   * Setelah menjalankan server ini,
   * silahkan kunjungi url berikut
   *
   * localhost:3000
   * localhost:3000/?
   * localhost:3000/?search=BelajarJavascript
   * localhost:3000/?judul=Belajar+Javascript&materi=Nodejs+dasar
   *
   */
});

// set port server
server.listen(3000);
