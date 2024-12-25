-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2024 at 05:13 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clirx`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `role` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `role`, `date_created`) VALUES
(4, 'Jaymar Magbutong', 'jaymar@yahoo.com', '$2a$10$1Dr2CcyEkDKg50WQytvyPeRmFFN9B4htJGqTTcDaYph2cd.i7K17W', 1, '2024-09-12 07:44:25'),
(5, 'Teddy Apostol', 'teddybear@gmail.com', '$2a$10$gjKvdqS7bYvC9kR9Ot/ww.IY2qhXRdBo5Bk3qXN44f13YepwlbjT2', 1, '2024-09-13 03:54:47'),
(6, 'Dianne Grace', 'diannejetjetollegue@gmail.com', '$2a$10$.VIsHdoIySph76j92YSqKORcbG7G0.Yawj5AEXMpt9YBVfWpWN2Uy', 3, '2024-09-13 04:18:47'),
(7, 'Alice Johnsons', 'alicejohn@gmail.com', '$2a$10$xEaLdDfLepGkl3F17yjnROvRH5ou23thmv7TDp059ARN5648J5FTi', 3, '2024-09-13 05:55:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
