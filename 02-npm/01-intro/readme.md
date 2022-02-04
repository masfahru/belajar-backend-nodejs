# Node Package Manager

NPM merupakan alat untuk membuat project dan menginstall modul javascript yang telah dibuat oleh komunitas

Kita mengetahui dari modul 01-basic sebelum ini, bahwa sangat rumit jika kita membuat semua modul sendiri. Oleh karenanya, Node menyediakan package manager agar kita bisa saling berbagi modul. 

Pada tutorial ini, kita akan membuat project Nodejs dengan menggunakan beberapa modul dari komunitas.

## Membuat Project Nodejs

Untuk membuat project Nodejs baru, buka terminal, kita bisa gunakan kode:

`npm init`

Selanjutnya, masukkan data yang dibutuhkan seperti:

1.  Nama project, formatnya snake-case
2.  Versi, bisa nilai default : 1.0.0
3.  Description, diisi dengan deskripsi project
4.  entry point, diisi nilai : index.js
5.  test command: skip lebih dahulu dengan menekan tombol enter
6.  git repository, skip juga
7.  keywords, skip juga
8.  Author: isi nama kalian
9.  License, skip atau bisa diisi MIT
10. Is this OK? yes

Setelah selesai, maka akan ada file `package.json` berisi data yang telah dimasukkan sebelumnya.

## package.json

File package.json berisi tentang informasi dari project yang telah kita buat. Nantinya semua package modul yang diinstal akan tampil di sini.


## scripts

Scripts pada file package.json diisi dengan perintah untuk menjalankan aplikasi Nodejs, untuk saat ini kita ubah bagian test menjadi berikut:

`"start": "node index.js"`

### Note:

Seperti yang kita ketahui dari materi basic sebelumnya, script `node index.js` merupakan perintah untuk menjalankan file javascript di Nodejs.

## index.js

Selanjutnya buat file index.js, kode beserta penjelasannya kurang lebih kami ambil dari materi basic sebelumnya yaitu ~/01-basic/08-sync-async.js

Kami sudah menyalin kode yang dibutuhkan ke file index.js, silahkan cek ya

## npm run start

Kita jalankan server yang telah dibuat di index.js dengan menjalankan perintah `npm run start`.

## Postman

Buka postman, kirim request ke endpoint localhost:3000/login dengan method POST