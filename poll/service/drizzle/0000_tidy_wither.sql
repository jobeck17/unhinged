CREATE TABLE `responses` (
	`id` text PRIMARY KEY NOT NULL,
	`poll_version` text NOT NULL,
	`answers_json` text NOT NULL,
	`created_at` text NOT NULL
);
