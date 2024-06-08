# ************************************************************
# Sequel Ace SQL dump
# Version 20067
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 8.0.37)
# Database: bloodify
# Generation Time: 2024-06-07 10:20:29 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table ambulances
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ambulances`;

CREATE TABLE `ambulances` (
  `ambulanceId` int NOT NULL AUTO_INCREMENT,
  `ambulanceProvider` varchar(255) NOT NULL,
  `ambulanceLocation` varchar(255) NOT NULL,
  `ambulanceContact` varchar(255) NOT NULL,
  `ambulanceDistrict` varchar(45) NOT NULL,
  PRIMARY KEY (`ambulanceId`),
  UNIQUE KEY `ambulanceId_UNIQUE` (`ambulanceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `ambulances` WRITE;
/*!40000 ALTER TABLE `ambulances` DISABLE KEYS */;

INSERT INTO `ambulances` (`ambulanceId`, `ambulanceProvider`, `ambulanceLocation`, `ambulanceContact`, `ambulanceDistrict`)
VALUES
	(2,'Grande International Hospital','Dhapasi, Kathmandu','01-4380858','Kathmandu'),
	(3,'Norvic International Hospital','Thapathali, Kathmandu','01-4258554','Kathmandu'),
	(4,'Patan Hospital','Lagankhel, Lalitpur','01-5522278','Lalitpur'),
	(5,'Manipal Teaching Hospital','Pokhara, Kaski','061-441230','Kaski'),
	(6,'Gandaki Medical College Teaching Hospital','Lamachaur, Pokhara','061-440600','Kaski'),
	(7,'Bharatpur Hospital','Bharatpur, Chitwan','056-524203','Chitwan'),
	(8,'College of Medical Sciences Teaching Hospital','Bharatpur, Chitwan','056-524203','Chitwan'),
	(9,'Birat Medical College & Teaching Hospital','Biratnagar, Morang','021-438728','Morang'),
	(10,'Dharan Sub-Metropolitan City Hospital','Dharan, Sunsari','025-525555','Sunsari'),
	(11,'Bheri Zonal Hospital','Nepalgunj, Banke','081-520425','Banke'),
	(12,'Sarlahi District Hospital','Malangwa, Sarlahi','046-520420','Sarlahi'),
	(13,'Narayani Sub-Regional Hospital','Birgunj, Parsa','051-532160','Parsa'),
	(14,'Janakpur Provincial Hospital','Janakpur, Dhanusha','041-521777','Dhanusha'),
	(16,'Gaur Hospital','Gaur, Rautahat','055-520200','Rautahat'),
	(17,'District Hospital Sindhupalchowk','Chautara, Sindhupalchowk','011-620033','Sindhupalchowk'),
	(18,'Dhulikhel Hospital','Dhulikhel, Kavrepalanchok','011-490497','Kavrepalanchok'),
	(19,'Charikot Hospital','Charikot, Dolakha','049-420086','Dolakha'),
	(20,'Gulmi Hospital','Tamghas, Gulmi','079-560034','Gulmi'),
	(21,'Jiri Hospital','Jiri, Dolakha','049-420075','Dolakha'),
	(22,'Ilam District Hospital','Ilam, Ilam','027-520268','Ilam'),
	(23,'Tansen Hospital','Tansen, Palpa','075-521103','Palpa'),
	(24,'Dang District Hospital','Ghorahi, Dang','082-560129','Dang'),
	(25,'Rukum District Hospital','Rukum, Rukum','088-521067','Rukum'),
	(26,'Solukhumbu District Hospital','Salleri, Solukhumbu','038-520174','Solukhumbu'),
	(27,'Bajura District Hospital','Martadi, Bajura','097-420021','Bajura'),
	(28,'Achham District Hospital','Mangalsen, Achham','097-620060','Achham'),
	(29,'Koshi Hospital','Itahari, Sunsari','025-580199','Sunsari'),
	(30,'Grande International Hospital','Birtamode, Jhapa','023-541900','Jhapa'),
	(31,'Koshi Hospital','Bhadrapur, Jhapa','023-460058','Jhapa'),
	(32,'Koshi Hospital','Damak, Jhapa','023-580078','Jhapa'),
	(33,'Dhulabari Hospital','Dhulabari, Jhapa','023-540021','Jhapa'),
	(34,'Mechi Hospital','Kakarbhitta, Jhapa','023-562029','Jhapa'),
	(35,'Gajurmukhi Hospital','Mechinagar, Jhapa','023-562040','Jhapa'),
	(36,'B & B Hospital','Birtamode, Jhapa','023-541400','Jhapa'),
	(37,'Agriculture Hospital','Gauradaha, Jhapa','023-561256','Jhapa'),
	(38,'B & B Hospital','Damak, Jhapa','023-587545','Jhapa'),
	(39,'Nepal Cancer Hospital','Sukhani, Bharatpur','056-531777','Chitwan'),
	(40,'Neuro Hospital','Dhumbarahi, Kathmandu','01-4007220','Kathmandu'),
	(41,'Dhulikhel Hospital','Banepa, Kavrepalanchok','011-663803','Kavrepalanchok'),
	(42,'Rapti Sub-Regional Hospital','Tulsipur, Dang','082-520502','Dang'),
	(43,'Gauri Shankar Hospital','Dhading Besi, Dhading','010-520319','Dhading'),
	(44,'Koshi Hospital','Dharan, Sunsari','025-520008','Sunsari'),
	(45,'Janamaitri Hospital','Battar, Nuwakot','010-560256','Nuwakot'),
	(51,'B&C','Birtamode','9817090300','Jhapa'),
	(52,'Green City','Illam','9816989077','Ilam');

