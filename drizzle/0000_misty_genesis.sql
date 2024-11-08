CREATE TABLE `customer` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` TEXT NOT NULL CHECK(LENGTH(name) <= 128),
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `order` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customerId` integer NOT NULL,
	`date` text DEFAULT (CURRENT_TIME),
	FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orderItem` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`orderId` integer NOT NULL,
	`productId` integer NOT NULL,
	`quantity` INTEGER NOT NULL CHECK(quantity > 0),
	FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` TEXT NOT NULL CHECK(LENGTH(name) <= 50),
	`description` TEXT NOT NULL CHECK(LENGTH(description) <= 512),
	`price` INTEGER NOT NULL CHECK(price > 0),
	`stock` INTEGER NOT NULL CHECK(stock >= 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `customer_email_unique` ON `customer` (`email`);