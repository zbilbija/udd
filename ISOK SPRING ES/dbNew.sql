-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: isokdb
-- ------------------------------------------------------
-- Server version	5.7.20-log

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
-- Table structure for table `home_age`
--

DROP TABLE IF EXISTS `home_age`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `home_age` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `age_num` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_age`
--

LOCK TABLES `home_age` WRITE;
/*!40000 ALTER TABLE `home_age` DISABLE KEYS */;
INSERT INTO `home_age` (`id`, `age_num`) VALUES (1,'0-10'),(2,'11-30'),(3,'31-60'),(4,'61-100'),(5,'101+');
/*!40000 ALTER TABLE `home_age` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_insurance`
--

DROP TABLE IF EXISTS `home_insurance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `home_insurance` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `length` int(11) NOT NULL,
  `start_price` double NOT NULL,
  `insurance_length` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_insurance`
--

LOCK TABLES `home_insurance` WRITE;
/*!40000 ALTER TABLE `home_insurance` DISABLE KEYS */;
/*!40000 ALTER TABLE `home_insurance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_owner`
--

DROP TABLE IF EXISTS `home_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `home_owner` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `jmbg` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_owner`
--

LOCK TABLES `home_owner` WRITE;
/*!40000 ALTER TABLE `home_owner` DISABLE KEYS */;
INSERT INTO `home_owner` (`id`, `address`, `full_name`, `jmbg`) VALUES (1,'Knez Mihajlova 1','Milivoje Skiljevic','0302995167842');
/*!40000 ALTER TABLE `home_owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_surface`
--

DROP TABLE IF EXISTS `home_surface`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `home_surface` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `surface_num` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_surface`
--

LOCK TABLES `home_surface` WRITE;
/*!40000 ALTER TABLE `home_surface` DISABLE KEYS */;
INSERT INTO `home_surface` (`id`, `surface_num`) VALUES (1,'1-20'),(2,'21-40'),(3,'41-70'),(4,'71-100'),(5,'100+');
/*!40000 ALTER TABLE `home_surface` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_value`
--

DROP TABLE IF EXISTS `home_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `home_value` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `approx_value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_value`
--

LOCK TABLES `home_value` WRITE;
/*!40000 ALTER TABLE `home_value` DISABLE KEYS */;
INSERT INTO `home_value` (`id`, `approx_value`) VALUES (1,'1-15000'),(2,'15001-30000'),(3,'30001-60000'),(4,'60001-100000'),(5,'100001+');
/*!40000 ALTER TABLE `home_value` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insurance_category`
--

DROP TABLE IF EXISTS `insurance_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `insurance_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insurance_category`
--

LOCK TABLES `insurance_category` WRITE;
/*!40000 ALTER TABLE `insurance_category` DISABLE KEYS */;
INSERT INTO `insurance_category` (`id`, `category_name`) VALUES (1,'HomeInsurance');
/*!40000 ALTER TABLE `insurance_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insurance_category_risk`
--

DROP TABLE IF EXISTS `insurance_category_risk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `insurance_category_risk` (
  `insurance_categoryid` bigint(20) NOT NULL,
  `riskid` bigint(20) NOT NULL,
  PRIMARY KEY (`insurance_categoryid`,`riskid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insurance_category_risk`
--

LOCK TABLES `insurance_category_risk` WRITE;
/*!40000 ALTER TABLE `insurance_category_risk` DISABLE KEYS */;
INSERT INTO `insurance_category_risk` (`insurance_categoryid`, `riskid`) VALUES (1,1),(1,2),(1,3),(1,4);
/*!40000 ALTER TABLE `insurance_category_risk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insurance_type`
--

DROP TABLE IF EXISTS `insurance_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `insurance_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insurance_type`
--

LOCK TABLES `insurance_type` WRITE;
/*!40000 ALTER TABLE `insurance_type` DISABLE KEYS */;
INSERT INTO `insurance_type` (`id`, `type_name`) VALUES (1,'House'),(2,'Flat'),(3,'Apartment');
/*!40000 ALTER TABLE `insurance_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy`
--

DROP TABLE IF EXISTS `policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `policy` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `home_insuranceid` bigint(20) NOT NULL,
  `price_summed` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy`
--

LOCK TABLES `policy` WRITE;
/*!40000 ALTER TABLE `policy` DISABLE KEYS */;
/*!40000 ALTER TABLE `policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_risk_item`
--

DROP TABLE IF EXISTS `policy_risk_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `policy_risk_item` (
  `policyid` bigint(20) NOT NULL,
  `risk_itemid` bigint(20) NOT NULL,
  PRIMARY KEY (`policyid`,`risk_itemid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_risk_item`
--

LOCK TABLES `policy_risk_item` WRITE;
/*!40000 ALTER TABLE `policy_risk_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `policy_risk_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_impact_pricelist`
--

DROP TABLE IF EXISTS `price_impact_pricelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `price_impact_pricelist` (
  `price_impactid` bigint(20) NOT NULL,
  `pricelistid` bigint(20) NOT NULL,
  PRIMARY KEY (`price_impactid`,`pricelistid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_impact_pricelist`
--

LOCK TABLES `price_impact_pricelist` WRITE;
/*!40000 ALTER TABLE `price_impact_pricelist` DISABLE KEYS */;
INSERT INTO `price_impact_pricelist` (`price_impactid`, `pricelistid`) VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1);
/*!40000 ALTER TABLE `price_impact_pricelist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_impacts`
--

DROP TABLE IF EXISTS `price_impacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `price_impacts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `risk_item_id` bigint(20) NOT NULL,
  `valid_from` datetime NOT NULL,
  `valid_to` datetime NOT NULL,
  `value` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_impacts`
--

LOCK TABLES `price_impacts` WRITE;
/*!40000 ALTER TABLE `price_impacts` DISABLE KEYS */;
INSERT INTO `price_impacts` (`id`, `risk_item_id`, `valid_from`, `valid_to`, `value`) VALUES (1,1,'2017-01-01 00:00:00','2017-12-31 00:00:00',10),(2,2,'2017-01-01 00:00:00','2017-12-31 00:00:00',20),(3,3,'2017-01-01 00:00:00','2017-12-31 00:00:00',30),(4,4,'2017-01-01 00:00:00','2017-12-31 00:00:00',40),(5,5,'2017-01-01 00:00:00','2017-12-31 00:00:00',50),(6,6,'2017-01-01 00:00:00','2017-12-31 00:00:00',100),(7,7,'2017-01-01 00:00:00','2017-12-31 00:00:00',120),(8,8,'2017-01-01 00:00:00','2017-12-31 00:00:00',140),(9,9,'2017-01-01 00:00:00','2017-12-31 00:00:00',160),(10,10,'2017-01-01 00:00:00','2017-12-31 00:00:00',200),(11,11,'2017-01-01 00:00:00','2017-12-31 00:00:00',250),(12,12,'2017-01-01 00:00:00','2017-12-31 00:00:00',300),(13,13,'2017-01-01 00:00:00','2017-12-31 00:00:00',300),(14,14,'2017-01-01 00:00:00','2017-12-31 00:00:00',350),(15,15,'2017-01-01 00:00:00','2017-12-31 00:00:00',400),(16,16,'2017-01-01 00:00:00','2017-12-31 00:00:00',450);
/*!40000 ALTER TABLE `price_impacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_list`
--

DROP TABLE IF EXISTS `price_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `price_list` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `valid_from` datetime NOT NULL,
  `valid_to` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_list`
--

LOCK TABLES `price_list` WRITE;
/*!40000 ALTER TABLE `price_list` DISABLE KEYS */;
INSERT INTO `price_list` (`id`, `valid_from`, `valid_to`) VALUES (1,'2017-01-01 00:00:00','2017-12-31 00:00:00');
/*!40000 ALTER TABLE `price_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `risk`
--

DROP TABLE IF EXISTS `risk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `risk` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `risk_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `risk`
--

LOCK TABLES `risk` WRITE;
/*!40000 ALTER TABLE `risk` DISABLE KEYS */;
INSERT INTO `risk` (`id`, `risk_name`) VALUES (1,'Home age'),(2,'Home surface'),(3,'Insurance type'),(4,'Home value');
/*!40000 ALTER TABLE `risk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `risk_item`
--

DROP TABLE IF EXISTS `risk_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `risk_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `riskid` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `risk_item`
--

LOCK TABLES `risk_item` WRITE;
/*!40000 ALTER TABLE `risk_item` DISABLE KEYS */;
INSERT INTO `risk_item` (`id`, `item_name`, `riskid`) VALUES (1,'0-18',1),(2,'19-30',1),(3,'31-50',1),(4,'51-70',1),(5,'71+',1),(6,'1-24',2),(7,'25-40',2),(8,'41-60',2),(9,'61+',2),(10,'House',3),(11,'Flat',3),(12,'Apartment',3),(13,'0-10000',4),(14,'10001-25000',4),(15,'25001-35000',4),(16,'35001-60000',4);
/*!40000 ALTER TABLE `risk_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `name`) VALUES (1,'marko@live.com','marko'),(2,'dasdas','dasdasda');
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

-- Dump completed on 2017-11-14 23:46:58