/*!40000 ALTER TABLE `ambulances` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bloodRequests
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bloodRequests`;

CREATE TABLE `bloodRequests` (
  `reqID` int NOT NULL AUTO_INCREMENT,
  `patientName` varchar(45) NOT NULL,
  `bloodGroup` varchar(45) NOT NULL,
  `District` varchar(45) NOT NULL,
  `Hospital` varchar(255) NOT NULL,
  `contactNumber` varchar(45) NOT NULL,
  `reqestedUser` int NOT NULL,
  `details` text NOT NULL,
  `requestedDate` datetime DEFAULT NULL,
  UNIQUE KEY `reqID_UNIQUE` (`reqID`),
  KEY `userID_idx` (`reqestedUser`),
  CONSTRAINT `userID` FOREIGN KEY (`reqestedUser`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `bloodRequests` WRITE;
/*!40000 ALTER TABLE `bloodRequests` DISABLE KEYS */;

INSERT INTO `bloodRequests` (`reqID`, `patientName`, `bloodGroup`, `District`, `Hospital`, `contactNumber`, `reqestedUser`, `details`, `requestedDate`)
VALUES
	(6,'Ram Birami','A+','Jhapa','B&C','9844637702',19,'Bro khun chaiyo','2024-05-12 14:30:00'),
	(7,'ram kumar pandit','A+','Jhapa','BP hospital','9844637702',20,'I am helpless help me','2024-05-16 00:00:00'),
	(8,'Harry Kumar','A+','Jhapa','BP hospital','9844637702',20,'Blood is best','2024-05-16 00:00:00'),
	(9,'Kumar sanu','AB+','Baglung','CP Hospital','9806074435',20,'I need blood asap','2024-05-13 00:00:00'),
	(10,'Arjit Singh','O-','Jhapa','City Hospital','9844544776',20,'Need blood asap','2024-05-31 00:00:00'),
	(11,'Krishna Ji','B-','Jhapa','Kankai','9816098400',20,'I need blood for me I am suffering from success','2024-05-15 00:00:00'),
	(12,'Shahil Buda','B+','Jhapa','B&C','9816989300',19,'Ek dam birami chu blood pls','2024-06-03 00:00:00'),
	(13,'Barsha','AB+','Bara','Nice Hospital','9418909790',20,'Need blood','2024-06-02 00:00:00');

