const users = [
    {
      id: 1,
      name: "John Doe",
      email: "John@Doe.com",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "Jane@Doe.com",
    },
  ];
  
  const express = require("express");
  const router = express.Router();
  
  // set header agar response yang dikirim dalam bentuk json
  router.use("/user", (req, res, next) => {
    res.header("content-type", "application/json");
    next();
  });
  
  // kirimkan object users
  router.get("/user", (req, res, next) => {
    res.send({ users });
  });

  module.exports = router;