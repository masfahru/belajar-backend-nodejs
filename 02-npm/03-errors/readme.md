# Error

Mungkin tidak perlu dijelaskan lebih jauh mengenai error. Yang pasti, error itu merupakan suatu kesalahan yang terjadi sehingga aplikasi tidak berjalan seperti yang diharapkan.

Terdapat 3 jenis error yang dapat terjadi:

1. Syntax Error
2. Runtime Error
3. Logical Error

Pejelasannya adalah sebagai berikut:

## Syntax Error

Syntax Error merupakan kesalahan yang terjadi karena kode yang tulis tidak sesuai dengan sintaks yang benar. Misalnya, kode yang ditulis adalah:

```javascript
    cons x = "Hello World";
    console.log(x);
```

`cons x` menjadi error dikarenakan sintaks yang benar untuk membuat sebuah variabel konstanta adalah `const`.

Syntax Error biasanya terjadi karena typo, kelalaian, atau kesalahan penulisan kode. Biasanya, Visual Studio Code akan menampilkan error tersebut dalam bentuk garis bawah merah atau pesan error di bagian bawah layar.

## Runtime Error

Runtime error merupakan kesalahan yang baru tampil saat kode dijalankan. Error ini tampil di log error seperti pada console log maupun log error lainnya. Biasanya terjadi karena kekeliruan dalam penempatan kode atau kesalahan dalam pemanggilan kode.

Contoh:

```javascript
console.logTime();
```

kode diatas tidak akan menampilkan error pada Visual Studio Code namun akan menampilkan error ketika dijalankan karena tidak ada fungsi `console.logTime()`.

Ketika terjadi error, maka aplikasi akan menghentikan eksekusi dan menampilkan error tersebut.

## Logical Error

Logical Error merupakan kesalahan yang tidak menampilkan error di Visual Studio Code maupun ketika server dijalankan. Error ini menghasilkan server yang berjalan tidak seperti yang diharapkan. Terjadi karena kode yang ditulis tidak sesuai dengan logika yang benar.

Contoh dari Logical Error ada pada labs 01-basic/07-eventdriven.js

```javascript
const server = http.createServer((req, res) => {
  let urlReq, methodReq, dataRequest;
  const chunkArr = [];
  const dataResponse = {};
  urlReq = req.url;
  methodReq = req.method ?? "get";
  req.on("data", (chunk) => {
    chunkArr.push(chunk);
  });

  req.on("end", () => {
    if (chunkArr.length !== 0) {
      dataRequest = Buffer.concat(chunkArr).toString();
      console.log(dataRequest);
      let requestObj = querystring.parse(dataRequest);
      dataResponse.data = requestObj;
    }
    console.log(JSON.stringify(dataResponse));
  });

  // return res.end seharusnya berada di dalam req.on("end"),
  // tapi karena di letakkan di luar req.on("end"), maka return res.end tidak berisi apa apa.
  return res.end(JSON.stringify(dataResponse));
});
```

## Debugging

Debugging merupakan proses menemukan masalah pada kode yang ditulis. Debugging dapat dilakukan dengan cara menggunakan tools seperti Visual Studio Code, Chrome Dev Tools, dan lainnya.

Pada pemrograman server, kita bisa menggunakan console.log untuk debugging dengan menampilkan data yang dibutuhkan. Contoh pada file 01-basic/07-eventdriven.js bisa diubah menjadi seperti berikut:

```javascript
const server = http.createServer((req, res) => {
  let urlReq, methodReq, dataRequest;
  const chunkArr = [];
  const dataResponse = {};
  urlReq = req.url;
  methodReq = req.method ?? "get";
  req.on("data", (chunk) => {
    chunkArr.push(chunk);
  });

  req.on("end", () => {
    if (chunkArr.length !== 0) {
      dataRequest = Buffer.concat(chunkArr).toString();
      console.log(dataRequest);
      let requestObj = querystring.parse(dataRequest);
      dataResponse.data = requestObj;
    }

    // uncomment kode dibawah menampilkan dataResponse
    // console.log(JSON.stringify(dataResponse));
    // jika terdapat data berarti kode di bawah ini berhasil
    // return res.end(JSON.stringify(dataResponse));
  });

  // uncomment kode dibawah menampilkan dataResponse
  // console.log(JSON.stringify(dataResponse));
  // jika tidak ada data yang tampil berarti kode di bawah ini menjadi logical
  // return res.end(JSON.stringify(dataResponse));
});
```
