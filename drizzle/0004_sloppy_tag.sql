CREATE TABLE `carrinho` (
	`id` int AUTO_INCREMENT NOT NULL,
	`usuarioClienteId` int NOT NULL,
	`produtoId` int NOT NULL,
	`quantidade` int NOT NULL,
	`precoUnitario` decimal(10,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `carrinho_id` PRIMARY KEY(`id`)
);
