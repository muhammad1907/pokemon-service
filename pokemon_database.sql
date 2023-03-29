# Host: localhost  (Version 5.5.5-10.4.24-MariaDB)
# Date: 2023-03-30 05:41:18
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "pokemons"
#

DROP TABLE IF EXISTS `pokemons`;
CREATE TABLE `pokemons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `pokemon_id` int(11) NOT NULL,
  `pokemon_name` varchar(255) NOT NULL,
  `changes` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

#
# Structure for table "sequelizemeta"
#

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
