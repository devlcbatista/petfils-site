import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Clientes (Tutores de Pets)
 * Armazena informações dos clientes que agendam serviços
 */
export const clientes = mysqlTable("clientes", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  telefone: varchar("telefone", { length: 20 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }),
  endereco: text("endereco"),
  cidade: varchar("cidade", { length: 100 }),
  estado: varchar("estado", { length: 2 }),
  cep: varchar("cep", { length: 10 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Cliente = typeof clientes.$inferSelect;
export type InsertCliente = typeof clientes.$inferInsert;

/**
 * Pets
 * Armazena informações dos pets dos clientes
 */
export const pets = mysqlTable("pets", {
  id: int("id").autoincrement().primaryKey(),
  clienteId: int("clienteId").notNull(),
  nome: varchar("nome", { length: 255 }).notNull(),
  tipo: varchar("tipo", { length: 50 }).notNull(), // "cão", "gato", "outro"
  raca: varchar("raca", { length: 100 }),
  idade: int("idade"), // em anos
  peso: decimal("peso", { precision: 5, scale: 2 }), // em kg
  descricao: text("descricao"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Pet = typeof pets.$inferSelect;
export type InsertPet = typeof pets.$inferInsert;

/**
 * Agendamentos
 * Armazena os agendamentos de serviços
 */
export const agendamentos = mysqlTable("agendamentos", {
  id: int("id").autoincrement().primaryKey(),
  clienteId: int("clienteId").notNull(),
  petId: int("petId"),
  nomeCliente: varchar("nomeCliente", { length: 255 }).notNull(),
  telefonecliente: varchar("telefonecliente", { length: 20 }).notNull(),
  nomePet: varchar("nomePet", { length: 255 }).notNull(),
  tipoPet: varchar("tipoPet", { length: 50 }).notNull(), // "cão", "gato", "outro"
  servico: varchar("servico", { length: 255 }).notNull(), // "Banho e Tosa", "Tosa Higiênica", etc
  dataAgendamento: timestamp("dataAgendamento").notNull(),
  observacoes: text("observacoes"),
  status: mysqlEnum("status", ["pendente", "confirmado", "concluido", "cancelado"]).default("pendente").notNull(),
  enviouWhatsApp: boolean("enviouWhatsApp").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Agendamento = typeof agendamentos.$inferSelect;
export type InsertAgendamento = typeof agendamentos.$inferInsert;

/**
 * Serviços
 * Catálogo de serviços oferecidos
 */
export const servicos = mysqlTable("servicos", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull().unique(),
  descricao: text("descricao"),
  preco: decimal("preco", { precision: 10, scale: 2 }),
  duracao: int("duracao"), // em minutos
  ativo: boolean("ativo").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Servico = typeof servicos.$inferSelect;
export type InsertServico = typeof servicos.$inferInsert;

/**
 * Avaliações
 * Armazena avaliações e feedback dos clientes
 */
export const avaliacoes = mysqlTable("avaliacoes", {
  id: int("id").autoincrement().primaryKey(),
  agendamentoId: int("agendamentoId").notNull(),
  clienteId: int("clienteId").notNull(),
  classificacao: int("classificacao").notNull(), // 1-5 estrelas
  comentario: text("comentario"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Avaliacao = typeof avaliacoes.$inferSelect;
export type InsertAvaliacao = typeof avaliacoes.$inferInsert;

/**
 * Produtos (Estoque)
 * Catálogo de produtos disponíveis na loja
 */
export const produtos = mysqlTable("produtos", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull().unique(),
  descricao: text("descricao"),
  categoria: varchar("categoria", { length: 100 }).notNull(), // "Rações", "Brinquedos", "Petiscos", "Higiene", etc
  preco: decimal("preco", { precision: 10, scale: 2 }).notNull(),
  estoque: int("estoque").notNull().default(0),
  estoqueMinimo: int("estoqueMinimo").notNull().default(5), // Quantidade mínima para alerta
  fornecedor: varchar("fornecedor", { length: 255 }),
  sku: varchar("sku", { length: 100 }).unique(), // Código do produto
  ativo: boolean("ativo").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Produto = typeof produtos.$inferSelect;
export type InsertProduto = typeof produtos.$inferInsert;

/**
 * Movimentações de Estoque
 * Histórico de entradas e saídas de produtos
 */
export const movimentacoesEstoque = mysqlTable("movimentacoes_estoque", {
  id: int("id").autoincrement().primaryKey(),
  produtoId: int("produtoId").notNull(),
  tipo: mysqlEnum("tipo", ["entrada", "saida", "ajuste"]).notNull(), // entrada (compra), saida (venda), ajuste (correção)
  quantidade: int("quantidade").notNull(),
  motivo: varchar("motivo", { length: 255 }), // "Compra", "Venda", "Dano", "Perda", etc
  usuarioId: int("usuarioId"), // Quem fez a movimentação
  notas: text("notas"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MovimentacaoEstoque = typeof movimentacoesEstoque.$inferSelect;
export type InsertMovimentacaoEstoque = typeof movimentacoesEstoque.$inferInsert;

/**
 * Alertas de Estoque
 * Registra quando um produto atinge o estoque mínimo
 */
export const alertasEstoque = mysqlTable("alertas_estoque", {
  id: int("id").autoincrement().primaryKey(),
  produtoId: int("produtoId").notNull(),
  tipo: mysqlEnum("tipo", ["minimo", "critico", "fora_de_estoque"]).notNull(),
  estoque_atual: int("estoque_atual").notNull(),
  estoque_minimo: int("estoque_minimo").notNull(),
  lido: boolean("lido").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  resolvidoEm: timestamp("resolvidoEm"),
});

export type AlertaEstoque = typeof alertasEstoque.$inferSelect;
export type InsertAlertaEstoque = typeof alertasEstoque.$inferInsert;

/**
 * Usuários Clientes (Login)
 * Armazena contas de clientes para login e gerenciamento de pedidos
 */
export const usuariosClientes = mysqlTable("usuarios_clientes", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  senha: varchar("senha", { length: 255 }).notNull(), // Hash da senha
  nome: varchar("nome", { length: 255 }).notNull(),
  telefone: varchar("telefone", { length: 20 }),
  endereco: text("endereco"),
  cidade: varchar("cidade", { length: 100 }),
  estado: varchar("estado", { length: 2 }),
  cep: varchar("cep", { length: 10 }),
  ativo: boolean("ativo").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UsuarioCliente = typeof usuariosClientes.$inferSelect;
export type InsertUsuarioCliente = typeof usuariosClientes.$inferInsert;

/**
 * Pedidos
 * Armazena pedidos de produtos dos clientes
 */
export const pedidos = mysqlTable("pedidos", {
  id: int("id").autoincrement().primaryKey(),
  usuarioClienteId: int("usuarioClienteId").notNull(),
  numeroPedido: varchar("numeroPedido", { length: 50 }).notNull().unique(),
  status: mysqlEnum("status", ["pendente", "confirmado", "enviado", "entregue", "cancelado"]).default("pendente").notNull(),
  totalPedido: decimal("totalPedido", { precision: 10, scale: 2 }).notNull(),
  dataEntrega: timestamp("dataEntrega"),
  endereco: text("endereco"),
  observacoes: text("observacoes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Pedido = typeof pedidos.$inferSelect;
export type InsertPedido = typeof pedidos.$inferInsert;

/**
 * Itens do Pedido
 * Armazena os produtos dentro de cada pedido
 */
export const itensPedido = mysqlTable("itens_pedido", {
  id: int("id").autoincrement().primaryKey(),
  pedidoId: int("pedidoId").notNull(),
  produtoId: int("produtoId").notNull(),
  quantidade: int("quantidade").notNull(),
  precoUnitario: decimal("precoUnitario", { precision: 10, scale: 2 }).notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ItemPedido = typeof itensPedido.$inferSelect;
export type InsertItemPedido = typeof itensPedido.$inferInsert;