/*!40000 ALTER TABLE `bloodRequests` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bloodbank
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bloodbank`;

CREATE TABLE `bloodbank` (
  `bankID` int NOT NULL AUTO_INCREMENT,
  `bankName` varchar(255) NOT NULL,
  `bankLoaction` varchar(255) NOT NULL,
  `bankContact` varchar(45) NOT NULL,
  `bankDistrict` varchar(45) NOT NULL,
  PRIMARY KEY (`bankID`),
  UNIQUE KEY `bankID_UNIQUE` (`bankID`),
  UNIQUE KEY `bankName_UNIQUE` (`bankName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `bloodbank` WRITE;
/*!40000 ALTER TABLE `bloodbank` DISABLE KEYS */;

INSERT INTO `bloodbank` (`bankID`, `bankName`, `bankLoaction`, `bankContact`, `bankDistrict`)
VALUES
	(1,'Red Cross Blood Bank','Kathmandu','01-4225346','Kathmandu'),
	(2,'Nepal Red Cross Society','Patan, Lalitpur','01-5528133','Lalitpur'),
	(3,'Biratnagar Blood Bank','Biratnagar, Morang','021-527561','Morang'),
	(4,'Janakpur Blood Bank','Janakpur, Dhanusha','041-520130','Dhanusha'),
	(5,'Narayani Blood Bank','Bharatpur, Chitwan','056-524245','Chitwan'),
	(6,'Pokhara Blood Bank','Pokhara, Kaski','061-530384','Kaski'),
	(7,'Western Regional Blood Transfusion Center','Butwal, Rupandehi','071-542558','Rupandehi'),
	(8,'Bheri Hospital Blood Bank','Nepalgunj, Banke','081-520507','Banke'),
	(9,'Gandaki Blood Bank','Lamachaur, Pokhara','061-440003','Kaski'),
	(10,'Far Western Regional Blood Transfusion Service','Dhangadhi, Kailali','091-523202','Kailali'),
	(11,'Bhaktapur Blood Bank','Bhaktapur, Bhaktapur','01-6612888','Bhaktapur'),
	(12,'Rapti Sub-Regional Blood Transfusion Center','Tulsipur, Dang','082-520434','Dang'),
	(13,'Rapti Hospital Blood Bank','Ghorahi, Dang','082-561010','Dang'),
	(14,'Dhulikhel Hospital Blood Bank','Dhulikhel, Kavrepalanchok','011-490336','Kavrepalanchok'),
	(15,'Ilam District Hospital Blood Bank','Ilam, Ilam','027-522411','Ilam'),
	(16,'Baitadi Hospital Blood Bank','Baitadi, Baitadi','095-690024','Baitadi'),
	(17,'Bardiya Blood Bank','Gulariya, Bardiya','084-420049','Bardiya'),
	(18,'Baglung District Hospital Blood Bank','Baglung, Baglung','068-522206','Baglung'),
	(19,'Dhading District Hospital Blood Bank','Dhading Besi, Dhading','010-520098','Dhading'),
	(20,'Darchula District Hospital Blood Bank','Darchula, Darchula','093-420030','Darchula'),
	(21,'Doti Hospital Blood Bank','Dipayal, Doti','094-520082','Doti'),
	(22,'Dolpa District Hospital Blood Bank','Dolpa, Dolpa','087-520088','Dolpa'),
	(23,'Dailekh District Hospital Blood Bank','Dailekh, Dailekh','089-420046','Dailekh'),
	(24,'Eastern Regional Blood Transfusion Center','Dhankuta, Dhankuta','026-520277','Dhankuta'),
	(25,'Gorkha District Hospital Blood Bank','Gorkha, Gorkha','064-420042','Gorkha'),
	(26,'Humla District Hospital Blood Bank','Simikot, Humla','087-690122','Humla'),
	(27,'Jajarkot District Hospital Blood Bank','Jajarkot, Jajarkot','089-420025','Jajarkot'),
	(28,'Jumla District Hospital Blood Bank','Jumla, Jumla','087-520050','Jumla'),
	(29,'Kapilvastu District Hospital Blood Bank','Taulihawa, Kapilvastu','076-420043','Kapilvastu'),
	(30,'Jhapa District Hospital Blood Bank','Biratmode, Jhapa','011-490336','Jhapa'),
	(31,'Khotang District Hospital Blood Bank','Diktel, Khotang','036-520061','Khotang'),
	(32,'Lamjung District Hospital Blood Bank','Beshisahar, Lamjung','066-520060','Lamjung'),
	(33,'Manang District Hospital Blood Bank','Chame, Manang','066-440039','Manang'),
	(34,'Morang District Hospital Blood Bank','Biratnagar, Morang','021-527561','Morang'),
	(35,'Mugu District Hospital Blood Bank','Gamel, Mugu','087-690117','Mugu'),
	(36,'Mustang District Hospital Blood Bank','Jomsom, Mustang','069-440024','Mustang'),
	(37,'Myagdi District Hospital Blood Bank','Beni, Myagdi','069-520052','Myagdi'),
	(38,'Nawalparasi District Hospital Blood Bank','Parasi, Nawalparasi','078-520073','Nawalparasi'),
	(39,'Nuaparadhi District Hospital Blood Bank','Biratnagar, Morang','021-527561','Morang'),
	(40,'Okhaldhunga District Hospital Blood Bank','Okhaldhunga, Okhaldhunga','037-620054','Okhaldhunga'),
	(41,'Panchthar District Hospital Blood Bank','Phidim, Panchthar','024-520077','Panchthar'),
	(42,'Parbat District Hospital Blood Bank','Kushma, Parbat','067-520029','Parbat'),
	(43,'Ramechhap District Hospital Blood Bank','Manthali, Ramechhap','047-620021','Ramechhap'),
	(44,'Rautahat District Hospital Blood Bank','Gaur, Rautahat','055-520074','Rautahat'),
	(45,'Rolpa District Hospital Blood Bank','Liwang, Rolpa','086-520051','Rolpa'),
	(46,'Rukum District Hospital Blood Bank','Jhumlikhalanga, Rukum','088-520070','Rukum'),
	(47,'Salyan District Hospital Blood Bank','Salyan, Salyan','088-520086','Salyan'),
	(76,'Illam Bank','0 Point','9816909300','Illam'),
	(77,'Jhapa Bank','Jhapali bank btm 3','9878787900','Jhapa'),
	(78,'Kathmandu Bank LTD','Kathmandu 5','9877630092','kathmandu');

