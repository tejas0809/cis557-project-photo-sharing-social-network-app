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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
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
INSERT INTO `follows` VALUES ('nikhil@gmail.com','shubham@gmail.com','2019-12-03 02:27:23'),('tejas0809@gmail.com','mihir@gmail.com','2019-12-07 19:48:46'),('tejas@gmail.com','saurabh@gmail.com','2019-11-30 06:14:28'),('tejas@gmail.com','shubham@gmail.com','2019-11-30 06:14:30');
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
INSERT INTO `likes` VALUES ('tejas@gmail.com',4,'2019-11-30 07:47:01');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (3,'2019-11-30 06:21:06','http://localhost:3000/images/saurabh@gmail.com-1575094866607.png','Convulational','saurabh@gmail.com'),(4,'2019-11-30 06:21:22','http://localhost:3000/images/saurabh@gmail.com-1575094882145.png','Loss Diag','saurabh@gmail.com'),(5,'2019-11-30 06:22:04','http://localhost:3000/images/shubham@gmail.com-1575094924145.png','First POst','shubham@gmail.com'),(7,'2019-12-06 09:28:58','http://localhost:3000/images/nikhil@gmail.com-1575624538138.png','First POst','nikhil@gmail.com');
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
INSERT INTO `users` VALUES ('ajay@gmail.com','$2b$10$53qWwf./pYmiZCyyB7spsO9qMIlcqqZgz1amYLAUJyKLoINwtqIhS','Ajay','Las',NULL,NULL,'male',NULL,NULL,NULL,NULL,'public'),('ayush@gmail.com','$2b$10$a0rKctnuIB/ucakgzT5SyOtCms.yneTJuETeWrk08Z85UXvqjX3Ye','Ayush','Parikh','Fun Loving Person','2019-01-01','male','India','Pune',NULL,NULL,'public'),('mihir@gmail.com','$2b$10$VzWFseBqFoHZN1vE9xQVY.G9zvkZ7gTuxLJh1T.cx4rNPiFamvsIW','Mihir','Parmar','Developer at GRASP','1997-01-05','male','USA','Philadelphia',NULL,NULL,'public'),('nikhil@gmail.com','$2b$10$igOlMi2YgXAatIh9aEmdvOTou6tEQTPlwsmqHyPFhhNLkx.DSGqyS','Nikhil','Motwani',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'public'),('rajesh@gmail.com','$2b$10$u/sgf0TujKSJNl024HeuIuS2PKFypmgevmbboeGiNJxDmMnw6wRJK','Rajesh','Arora','Live Long','2019-12-01','male','India','Mumbai',NULL,NULL,'public'),('saurabh@gmail.com','$2b$10$kW7Ssy6z7/urJHnE.MWzZuVEvBTynrnrSim6udqoFfGusiolcXMSi','Saurabh','Kumthekar',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'public'),('shubham@gmail.com','$2b$10$HmGPCmhz2AYapnlpwFyt4u7FunRHVo9YQxtGdoTMCEErWc2Ab3TmG','Shubham','Annadate',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'public'),('tanmay@gmail.com','$2b$10$zOyiYblY6YydQsl1.YIpVeUN0keMyTTRiZUGjMdnrLw0j6bTFNtcS','Tanmay','Singhal','Developer at 7Targets','1998-01-05','male','India','Pune',NULL,NULL,'public'),('tejas0809@gmail.com','$2b$10$Wcps/6pEfetGWf4k8ggyS.9MNtAoVN6juHXs9P9Xmgbuf7BcyU6pq','Tejas','Srivastava','Hey there!','1997-09-07','male','India','Pune',NULL,NULL,'public'),('tejas@gmail.com','$2b$10$qYgYxqCUXEUwVnkZLplGC.zik43svjDRNjgtSifmBvDOEYWElOxLO','Tejas','Srivastava',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'public');
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

-- Dump completed on 2019-12-07 15:20:27
