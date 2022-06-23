var mysql = require("mysql");
var dbConfig = require("../config/db-config.json");

var connection = mysql.createConnection({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

function getReview(reviewId, callback) {
  connection.query("SELECT * FROM review WHERE review_id = ?", [
    reviewId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    } else {
      callback(rows);
    }
  });
}

function getUserReview(userId, placeId, callback) {
  connection.query("SELECT * FROM review WHERE user_id = ? AND place_id = ?", [
    userId, placeId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    } else {
      callback(rows);
    }
  });
}

function getUser(userId, callback) {
  connection.query("SELECT * FROM user WHERE user_id = ?", [
    userId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    } else {
      callback(rows);
    }
  });
}

function getPhoto(reviewId, placeId, userId, callback) {
  connection.query("SELECT * FROM photo WHERE review_id = ? AND place_id = ? AND user_id = ?", [
    reviewId, placeId, userId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    } else {
      callback(rows);
    }
  });
}

function getUserPhoto(userId, placeId, callback) {
  connection.query("SELECT * FROM photo WHERE user_id = ? AND place_id = ?", [
    userId, placeId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    } else {
      callback(rows);
    }
  });
}

function getPlace(placeId, callback) {
  connection.query("SELECT * FROM place WHERE place_id = ?", [
    placeId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    } else {
      callback(rows);
    }
  });
}

function getPointLog(userId, callback) {
  connection.query("SELECT * FROM point_log WHERE user_id = ?", [
    userId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    } else {
      callback(rows);
    }
  });
}

function insertReview(reviewId, userId, placeId, content) {
  connection.query("INSERT INTO review (review_id, user_id, place_id, content) VALUES (?, ?, ?, ?)", [
    reviewId, userId, placeId, content
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    }
  });
}

function insertUser(userId) {
  connection.query("INSERT INTO user (user_id, point) VALUES (?, 0)", [
    userId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    }
  });
}

function insertPhoto(attachedPhotoId, reviewId, placeId, userId) {
  connection.query("INSERT INTO photo (photo_id, review_id, place_id, user_id) VALUES (?, ?, ?, ?)", [
    attachedPhotoId, reviewId, placeId, userId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    }
  });
}

function insertPlace(placeId, userId) {
  connection.query("INSERT INTO place (place_id, first_review_user_id) VALUES (?, ?)", [
    placeId, userId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    }
  });
}

function insertPointLog(reviewId, userId, placeId, point, bonusPoint, userPoint) {
  connection.query("INSERT INTO point_log (review_id, user_id, place_id, point, bonus_point, total_point, write_date) VALUES (?, ?, ?, ?, ?, ?, NOW())", [
    reviewId, userId, placeId, point, bonusPoint, userPoint
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    }
  });
}

function updateReviewContent(reviewId, content) {
  connection.query("UPDATE review SET content = ? WHERE review_id = ?", [
    content, reviewId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    }
  });
}

function updateUserPoint(userId, point) {
  connection.query("UPDATE user SET point = ? WHERE user_id = ?", [
    point, userId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    }
  });
}

function updatePlaceFirstReviewUserId(placeId, firstReviewUserId) {
  connection.query("UPDATE place SET first_review_user_id = ? WHERE place_id = ?", [
    firstReviewUserId, placeId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    }
  });
}

function updatePhoto(attachedPhotoIds, reviewId, placeId, userId, callback) {
  connection.query("DELETE FROM photo WHERE review_id = ? AND place_id = ? AND user_id = ?", [
    reviewId, placeId, userId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    } else {
      if (attachedPhotoIds != null) {
        attachedPhotoIds.forEach((element) => (insertPhoto(element, reviewId, placeId, userId)));
      };
    }

    callback();
  });
}

function deleteReview(reviewId) {
  connection.query("DELETE FROM review WHERE review_id = ?", [
    reviewId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    }
  });
}

function deletePhoto(attachedPhotoId, reviewid, placeId, userId) {
  connection.query("DELETE FROM photo WHERE photo_id = ? AND review_id = ? AND place_id = ? AND user_id = ?", [
    attachedPhotoId, reviewid, placeId, userId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    }
  });
}

function deleteAllPhotos(reviewid, placeId, userId, callback) {
  connection.query("DELETE FROM photo WHERE review_id = ? AND place_id = ? AND user_id = ?", [
    reviewid, placeId, userId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    } else {
      callback(rows)
    }
  });
}

function countAttachedPhoto(attachedPhotoIds, reviewId, placeId, userId, callback) {
  connection.query("SELECT count(*) AS photo_count FROM photo WHERE photo_id IN (?) AND review_id = ? AND place_id = ? AND user_id = ?", [
    attachedPhotoIds.toString(), reviewId, placeId, userId
  ], (err, rows, fields) => {
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    } else {
      callback(rows)
    }
  });
}

module.exports = {
  getReview,
  getUserReview,
  getUser,
  getPhoto,
  getUserPhoto,
  getPlace,
  getPointLog,
  insertReview,
  insertUser,
  insertPhoto,
  insertPlace,
  insertPointLog,
  updateReviewContent,
  updateUserPoint,
  updatePlaceFirstReviewUserId,
  updatePhoto,
  deleteReview,
  deletePhoto,
  deleteAllPhotos,
  countAttachedPhoto
}
