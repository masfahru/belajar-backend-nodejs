/**
 *  Module and Require
 *
 *  Kita akan belajar mengimport module yang telah kita buat sendiri
 * 
 *  file server ini menjadi lebih ringkas dengan memisahkan request handler.
 */

const http = require("http");

// import module require-module
const reqHandler = require("./09-require-module");
const { handler } = require("./09-require-module");

// buat server dengan reqHandler
const server = http.createServer(reqHandler);
server.listen(3000);
