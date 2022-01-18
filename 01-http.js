/**
 *  Core Module: HTTP
 *  
 *  Kita belajar membuat server sederhana dengan menggunakan module http
 */

// Import module http dengan require
const http = require('http')

// buat server dengan method createServer
const server = http.createServer((req, res) => {
    // tampilkan pada console.log request yang diterima oleh server
    console.log(req)

    // Buat sebuah object data dummy
    let data = {
        message: 'Hello World'
    }

    // Set response header berupa json
    res.setHeader('Content-Type', 'application/json')

    // Kirim data berupa Json
    res.end(JSON.stringify(data))
})

// set port server
server.listen(3000)
