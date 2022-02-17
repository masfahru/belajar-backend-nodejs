# Middleware

Middleware adalah sebutan untuk kode yang memproses request menjadi response. Kita sudah pernah menggunakan middleware sebelumnya, seperti pada modul `01-basic/09-require-module.js`.

Contoh middleware yang telah kita buat sebelumnya pada modul tersebut dengan nama fungsi `requestHandler`:

```javascript
const querystring = require("querystring");
const fs = require("fs");
const requestHandler = (req, res) => {
  let urlReq, methodReq, dataRequest;
  const chunkArr = [];
  const dataResponse = {};
  urlReq = req.url;
  methodReq = req.method ?? "get";
  res.setHeader("Content-Type", "application/json");
  if (urlReq !== "/login" || methodReq.toLowerCase() !== "post") {
    dataResponse.data = "Silahkan akses endpoint /login dengan method post";
    return res.end(JSON.stringify(dataResponse));
  } else {
    req.on("data", (chunk) => {
      chunkArr.push(chunk);
    });
    req.on("end", () => {
      if (chunkArr.length !== 0) {
        dataRequest = Buffer.concat(chunkArr).toString();
        let requestObj = querystring.parse(dataRequest);
        dataResponse.data = requestObj;
      }
      let dataObj = JSON.stringify(dataResponse);
      return res.end(dataObj);
    });
  }
};
```

Yang kemudian kita gunakan pada http server Nodejs sebagai berikut:

```javascript
const http = require("http");

// Gunakan middleware requestHandler di atas pada server
const server = http.createServer(requestHandler);

server.listen(3000);
```

Kekurangan dari pembuatan middlerware seperti di atas yakni semua kode ditulis pada sebuah fungsi. Pada contoh di atas kita hanya menulis kode untuk sebuah route `/login`, bayangkan jika ratusan route, maka kode akan menjadi sangat panjang.

## Express

Express adalah modul framework pada Nodejs yang berfungsi untuk menyederhanakan middleware. Dengan menggunakan Express, memungkinkan kita menulis banyak fungsi sebagai middleware. Express juga memungkinkan penulisan route dan method request yang lebih mudah.


## Express Middleware

Middleware pada Express memiliki cukup ban