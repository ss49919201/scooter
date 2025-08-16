CREATE TABLE `monto_addresses` (
	`id` text PRIMARY KEY NOT NULL,
	`monto_id` text NOT NULL,
	`url` text NOT NULL,
	FOREIGN KEY (`monto_id`) REFERENCES `montos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `monto_events` (
	`id` text NOT NULL,
	`version` integer NOT NULL,
	`data` text NOT NULL,
	PRIMARY KEY(`id`, `version`)
);
--> statement-breakpoint
CREATE TABLE `montos` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