/*!40000 ALTER TABLE `bloodbank` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table campaignDoners
# ------------------------------------------------------------

DROP TABLE IF EXISTS `campaignDoners`;

CREATE TABLE `campaignDoners` (
  `donerID` int NOT NULL AUTO_INCREMENT,
  `donerFullName` varchar(100) DEFAULT NULL,
  `donerLocation` varchar(500) DEFAULT NULL,
  `donerContact` varchar(15) DEFAULT NULL,
  `donerCampaignID` int DEFAULT NULL,
  PRIMARY KEY (`donerID`),
  KEY `donerCampaignID` (`donerCampaignID`),
  CONSTRAINT `campaigndoners_ibfk_1` FOREIGN KEY (`donerCampaignID`) REFERENCES `campaigns` (`campaignID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `campaignDoners` WRITE;
/*!40000 ALTER TABLE `campaignDoners` DISABLE KEYS */;

INSERT INTO `campaignDoners` (`donerID`, `donerFullName`, `donerLocation`, `donerContact`, `donerCampaignID`)
VALUES
	(26,'rishav doner','jhapa','9855637702',40),
	(27,'ram doner','illam','9800909435',40);

/*!40000 ALTER TABLE `campaignDoners` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table campaigns
# ------------------------------------------------------------

DROP TABLE IF EXISTS `campaigns`;

CREATE TABLE `campaigns` (
  `campaignID` int NOT NULL AUTO_INCREMENT,
  `campaignName` varchar(255) NOT NULL,
  `campaignStartDate` date NOT NULL,
  `campaignEndDate` date NOT NULL,
  `campaignOrganizer` varchar(45) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `isFinished` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`campaignID`),
  UNIQUE KEY `campaignID_UNIQUE` (`campaignID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `campaigns` WRITE;
/*!40000 ALTER TABLE `campaigns` DISABLE KEYS */;

