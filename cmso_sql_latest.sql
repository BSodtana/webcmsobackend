-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.6.5-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.2.0.6586
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table imc-compet.act_account
CREATE TABLE IF NOT EXISTS `act_account` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `role_subtype` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table imc-compet.act_atk
CREATE TABLE IF NOT EXISTS `act_atk` (
  `stu_id` varchar(9) DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table imc-compet.act_checkin
CREATE TABLE IF NOT EXISTS `act_checkin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` varchar(9) DEFAULT NULL,
  `createdDateTime` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table imc-compet.act_clubs_lists
CREATE TABLE IF NOT EXISTS `act_clubs_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `club_id` varchar(50) DEFAULT NULL,
  `club_name` varchar(50) DEFAULT NULL,
  `max_seat` varchar(50) DEFAULT NULL,
  `place` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `remark` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table imc-compet.act_covid_screen_data
CREATE TABLE IF NOT EXISTS `act_covid_screen_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` varchar(9) NOT NULL DEFAULT '0',
  `fever` int(1) NOT NULL DEFAULT 0,
  `throat` int(1) NOT NULL DEFAULT 0,
  `cough` int(1) NOT NULL DEFAULT 0,
  `runnyNose` int(1) NOT NULL DEFAULT 0,
  `diarrhea` int(1) NOT NULL DEFAULT 0,
  `lostSmell` int(1) NOT NULL DEFAULT 0,
  `dyspnea` int(1) NOT NULL DEFAULT 0,
  `closeContact` int(1) NOT NULL DEFAULT 0,
  `awaitPcr` int(1) NOT NULL DEFAULT 0,
  `travel` int(1) NOT NULL DEFAULT 0,
  `isPositive` int(1) NOT NULL DEFAULT 0,
  `updatedDateTime` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  `atkApproved` int(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table imc-compet.act_covid_vaccine
CREATE TABLE IF NOT EXISTS `act_covid_vaccine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` varchar(9) DEFAULT NULL,
  `vaccine_no` int(11) DEFAULT 0,
  `vaccine_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table imc-compet.act_slots
CREATE TABLE IF NOT EXISTS `act_slots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slot_name` varchar(50) DEFAULT NULL,
  `slot_begin` varchar(50) DEFAULT NULL,
  `slot_finish` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table imc-compet.act_slot_selection
CREATE TABLE IF NOT EXISTS `act_slot_selection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` varchar(50) DEFAULT NULL,
  `slot_no` int(2) DEFAULT NULL,
  `club_id` varchar(50) DEFAULT NULL,
  `updatedDateTime` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  `isChecked` int(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table imc-compet.act_stu_data
CREATE TABLE IF NOT EXISTS `act_stu_data` (
  `stu_id` varchar(9) DEFAULT NULL,
  `title` varchar(10) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `med_condition` varchar(100) DEFAULT NULL,
  `allergy` varchar(100) DEFAULT NULL,
  `vehicle` int(1) DEFAULT NULL,
  `createdDateTime` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  `first_name_en` varchar(100) DEFAULT NULL,
  `last_name_en` varchar(100) DEFAULT NULL,
  `nick_name` varchar(100) DEFAULT NULL,
  `weight` varchar(3) DEFAULT NULL,
  `height` varchar(3) DEFAULT NULL,
  `size` varchar(3) DEFAULT NULL,
  `emer_name` varchar(100) DEFAULT NULL,
  `emer_relation` varchar(100) DEFAULT NULL,
  `emer_phone` varchar(10) DEFAULT NULL,
  `updated` int(1) DEFAULT 0,
  `isCheer` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
