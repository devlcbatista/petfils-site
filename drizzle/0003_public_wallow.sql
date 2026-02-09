CREATE TABLE `itens_pedido` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pedidoId` int NOT NULL,
	`produtoId` int NOT NULL,
	`quantidade` int NOT NULL,
	`precoUnitario` decimal(10,2) NOT NULL,
	`subtotal` decimal(10,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `itens_pedido_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pedidos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`usuarioClienteId` int NOT NULL,
	`numeroPedido` varchar(50) NOT NULL,
	`status` enum('pendente','confirmado','enviado','entregue','cancelado') NOT NULL DEFAULT 'pendente',
	`totalPedido` decimal(10,2) NOT NULL,
	`dataEntrega` timestamp,
	`endereco` text,
	`observacoes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pedidos_id` PRIMARY KEY(`id`),
	CONSTRAINT `pedidos_numeroPedido_unique` UNIQUE(`numeroPedido`)
);
--> statement-breakpoint
CREATE TABLE `usuarios_clientes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`senha` varchar(255) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`telefone` varchar(20),
	`endereco` text,
	`cidade` varchar(100),
	`estado` varchar(2),
	`cep` varchar(10),
	`ativo` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `usuarios_clientes_id` PRIMARY KEY(`id`),
	CONSTRAINT `usuarios_clientes_email_unique` UNIQUE(`email`)
);
