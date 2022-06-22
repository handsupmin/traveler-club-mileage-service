var express = require("express");
var router = express.Router();
var dbConnection = require("../db/connect");

function isNullOrEmpty(string) {
  return (string == null || string == "");
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Pointravel" });
});

router.get("/point", function (req, res, next) {
  var userId = req.query.userId;

  dbConnection.getPointLog(userId, (rows)=>{
    if(rows.length == 0){
      try {
        throw new Error("존재하지 않는 사용자입니다.");
      } catch (err) {
        if (err) {
          next(err);
        }
      }
    }else{
      res.render("point", { rows: rows });
    }
  });
});

router.post("/point", function (req, res, next) {
  var body = req.body;
  var userId = body.userId;

  dbConnection.getPointLog(userId, (rows)=>{
    if(rows.length == 0){
      try {
        throw new Error("존재하지 않는 사용자입니다.");
      } catch (err) {
        if (err) {
          next(err);
        }
      }
    }else{
      res.render("point-log", { rows: rows });
    }
  });
});

module.exports = router;
