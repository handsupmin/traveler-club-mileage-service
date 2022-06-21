var express = require("express");
var router = express.Router();
var dbConnection = require("../db/connect");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/user", function (req, res, next) {
  dbConnection.getAllUsers((rows) => {
    res.render("user", { rows: rows });
  });
});

module.exports = router;
