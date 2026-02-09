CREATE TABLE `alertas_estoque` (
	`id` int AUTO_INCREMENT NOT NULL,
	`produtoId` int NOT NULL,
	`tipo` enum('minimo','critico','fora_de_estoque') NOT NULL,
	`estoque_atual` int NOT NULL,
	`estoque_minimo` int NOT NULL,
	`lido` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`resolvidoEm` timestamp,
	CONSTRAINT `alertas_estoque_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `movimentacoes_estoque` (
	`id` int AUTO_INCREMENT NOT NULL,
	`produtoId` int NOT NULL,
	`tipo` enum('entrada','saida','ajuste') NOT NULL,
	`quantidade` int NOT NULL,
	`motivo` varchar(255),
	`usuarioId` int,
	`notas` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `movimentacoes_estoque_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `produtos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`descricao` text,
	`categoria` varchar(100) NOT NULL,
	`preco` decimal(10,2) NOT NULL,
	`estoque` int NOT NULL DEFAULT 0,
	`estoqueMinimo` int NOT NULL DEFAULT 5,
	`fornecedor` varchar(255),
	`sku` varchar(100),
	`ativo` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `produtos_id` PRIMARY KEY(`id`),
	CONSTRAINT `produtos_nome_unique` UNIQUE(`nome`),
	CONSTRAINT `produtos_sku_unique` UNIQUE(`sku`)
);
