/**
 *  Core Module: HTTP
 *  
 *  Kita belajar membuat server sederhana dengan menggunakan module http
 */

// Import module http dengan require
const http = require('http')

// buat server dengan method createServer
const server = http.createServer((req, res) => {
    // Inisiasi variabel yang akan dipakai
    let data

    // tampilkan pada console.log request yang diterima oleh server
    console.log(req)

    /**
     *  object req terdiri dari banyak data, namun yang paling sering dipakai ada 3
     *  Yaitu url, method, headers
     */
    // buat object data berisi url, method, dan header
    data = {
        url: req.url,
        method: req.method,
        header: req.headers
    }

    // Set response header berupa json
    res.setHeader('Content-Type', 'application/json')

    // Kirim data berupa Json
    res.end(JSON.stringify(data))
})

// set port server
server.listen(3000)
