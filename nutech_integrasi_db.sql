-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2025 at 05:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutech_integrasi_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

USE nutech_integrasi_db;

CREATE TABLE `accounts` (
  `id` varchar(36) NOT NULL DEFAULT 'UUID()',
  `user_id` varchar(36) NOT NULL,
  `account_number` varchar(36) NOT NULL,
  `account_type` enum('regular','priority','','') NOT NULL DEFAULT 'regular',
  `balance` int(13) NOT NULL,
  `status` enum('1','0') NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `user_id`, `account_number`, `account_type`, `balance`, `status`, `created_at`, `updated_at`) VALUES
('ge60eb8d-6117-4851-b693-f543b74a0dsa', 'f160eb8d-6117-4851-b693-f543b74a0d90', '425512', 'regular', 1340000, '1', '2025-05-17 23:27:42', '2025-05-18 01:06:55');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` varchar(36) NOT NULL DEFAULT 'UUID()',
  `banner_name` varchar(100) NOT NULL,
  `banner_image` text NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `banner_name`, `banner_image`, `description`, `created_at`, `updated_at`) VALUES
('5b2f5aae-3373-11f0-b30e-d8c497210231', 'Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2025-05-17 23:04:55', '2025-05-17 23:04:55'),
('5b2f5aae-3373-11f0-b30e-d8c4972108d4', 'Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2025-05-17 23:04:55', '2025-05-17 23:04:55');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` varchar(36) NOT NULL DEFAULT 'UUID()',
  `service_code` varchar(100) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_icon` text NOT NULL,
  `service_tariff` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_code`, `service_name`, `service_icon`, `service_tariff`, `created_at`, `updated_at`) VALUES
('87af63a8-3374-11f0-b30e-d8c4972108d4', 'PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2025-05-17 23:13:19', '2025-05-17 23:13:19'),
('a4ff2d1b-3374-11f0-b30e-d8c4972108d4', 'VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000, '2025-05-17 23:14:08', '2025-05-17 23:14:08');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` varchar(36) NOT NULL DEFAULT 'UUID()',
  `user_id` varchar(36) NOT NULL,
  `invoice_number` varchar(36) NOT NULL,
  `service_code` varchar(100) NOT NULL,
  `transaction_type` enum('PAYMENT','TOPUP','','') NOT NULL,
  `total_amount` int(13) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `invoice_number`, `service_code`, `transaction_type`, `total_amount`, `description`, `created_at`, `updated_at`) VALUES
('5d117c4c-75d9-447c-8e6a-ad5051681318', 'f160eb8d-6117-4851-b693-f543b74a0d90', 'INV20250518-212', 'PAJAK', 'PAYMENT', 40000, 'Pajak PBB', '2025-05-18 00:48:04', '2025-05-18 00:48:04'),
('614809e1-fe5d-4ccf-bba1-ab38ad0be9d7', 'f160eb8d-6117-4851-b693-f543b74a0d90', 'INV20250518-752', 'PAJAK', 'PAYMENT', 40000, 'Pajak PBB', '2025-05-18 00:55:47', '2025-05-18 00:55:47'),
('6c7a2775-6445-4558-8457-7572fbe971eb', 'f160eb8d-6117-4851-b693-f543b74a0d90', 'INV20250518-495', '', 'TOPUP', 500000, 'Topup Saldo', '2025-05-18 00:22:07', '2025-05-18 00:22:07'),
('b4b32615-93e5-48ea-bef9-16188cd77be6', 'f160eb8d-6117-4851-b693-f543b74a0d90', 'INV20250518-540', 'PAJAK', 'PAYMENT', 40000, 'Pajak PBB', '2025-05-18 01:06:55', '2025-05-18 01:06:55'),
('dd691ca8-a6d7-4120-b770-8e30a12465ff', 'f160eb8d-6117-4851-b693-f543b74a0d90', 'INV20250518-269', '', 'TOPUP', 1000000, 'Topup Saldo', '2025-05-18 00:21:47', '2025-05-18 00:21:47'),
('f4160d17-9215-44dd-a22f-76ed3b02c0f0', 'f160eb8d-6117-4851-b693-f543b74a0d90', 'INV20250518-665', 'PAJAK', 'PAYMENT', 40000, 'Pajak PBB', '2025-05-18 00:46:15', '2025-05-18 00:46:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL DEFAULT 'UUID()',
  `email` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(125) NOT NULL,
  `profile_image` text,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `password`, `profile_image`, `created_at`, `updated_at`) VALUES
('f160eb8d-6117-4851-b693-f543b74a0d90', 'pandawa.rifaz@gmail.com', 'Embe', 'Badot', '$2b$10$y.C7TXlHp6qLj7Vvrd8Sbu4cUu14IcH/SGib9Wl4dKSwhIZZ4X1t6', 'http://localhost:3000/profile_image/f160eb8d-6117-4851-b693-f543b74a0d90.png', '2025-05-17 09:10:20', '2025-05-18 03:04:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
