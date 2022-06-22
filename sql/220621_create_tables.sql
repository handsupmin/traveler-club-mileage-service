CREATE SCHEMA `pointravel` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `pointravel`.`user` (
  `user_id` varchar(36) NOT NULL,
  `point` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`));

CREATE TABLE `pointravel`.`review` (
  `review_id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `place_id` VARCHAR(36) NOT NULL,
  `content` VARCHAR(200) NULL,
  PRIMARY KEY (`review_id`));

CREATE TABLE `pointravel`.`place` (
  `place_id` VARCHAR(36) NOT NULL,
  `first_review_user_id` VARCHAR(36) NULL,
  PRIMARY KEY (`place_id`));

CREATE TABLE `pointravel`.`photo` (
  `photo_index` INT NOT NULL AUTO_INCREMENT,
  `photo_id` varchar(36) NOT NULL,
  `place_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`photo_index`));
  
CREATE TABLE `pointravel`.`point_log` (
  `log_id` INT NOT NULL AUTO_INCREMENT,
  `review_id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `place_id` VARCHAR(36) NOT NULL,
  `point` INT NULL,
  `bonus_point` INT NULL,
  `total_point` INT NOT NULL,
  `write_date` datetime DEFAULT NULL,
  PRIMARY KEY (`log_id`));
