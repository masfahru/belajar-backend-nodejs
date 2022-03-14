# File Upload

File Upload tentu harus ada di setiap backend, biasanya terdapat dependensi yang bisa membantu kita untuk mengatur file upload, seperti multer, multer-s3, dan lain-lain.

Pada tutorial ini kita akan membuat project upload files yang akan disimpan di folder public, kemudian link hasil upload akan dikirimkan kepada User.

## Skenario

Upload file dengan menggunakan dependency multer. Method yang digunakan adalah POST.

1. User mengupload sebuah file endpoint `/single-upload` 
2. User mengupload beberapa file endpoint `/multi-upload`
3. User mengupload sebuah file disertai data lain endpoint `/single-upload-with-data`
4. User mengupload sebuah file dengan status upload berhasil endpoint `/single-upload-with-status`

## Persiapan Project

1. Buatlah folder `upload-files`
2. Buka terminal dan masuk ke folder `upload-files`
3. Insiasi project dengan `npm init`
4. Install dependencies : `npm install express dotenv body-parser --save`
5. Install dev-dependency : `npm install nodemon --save-dev` 
6. Buatlah file `.env`, isi dengan `PORT=3000` dan `UPLOAD_DIR=public/uploads`
7. Buatlah file `.gitignore` dengan isi `node_modules`
8. Modifikasi script `package.json` agar `scripts` berisi `"dev": "nodemon index.js"`

## index.js

```javascript
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

```
