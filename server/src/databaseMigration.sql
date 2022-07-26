
CREATE DATABASE IF NOT EXISTS nodeJsTest;
USE nodeJsTest;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `reg_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'vidmantas1','vidmantas1','$2b$10$tnVaAX25bSkE2l32WLGNduqvAzNZD7hIm5LQWjhWH8VgBTOCTmY9O','2022-07-17 20:17:28'),(2,'vidmantas2','vidmantas2','$2b$10$/LZWSugKamlwY/I0KHoQ2Oc8JQyVOk7gMRwURJmHpmOG1HRYNz2vG','2022-07-17 20:47:36'),(3,'vidmantas3','vidmantas3','$2b$10$2xNEScdsp8umTikI1285f.ioatZ5o04jG1e2PY0MZnRn013NcHL72','2022-07-17 20:48:09'),(4,'vidmantas4','vidmantas4','$2b$10$G2mvTkwvUnL9b/Z1eANeveGA/9LZeW5izPGSYHO/4Dw6qw5dqjUiG','2022-07-17 20:58:28');
UNLOCK TABLES;

DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `grupes`
--

LOCK TABLES `groups` WRITE;
INSERT INTO `groups` VALUES (1,'Trip to Spain'),(2,'Going to Alps'),(3,'Dinner in Belgium'),(4,'Trip to Finland'),(5,'New Years Party');
UNLOCK TABLES;


--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `accounts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
CREATE TABLE `bills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `grupes_id` (`group_id`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



