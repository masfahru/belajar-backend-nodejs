# Struktur Project Express

Express sebagai framework Backend memilki struktur project yang cukup sederhana.

Untuk membuat project Express, yang perlu kita lakukan antara lain:

1. Install dependensi
2. Instasiasi express
3. Kofigurasi express
4. Middleware express
5. Route express
6. Error handling
7. Run project

bagian nomor 1, 2, dan 7 telah kita pelajari sebelumnya.

## Install Dependensi

Express merupakan module eksternal, sehingga perlu kita install dependensinya terlebih dahulu. Cara install express ke dalam project Nodejs kita adalah sebagai berikut:

    npm install express --save

## Instansiasi Express

Instansiasi express adalah proses membuat instance atau object dari express. Cara instansiasi express adalah sebagai berikut:

    // import module express
    const express = require('express');
    // instansiasi express
    const app = express();

kita gunakan `const` agar variabel `express` dan `app` tidak bisa diubah nilainya.

## Konfigurasi Express

Konfigurasi express adalah cara mengatur aplikasi express secara umum. Terdapat 2 cara untuk konfigurasi express:

* In app configuration, yang ditulis di dalam file root aplikasi (dalam modul ini bernama index.js, namun bisa jadi app.js dan nama lainnya)
* External configuration, yang ditulis di dalam file sendiri bernama `.env` ataupun config.js

## Middlerware

Middleware adalah kode-kode yang bertugas mengolah data request dari client menjadi data response yang dikirimkan kembali ke client. Semua kode yang berhubungan dengan logika aplikasi berada di dalam middleware.

## Routes

Routes adalah bagian dari express yang bertindak sebagai pintu masuk data request ke middleware.

## Error handling

Error handling adalah bagian yang bertugas untuk menangani error yang terjadi pada middleware. Error handling bisa ditulis di dalam middleware ataupun di dalam routes.

## Run project

Untuk menjalankan project express, kita bisa gunakan command line:

    node index.js

atau menjalankan scripts dari package.json yang telah dimodifikasi yakni :

    npm run start

## What's more

Selanjutnya kita akan belajar tentang:

1. Konfigurasi Express
2. Middleware
3. Routes
4. Error handling