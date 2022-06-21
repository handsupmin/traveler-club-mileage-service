var express = require("express");
var router = express.Router();
var dbConnection = require("../db/connect");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Pointravel" });
});

module.exports = router;
