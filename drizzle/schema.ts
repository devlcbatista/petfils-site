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