INSERT INTO `campaigns` (`campaignID`, `campaignName`, `campaignStartDate`, `campaignEndDate`, `campaignOrganizer`, `description`, `isFinished`)
VALUES
	(1,'Health Awareness Campaign','2024-06-01','2024-06-30','Health Org','A campaign to promote health awareness in the community.',0),
	(2,'Education for All Campaign','2024-07-01','2024-07-31','Education Org','Supporting education for underprivileged children.',0),
	(3,'Environmental Conservation Campaign','2024-08-01','2024-08-31','Green Earth','Promoting environmental conservation efforts.',0),
	(4,'Blood Donation Drive','2024-09-01','2024-09-15','Red Cross','Encouraging people to donate blood.',0),
	(5,'Clean Water Initiative','2024-10-01','2024-10-31','Water for All','Ensuring access to clean water for everyone.',0),
	(12,'Save the Earth','2024-06-10','2024-12-10','Earth Foundation','A campaign to raise awareness about climate change and promote sustainable living.',0),
	(40,'ECFNEPAL BLOOD KARYAKRAM','2024-06-07','2024-06-28','ECF NEPAL','ECFNEPAL BLOOD KARYAKRAM',1),
	(51,'Rishi Blood campaign','2024-06-07','2024-06-29','Rishi','This will be nice',0);

/*!40000 ALTER TABLE `campaigns` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `district` varchar(255) NOT NULL,
  `fullAddress` varchar(255) NOT NULL,
  `bloodType` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `joinedOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`),
  UNIQUE KEY `userName_UNIQUE` (`userName`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`userID`, `userName`, `fullName`, `phone`, `district`, `fullAddress`, `bloodType`, `password`, `role`, `joinedOn`)
VALUES
	(19,'rishav','rishav ghising','9844637702','jhapa','birtamode-4','A+','$2b$10$HUAC3aAtGd1QZ80LaZSAReqbpvyqRVCUVVlOUYLJFzTvmZ2B7Omwu','admin','2024-04-21 21:32:30'),
	(20,'manish','manish pandey','9816909300','Jhapa','birtamode-6','B+','$2b$10$W.s17hV85Wi11EeQxjMNpew6jsi8wV/ez.on5A1clt7tZgHz5qUpa','user','2024-06-01 21:32:30'),
	(21,'Hari','Hari lala','9866737701','Jhapa','birtamode-6','A+','$2b$10$LXUBjhPjPhNlw./RKFRhVul7GscudYuUV4kO99mxC1MgWbZE5OfDC','user','2024-06-01 21:32:30'),
	(24,'ram2024','ram neupane','9844637701','Jhapa','birtamode-9','A+','$2b$10$8AOYh1vkZY9Ds095iojLEO526hpuhWyG1Oq0L609Tp04b8sS7hAF.','user','2024-06-01 21:32:30'),
	(26,'shahil69','Shahil Buda','9816909301','Jhapa','Birtamode 5','AB-','$2b$10$WV0FAgLQZJrSbqKV1OU7ouTZMToqFZ5ZcZq5EoYhFGbeEhyA6xy6e','user','2024-06-02 06:50:44');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
