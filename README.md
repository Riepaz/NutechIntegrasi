### Nutech Integrasi Test
Aplikasi ini ditujukan untuk memenuhi kebutuhan Test dari Nutech Integrasi \n
Aplikasi ini adalah aplikasi Backend Restful API untuk API Contract SIMS PPOB

* * *

#### Main Host

`https://nutechintegrasi-production-ba29.up.railway.app/api`

* * *

#### Endpoint Membership

> Registration `POST` : `/user/register`

> Login `POST` : `/user/login`

> Profile `GET` : `/user/profile`

> Profile Update `PUT` : `/user/profile/update`

> Profile Image `PUT` : `/user/profile/image`


#### Endpoint Information

> Banner `GET` : `/information/banner`

> Services `GET` : `/information/services`


#### Endpoint Transaction

> Balance `GET` : `/transaction/balance`

> Top Up `POST` : `/transaction/topup`

> Top Up `POST` : `/transaction/transaction`

> History `GET` : `/transaction/history` 

* * *

#### Postman Collection 
Sudah disertakan Postman Collection dengan Nama
`Nutech_Integrasi.postman_collection`

* * *

#### Data Definition Language (DDL) SQL Script
```sql

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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL DEFAULT 'UUID()',
  `email` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(125) NOT NULL,
  `profile_image` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

```

