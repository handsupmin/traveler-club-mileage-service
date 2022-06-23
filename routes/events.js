var express = require("express");
var router = express.Router();
var dbConnection = require("../db/connect");

function isNullOrEmpty(string) {
  return (string == null || string == "");
}

function validate(array) {
  array.forEach(element => {
    if (isNullOrEmpty(element)) {
      throw new Error("필수값이 누락되었습니다.");
    }
  });
}

function checkUserReview(userId, placeId, callback) {
  var [isReview, isPhoto] = [true, true];

  dbConnection.getUserReview(userId, placeId, (rows) => {
    if (rows.length == 0) {
      isReview = false;

      dbConnection.getUserPhoto(userId, placeId, (rows) => {
        if (rows.length == 0) {
          isPhoto = false;
        }

        callback(isReview, isPhoto);
      });
    } else {
      callback(isReview, isPhoto);
    }
  });
}

router.post("/", function (req, res, next) {
  var body = req.body;
  var type = body.type;
  var action = body.action;
  var reviewId = body.reviewId;
  var userId = body.userId;
  var placeId = body.placeId;
  var content = body.content;
  var attachedPhotoIds = body.attachedPhotoIds;

  var requiredValues = [type, action, reviewId, userId, placeId];
  var isFirstReview = false;
  var userPoint = 0;
  var point = 0;
  var bonusPoint = 0;

  try {
    validate(requiredValues);

    if (type != "REVIEW") {
      throw new Error("잘못된 type입니다.");
    }

    if (action == "ADD") {
      if (isNullOrEmpty(content)) {
        new Error("내용을 입력해주세요.");
      }

      checkUserReview(userId, placeId, (isReview, isPhoto) => {
        if (isReview || isPhoto) {
          next(new Error("같은 장소에 리뷰를 여러 번 작성할 수 없습니다."));
        } else {
          dbConnection.insertReview(reviewId, userId, placeId, content);

          if (attachedPhotoIds != null) {
            attachedPhotoIds.forEach((element) => (dbConnection.insertPhoto(element, placeId, userId)))
          }

          dbConnection.getUser(userId, (rows) => {
            if (rows.length == 0) {
              dbConnection.insertUser(userId);
            } else {
              userPoint = rows[0].point;
            }

            dbConnection.getPlace(placeId, (rows) => {
              if (rows.length == 0) {
                dbConnection.insertPlace(placeId, userId);
                isFirstReview = true;
              } else if (rows.length == 1 && isNullOrEmpty(rows[0].first_review_user_id)) {
                dbConnection.updatePlaceFirstReviewUserId(userId);
                isFirstReview = true;
              }

              point = 1;

              if (isFirstReview) {
                bonusPoint += 1;
              }

              if (attachedPhotoIds != null && attachedPhotoIds.length > 0) {
                point += 1;
              }

              userPoint += point + bonusPoint;

              dbConnection.updateUserPoint(userId, userPoint);
              dbConnection.insertPointLog(reviewId, userId, placeId, point, bonusPoint, userPoint);

              res.render("result", { detail: "리뷰 작성 완료" });
            });
          });
        }
      });
    } else if (action == "MOD") {
      if (isNullOrEmpty(content)) {
        next(new Error("내용을 입력해주세요."));
      }

      dbConnection.getUser(userId, (rows) => {
        if (rows.length == 0) {
          next(new Error("해당 사용자가 없습니다."));
        }
      });

      dbConnection.getPlace(placeId, (rows) => {
        if (rows.length == 0) {
          next(new Error("해당 장소가 없습니다."));
        }
      });

      dbConnection.getReview(reviewId, (rows) => {
        if (rows.length == 0) {
          next(new Error("작성된 리뷰가 없습니다."));
        } else {
          dbConnection.updateReviewContent(reviewId, content);
          res.render("result", { detail: "리뷰 수정 완료" });
        }
      });
    } else if (action == "DEL") {
      dbConnection.getUser(userId, (rows) => {
        if (rows.length == 0) {
          next(new Error("해당 사용자가 없습니다."));
        } else {
          userPoint = rows[0].point;
        }
      });

      dbConnection.getPlace(placeId, (rows) => {
        if (rows.length == 0) {
          next(new Error("해당 장소가 없습니다."));
        }
      });

      if (attachedPhotoIds != null) {
        dbConnection.getReview(reviewId, (rows) => {
          if (rows.length == 0) {
            next(new Error("작성된 리뷰가 없습니다."));
          } else {
            dbConnection.deleteReview(reviewId);
            dbConnection.getPlace(placeId, (rows) => {
              if (rows[0].first_review_user_id == userId) {
                dbConnection.updatePlaceFirstReviewUserId(null);
                bonusPoint = -1;
              }

              point = -1;
              userPoint += point + bonusPoint;
              dbConnection.updateUserPoint(userId, userPoint);
              dbConnection.insertPointLog(reviewId, userId, placeId, point, bonusPoint, userPoint);

              res.render("result", { detail: "리뷰 삭제 완료" });
            })
          }
        });
      } else {
        dbConnection.getReview(reviewId, (rows) => {
          if (rows.length == 0) {
            next(new Error("작성된 리뷰가 없습니다."));
          } else {
            attachedPhotoIds.forEach((element) => {
              dbConnection.deletePhoto(element, placeId, userId);
            });

            dbConnection.countAttachedPhoto(attachedPhotoIds, placeId, userId, (rows) => {
              if (rows[0].photo_count == 0) {
                point -= 1;
              }

              dbConnection.deleteReview(reviewId);
              dbConnection.getPlace(placeId, (rows) => {
                if (rows[0].first_review_user_id == userId) {
                  dbConnection.updatePlaceFirstReviewUserId(null);
                  bonusPoint = -1;
                }

                point -= 1;
                userPoint += point + bonusPoint;
                dbConnection.updateUserPoint(userId, userPoint);
                dbConnection.insertPointLog(reviewId, userId, placeId, point, bonusPoint, userPoint);

                res.render("result", { detail: "리뷰 삭제 완료" });
              });
            });
          }
        });
      }
    } else {
      new Error("사용하지 않는 action입니다.");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;