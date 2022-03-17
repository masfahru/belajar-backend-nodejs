const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

// GET / tampilkan pesan "Ini adalah route index method Get"
router.get("/", (req, res, next) => {
  res.send("Ini adalah route index method Get");
});

// POST / tampilkan data yang di kirimkan melalui req.body
router.post("/",
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
  res.json(req.body);
});


// DELETE / tampilkan pesan "ID harus ada"
router.delete("/", (req, res, next) => {
  res.status(400).send("ID harus ada");
});

// DELETE /:id tampilkan pesan "Data dengan id :id telah dihapus"
router.delete("/:id", (req, res, next) => {
  res.send(`Data dengan id ${req.params.id} telah dihapus`);
})

// DELETE /:name/:email tampilkan pesan "Data name dan email"
router.delete("/:name/:email", (req, res, next) => {
  res.send(`Data ${req.params.name} dan ${req.params.email} telah dihapus`);
})

module.exports = router;