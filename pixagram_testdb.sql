-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: pixagram
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
-- Current Database: `pixagram`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `pixagram` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `pixagram`;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `commentId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `email` varchar(150) NOT NULL,
  `content` varchar(4000) NOT NULL,
  `commentsTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`commentId`),
  KEY `post_id` (`post_id`),
  KEY `email` (`email`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,5,'tejas@gmail.com','Now this is what a new comment looks like','2019-12-08 02:54:22'),(2,3,'tejas@gmail.com','wow','2019-12-07 21:28:27'),(3,3,'tejas@gmail.com','wow','2019-12-07 21:29:54'),(4,3,'tejas@gmail.com','wow','2019-12-07 21:31:46'),(5,3,'tejas@gmail.com','wow','2019-12-07 21:52:07'),(6,3,'tejas@gmail.com','wow','2019-12-07 21:52:37'),(7,3,'tejas@gmail.com','wow','2019-12-07 21:53:24'),(8,3,'tejas@gmail.com','wow','2019-12-07 22:17:51'),(9,3,'tejas@gmail.com','wow','2019-12-07 23:13:41'),(10,5,'tejas0809@gmail.com','old comment','2019-12-09 23:23:27'),(11,3,'tejas@gmail.com','wow','2019-12-07 23:14:32'),(12,3,'tejas@gmail.com','wow','2019-12-07 23:15:08'),(13,3,'tejas@gmail.com','wow','2019-12-07 23:16:13'),(14,3,'tejas@gmail.com','wow','2019-12-07 23:27:07'),(15,3,'tejas@gmail.com','wow','2019-12-07 23:29:23'),(16,3,'tejas@gmail.com','wow','2019-12-07 23:31:18'),(17,3,'tejas@gmail.com','wow','2019-12-07 23:35:41'),(18,3,'tejas@gmail.com','wow','2019-12-07 23:36:45'),(19,3,'tejas@gmail.com','wow','2019-12-07 23:38:42'),(20,3,'tejas@gmail.com','wow','2019-12-07 23:39:56'),(21,3,'tejas@gmail.com','wow','2019-12-07 23:50:30'),(22,3,'tejas@gmail.com','wow','2019-12-07 23:52:18'),(23,3,'tejas@gmail.com','wow','2019-12-07 23:53:09'),(24,3,'tejas@gmail.com','wow','2019-12-07 23:53:41'),(25,3,'tejas@gmail.com','wow','2019-12-07 23:54:23'),(26,3,'tejas@gmail.com','wow','2019-12-07 23:57:57'),(27,3,'tejas@gmail.com','wow','2019-12-08 00:50:23'),(28,3,'tejas@gmail.com','wow','2019-12-08 00:51:09'),(29,3,'tejas@gmail.com','wow','2019-12-08 00:51:56'),(30,3,'tejas@gmail.com','wow','2019-12-08 00:57:39'),(31,3,'tejas@gmail.com','wow','2019-12-08 01:09:53'),(32,3,'tejas@gmail.com','wow','2019-12-08 01:12:40'),(33,3,'tejas@gmail.com','wow','2019-12-08 01:14:08'),(34,3,'tejas@gmail.com','wow','2019-12-08 01:15:42'),(35,3,'tejas@gmail.com','wow','2019-12-08 01:19:48'),(36,3,'tejas@gmail.com','wow','2019-12-08 01:20:16'),(37,3,'tejas@gmail.com','wow','2019-12-08 01:28:05'),(38,3,'tejas@gmail.com','wow','2019-12-08 01:33:31'),(39,3,'tejas@gmail.com','wow','2019-12-08 01:35:03'),(40,3,'tejas@gmail.com','wow','2019-12-08 01:35:25'),(41,3,'tejas@gmail.com','wow','2019-12-08 01:38:31'),(42,3,'tejas@gmail.com','wow','2019-12-08 01:39:48'),(43,3,'tejas@gmail.com','wow','2019-12-08 01:40:51'),(44,3,'tejas@gmail.com','wow','2019-12-08 01:42:27'),(45,3,'tejas@gmail.com','wow','2019-12-08 01:50:19'),(46,3,'tejas@gmail.com','wow','2019-12-08 01:51:28'),(47,3,'tejas@gmail.com','wow','2019-12-08 01:53:17'),(48,3,'tejas@gmail.com','wow','2019-12-08 01:55:33'),(49,3,'tejas@gmail.com','wow','2019-12-08 01:59:10'),(50,3,'tejas@gmail.com','wow','2019-12-08 02:01:33'),(51,3,'tejas@gmail.com','wow','2019-12-08 02:30:12'),(52,3,'tejas@gmail.com','wow','2019-12-08 02:43:17'),(54,5,'tjs@gmail.com','new comment','2019-12-08 02:53:07'),(55,3,'tejas@gmail.com','wow','2019-12-08 02:55:06'),(56,5,'tjs@gmail.com','new comment','2019-12-08 02:56:42'),(57,5,'tjs@gmail.com','new comment','2019-12-08 02:56:44'),(58,5,'tjs@gmail.com','new comment','2019-12-08 02:56:47'),(60,3,'tejas@gmail.com','wow','2019-12-08 03:08:48'),(61,3,'tejas@gmail.com','wow','2019-12-08 03:08:57'),(62,3,'tejas@gmail.com','wow','2019-12-08 03:09:04'),(63,3,'tejas@gmail.com','wow','2019-12-08 03:10:06'),(64,3,'tejas@gmail.com','wow','2019-12-08 03:10:44'),(65,3,'tejas@gmail.com','wow','2019-12-08 03:16:06'),(66,3,'tejas@gmail.com','wow','2019-12-08 03:20:04'),(67,3,'tejas@gmail.com','wow','2019-12-08 03:26:40'),(68,3,'tejas@gmail.com','wow','2019-12-08 03:27:42'),(69,3,'tejas@gmail.com','wow','2019-12-08 07:13:28'),(70,13,'priyanshi@gmail.com','Nice Picture Tejas!','2019-12-09 03:40:36'),(71,13,'tejas0809@gmail.com','Thanks!','2019-12-09 03:41:08'),(72,3,'tejas@gmail.com','wow','2019-12-09 07:43:37'),(73,3,'tejas@gmail.com','wow','2019-12-09 07:44:34'),(74,3,'tejas@gmail.com','wow','2019-12-09 07:45:21'),(75,3,'tejas@gmail.com','wow','2019-12-09 07:49:24'),(76,3,'tejas@gmail.com','wow','2019-12-09 07:55:51'),(77,3,'tejas@gmail.com','wow','2019-12-09 08:55:05'),(78,3,'tejas@gmail.com','wow','2019-12-09 18:45:39'),(79,3,'tejas@gmail.com','wow','2019-12-09 20:45:23'),(80,3,'tejas@gmail.com','wow','2019-12-09 20:57:40'),(81,3,'tejas@gmail.com','wow','2019-12-09 23:16:22'),(82,3,'tejas@gmail.com','wow','2019-12-09 23:22:26');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follows` (
  `email1` varchar(150) NOT NULL,
  `email2` varchar(150) NOT NULL,
  `followsTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`email1`,`email2`),
  KEY `email2` (`email2`),
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`email1`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`email2`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES ('nikhil@gmail.com','shubham@gmail.com','2019-12-08 01:34:48'),('priyanshi@gmail.com','tanmay@gmail.com','2019-12-09 03:40:00'),('priyanshi@gmail.com','tejas0809@gmail.com','2019-12-09 03:39:58'),('shreyansh@gmail.com','ayush@gmail.com','2019-12-08 20:10:00'),('shreyansh@gmail.com','nikhil@gmail.com','2019-12-08 20:09:54'),('shreyansh@gmail.com','tejas0809@gmail.com','2019-12-08 20:09:48'),('shreyansh@gmail.com','tejas@gmail.com','2019-12-08 20:10:30'),('shreyansh@gmail.com','tjs@gmail.com','2019-12-08 20:10:33'),('tejas0809@gmail.com','ajay@gmail.com','2019-12-09 18:12:39'),('tejas0809@gmail.com','ayush@gmail.com','2019-12-08 10:05:05'),('tejas0809@gmail.com','mihir@gmail.com','2019-12-07 19:48:46'),('tejas0809@gmail.com','rajesh@gmail.com','2019-12-09 18:08:40'),('tejas0809@gmail.com','saurabh@gmail.com','2019-12-08 09:12:33'),('tejas0809@gmail.com','shreyansh@gmail.com','2019-12-08 20:11:05'),('tejas0809@gmail.com','shubham@gmail.com','2019-12-08 09:12:37'),('tejas@gmail.com','saurabh@gmail.com','2019-11-30 06:14:28'),('tejas@gmail.com','shubham@gmail.com','2019-11-30 06:14:30'),('tejas@gmail.com','tejas0809@gmail.com','2019-12-09 23:22:24');
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `email` varchar(150) NOT NULL,
  `postId` int(10) unsigned NOT NULL,
  `likesTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`email`,`postId`),
  KEY `postId` (`postId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES ('mihir@gmail.com',3,'2019-12-08 02:20:23'),('nikhil@gmail.com',5,'2019-12-08 08:31:00'),('tejas0809@gmail.com',3,'2019-12-08 02:20:06'),('tejas@gmail.com',3,'2019-12-08 02:20:11'),('tjs@gmail.com',3,'2019-12-08 00:57:39');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `postTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `imagePath` varchar(1000) NOT NULL,
  `caption` varchar(500) DEFAULT NULL,
  `userEmail` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userEmail` (`userEmail`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userEmail`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (3,'2019-11-30 06:21:06','http://localhost:3000/images/saurabh@gmail.com-1575094866607.png','Now this is what a new caption looks like','saurabh@gmail.com'),(4,'2019-11-30 06:21:22','http://localhost:3000/images/saurabh@gmail.com-1575094882145.png','Loss Diag','saurabh@gmail.com'),(5,'2019-11-30 06:22:04','http://localhost:3000/images/shubham@gmail.com-1575094924145.png','First POst','shubham@gmail.com'),(8,'2019-12-08 02:47:58','http://localhost:3000/image/nikhil@gmail.com-178962882.png',NULL,'nikhil@gmail.com'),(9,'2019-12-08 02:56:12','http://localhost:3000/image/nikhil@gmail.com-178962882.png',NULL,'nikhil@gmail.com'),(13,'2019-12-08 18:20:32','http://localhost:3000/images/tejas0809@gmail.com-1575829231266.png','New image','tejas0809@gmail.com'),(14,'2019-12-08 20:09:05','http://localhost:3000/images/shreyansh@gmail.com-1575835745353.jpg','Camping!','shreyansh@gmail.com'),(15,'2019-12-08 20:09:25','http://localhost:3000/images/shreyansh@gmail.com-1575835765858.jpg','Taljai Hills','shreyansh@gmail.com'),(16,'2019-12-09 03:27:55','http://localhost:3000/images/tejas0809@gmail.com-1575862075927.jpg','null','tejas0809@gmail.com');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `post_id` int(10) unsigned NOT NULL,
  `email` varchar(150) NOT NULL,
  PRIMARY KEY (`post_id`,`email`),
  KEY `email` (`email`),
  CONSTRAINT `tags_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tags_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (5,'nikhil@gmail.com'),(5,'tejas0809@gmail.com');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `email` varchar(150) NOT NULL,
  `password` varchar(200) NOT NULL,
  `fname` varchar(150) NOT NULL,
  `lname` varchar(150) NOT NULL,
  `bio` varchar(300) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `profileImagePath` varchar(1500) DEFAULT NULL,
  `coverImagePath` varchar(1500) DEFAULT NULL,
  `visibility` varchar(20) DEFAULT 'public',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('ajay@gmail.com','$2b$10$53qWwf./pYmiZCyyB7spsO9qMIlcqqZgz1amYLAUJyKLoINwtqIhS','Ajay','Las',NULL,NULL,'male',NULL,NULL,NULL,NULL,'public'),('ayush@gmail.com','$2b$10$a0rKctnuIB/ucakgzT5SyOtCms.yneTJuETeWrk08Z85UXvqjX3Ye','Ayush','Parikh','Fun Loving Person','2019-01-01','male','India','Pune',NULL,NULL,'public'),('mihir@gmail.com','$2b$10$VzWFseBqFoHZN1vE9xQVY.G9zvkZ7gTuxLJh1T.cx4rNPiFamvsIW','Mihir','Parmar','Developer at GRASP','1997-01-05','male','USA','Philadelphia',NULL,NULL,'public'),('nikhil@gmail.com','$2b$10$igOlMi2YgXAatIh9aEmdvOTou6tEQTPlwsmqHyPFhhNLkx.DSGqyS','Nikhil','Motwani',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'public'),('priyanshi@gmail.com','$2b$10$FCggO82tTG9bE/YGU9qchu4BTkX7Her.bFnr2kAmgWqNTcF2uxGT6','Priyanshi','Rathore','Student ','1997-08-08','female','India','Indore',NULL,NULL,'public'),('rajesh@gmail.com','$2b$10$u/sgf0TujKSJNl024HeuIuS2PKFypmgevmbboeGiNJxDmMnw6wRJK','Rajesh','Arora','Live Long','2019-12-01','male','India','Mumbai',NULL,NULL,'public'),('saurabh@gmail.com','$2b$10$kW7Ssy6z7/urJHnE.MWzZuVEvBTynrnrSim6udqoFfGusiolcXMSi','Saurabh','Kumthekar',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'public'),('sh@shkk.com','$2b$10$7atMwaX74DpbO.46NPghf.yHK0ytKZr4cInJwOKzA6XtOqajIqQBa','ssss','ssss','Yo!\n','2001-01-01','male','USA','Philly',NULL,NULL,'public'),('shreyansh@gmail.com','$2b$10$YZTorh2BscUkRCmAt0YptekigpdR1pxNH3bPEtkKXmii37sX3p9uq','Shreyansh','Khandelwal','Sab moh maaya hai','1997-07-14','male','India','Pune',NULL,NULL,'public'),('shubham@gmail.com','$2b$10$HmGPCmhz2AYapnlpwFyt4u7FunRHVo9YQxtGdoTMCEErWc2Ab3TmG','Shubham','Annadate',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'public'),('tanmay@gmail.com','$2b$10$zOyiYblY6YydQsl1.YIpVeUN0keMyTTRiZUGjMdnrLw0j6bTFNtcS','Tanmay','Singhal','Developer at 7Targets','1998-01-05','male','India','Pune',NULL,NULL,'public'),('tejas0809@gmail.com','$2b$10$Wcps/6pEfetGWf4k8ggyS.9MNtAoVN6juHXs9P9Xmgbuf7BcyU6pq','Tejas','Srivastava','Hey there!','1997-09-07','male','India','Pune',NULL,NULL,'public'),('tejas@gmail.com','$2b$10$qYgYxqCUXEUwVnkZLplGC.zik43svjDRNjgtSifmBvDOEYWElOxLO','Tejas','Srivastava',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'public'),('test0@gmail.com','$2b$10$hdHCbLSjkRHND27M.nJyxOnTYpeglAByU1ykJnpigNw1L9/Ys4Wx.','Test0','Test0','Testing Bio','1997-01-01','male','China','Beijing',NULL,NULL,'public'),('tjs@gmail.com','$2b$10$um9r2SgA3FEHZUSnZbu/7u5jh2S/XGPvHSRQRcyatRjU.kVWPGWzO','Tejas','Srivastava','Hey!',NULL,'male','India','Pune',NULL,NULL,'public');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-09 18:25:59
