-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: Pixagram
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comments` (
  `commentId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `email` varchar(150) NOT NULL,
  `content` varchar(4000) NOT NULL,
  `commentsTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`commentId`),
  KEY `post_id` (`post_id`),
  KEY `email` (`email`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`email`) REFERENCES `User` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Follows`
--

DROP TABLE IF EXISTS `Follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Follows` (
  `email1` varchar(150) NOT NULL,
  `email2` varchar(150) NOT NULL,
  `followsTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`email1`,`email2`),
  KEY `email2` (`email2`),
  CONSTRAINT `Follows_ibfk_1` FOREIGN KEY (`email1`) REFERENCES `User` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Follows_ibfk_2` FOREIGN KEY (`email2`) REFERENCES `User` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Follows`
--

LOCK TABLES `Follows` WRITE;
/*!40000 ALTER TABLE `Follows` DISABLE KEYS */;
INSERT INTO `Follows` VALUES ('nikhil@gmail.com','tejas0809@gmail.com','2019-11-28 21:01:56'),('saurabh@gmail.com','nikhil@gmail.com','2019-11-29 00:24:28'),('saurabh@gmail.com','tejas0809@gmail.com','2019-11-28 20:55:32');
/*!40000 ALTER TABLE `Follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Likes`
--

DROP TABLE IF EXISTS `Likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Likes` (
  `email` varchar(150) NOT NULL,
  `postId` int(10) unsigned NOT NULL,
  `likesTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`email`,`postId`),
  KEY `postId` (`postId`),
  CONSTRAINT `Likes_ibfk_1` FOREIGN KEY (`email`) REFERENCES `User` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Likes_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `Post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Likes`
--

LOCK TABLES `Likes` WRITE;
/*!40000 ALTER TABLE `Likes` DISABLE KEYS */;
INSERT INTO `Likes` VALUES ('nikhil@gmail.com',1,'2019-11-28 22:30:15'),('saurabh@gmail.com',2,'2019-11-28 22:30:46'),('tejas0809@gmail.com',1,'2019-11-28 22:29:09');
/*!40000 ALTER TABLE `Likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `postTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `imagePath` varchar(1000) NOT NULL,
  `caption` varchar(500) DEFAULT NULL,
  `userEmail` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userEmail` (`userEmail`),
  CONSTRAINT `Post_ibfk_1` FOREIGN KEY (`userEmail`) REFERENCES `User` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES (1,'2019-11-28 21:33:42','C:/dummy/image.png','What a day !','tejas0809@gmail.com'),(2,'2019-11-28 21:37:49','D:/dummy/image1.png','What even?','nikhil@gmail.com'),(3,'2019-11-28 21:38:05','C:/dummy/test.png','Life','nikhil@gmail.com');
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tags`
--

DROP TABLE IF EXISTS `Tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tags` (
  `post_id` int(10) unsigned NOT NULL,
  `email` varchar(150) NOT NULL,
  PRIMARY KEY (`post_id`,`email`),
  KEY `email` (`email`),
  CONSTRAINT `Tags_ibfk_1` FOREIGN KEY (`email`) REFERENCES `User` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Tags_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tags`
--

LOCK TABLES `Tags` WRITE;
/*!40000 ALTER TABLE `Tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `email` varchar(150) NOT NULL,
  `pswd` varchar(200) NOT NULL,
  `fname` varchar(150) NOT NULL,
  `lname` varchar(150) NOT NULL,
  `bio` varchar(300) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `profileimagePath` varchar(1000) DEFAULT NULL,
  `coverimagePath` varchar(1000) DEFAULT NULL,
  `visibility` varchar(20) NOT NULL DEFAULT 'public',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('nikhil@gmail.com','$2b$10$HyFxtjJGcT0tW20BFKNDKuKR0G4oHSsaeOtsCMOEGKHErmfKJ9wv.','Nikhil','Motwani','CIS student at Penn','1997-12-11','male','India','Pune',NULL,NULL,'public'),('saurabh@gmail.com','$2b$10$7HM1q0EbZ3KjyxZDR51ff.bDG7A47BUUy7kG7haKIYrh2jPOIxW9m','Saurabh','Kumthekar','MEAM student at Penn','1995-11-11','male','India','Pune',NULL,NULL,'public'),('tejas0809@gmail.com','$2b$10$YaC4pwL4reBRc0.Pk1g5mO5eq5qpKSDEMm/xrJzZmNWioXxXeMByu','Tejas','Srivastava','Hey there!','1997-09-08','male','India','Pune',NULL,NULL,'public');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-28 19:43:14
