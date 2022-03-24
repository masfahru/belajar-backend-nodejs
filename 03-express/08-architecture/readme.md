# Arsitektur Project Express

Arsitektur atau desain pengembangan software merupakan proses untuk menentukan struktur atau tata letak dari kode yang akan ditulis.

Cukup banyak arsitektur software development yang terkenal, seperti MVC, MVVM, MVP, VIPER, dan lainnya. Dengan menggunakan arsitektur yang tepat, kita akan dimudahkan dalam pengembangan dan maintenance software.

Beberapa tutorial sebelumnya, kita secara tidak sadar telah menggunakan arsitektur software development. Sebagai contoh, ketika kita menulis semua kode middleware dan route di dalam satu index.js, kita telah menerapkan arsitektur bernama [Spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code).

Pada tutorial ini, kita akan membahas arsitektur yang bisa digunakan pada project Express bernama MVC (Model View Controller). Namun tidak benar-benar MVC, kita modifikasi sedikit sesuai kebutuhan express.

Struktur arsitektur hasil modifikasi dari MVC untuk project Express kurang lebih seperti ini:

```text 
        Route
          ┃ 
      Middleware ━━━ Model ━━━ Services
          ┃
      Controller
          ┃
       View/API
```

Sehingga struktur folder project setidaknya menjadi seperti ini:

```text
project-folder
├───controllers
├───middlewares
├───models
├───public
├───routes
├───services
├───views
├───.env
├───.gitignore
├───index.js
├───package-lock.json
└───package.json
```

Tujuan dari pembagian seperti di atas yakni modularisasi kode.

Modularisasi kode adalah teknik pembagian kode menjadi beberapa kode yang independen (modul) sesuai fungsinya. Pada Nodejs, modularisasi kode dicirikan dengan adanya `export` dan `require`.

Kode yang independen (modul) harus bisa diubah atau digantikan dengan kode lain tanpa mempengaruhi sistem secara keseluruhan.

Selanjutnya kita bahas masing-masing folder.

## Routes

Route berisi file yang terdiri dari beberapa mini-app, kita telah membahas ini di tutorial sebelumnya.

## Middleware

Inti dari framework express adalah `route` dan `middleware`. Route adalah alamat yang dapat diakses oleh user, sedangkan middleware adalah kode yang akan dijalankan saat route diakses.

Middleware pun terbagi menjadi tiga tipe, yaitu: 

* built-in middleware
* external middleware
* custom middleware
* controller

### Built-in middleware

Built-in middleware adalah middleware yang sudah ada di dalam express, seperti:

* `express.json`: memparsing request ke bentuk object javascript (JSON), tidak memparsing bagian request body.
* `express.urlencoded`: memparsing request body ke bentuk object javascript (JSON). Tidak memparsing data dalam bentuk file.
* `express.static`: menjadikan sebuah folder di dalam project bisa diakses oleh publik.

### External middleware

External middleware adalah middleware yang dibuat orang lain, bisa diinstall digunakan ke dalam project.

Contoh:

* `compression`: digunakan untuk mengkompresi response yang akan dikirimkan ke client, sehingga mempercepat proses download response.
* `cookie-parser`: digunakan untuk memparsing data cookie dari header request yang dikirimkan oleh client ke dalam `req.cookies`.
* `cors`: digunakan memberi akses kepada client yang datang dari website lain, contoh: youtube menggunakan cors agar videonya bisa di-embed ke dalam website lain.
* `csurf`: digunakan untuk menghindari Cross-Site Request Forgery (CSRF). CSRF adalah sebuah serangan situs dengan cara attacker mencuri cookies berisi kredensial dari website.
* `errorhandler`: Middleware untuk tracing error secara lengkap, middleware ini digunakan hanya pada development.
* `morgan`: digunakan untuk menampilkan log request-response ke dalam console. Contohnya waktu yang dihabiskan untuk mengolah data request yang diterima di middleware morgan sampai ke pengiriman response untuk user.
* `multer`: digunakan untuk menangani request yang memiliki file di dalam request-body-nya. Jadi bisa digunakan untuk menangani upload file.
* Beberapa middleware lain bisa dicek di sini : [https://github.com/orgs/expressjs/repositories](https://github.com/orgs/expressjs/repositories)

### Custom Middleware

Custom middleware adalah middleware yang kita buat sendiri di dalam folder `middlewares`.

Sebuah middleware seharusnya memiliki sifat single-responsibility (satu tanggung jawab). Misalkan data request perlu divalidasi agar sesuai dengan format tertentu, maka tahapan validasi ini dijadikan sebuah middleware yang bisa digunakan kembali.

## Controller

Controller merupakan middleware yang berada di depan dan di belakang alur pengolahan data request.

```text
Input (request) -> Route -> Controller -> Middleware -> Controller -> Output response
```

Controller yang berada di depan menangani request seperti validasi data dan transformasi data jika dibutuhkan, memastikan data request yang diterima server valid sehingga mengurangi kemungkinan terjadinya error.

Controller yang berada di belakang menangani response seperti membuat response yang dikirimkan ke user, status code, dan header.

## View 

Tahukan kamu, bahwa Express bisa menampilkan HTML kepada user. Tampilan (view) ini dihasilkan dari kombinasi antara data dari middleware dengan file template HTML yang ada di folder `views`.

Ada cukup banyak template HTML yang bisa kita gunakan, beberapa yang terkenal adalah Pug, Ejs, dan Handlebars. Kita akan belajar menggunakan Handlebars sebagai template HTML.

## Model

Model merupakan sebuah object atau class yang digunakan untuk meng-enkapsulasi data. _Data encapsulation_ sederhananya adalah memenjarakan data, dimana akses dan modifikasi data harus melalui method yang ada di dalam model. Hal ini akan mengurangi konflik jika beberapa kode mengakses data yang sama.

Di dalam sebuah model terdapat skema data yang jelas sehingga membantu kita dalam memahami data yang akan kita gunakan.

## Services

Service berisi kode yang berkaitan dengan bisnis logic atau hubungan dengan service lain, seperti Database, Cache, ataupun mengakses API dari luar.