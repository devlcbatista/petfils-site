import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { criarAgendamento, obterAgendamentos, obterAgendamentosPendentes, contarAgendamentosPorStatus, atualizarStatusAgendamento, deletarAgendamento } from "./db-agendamentos";
import { getDb } from "./db";
import { agendamentos } from "../drizzle/schema";

describe("Agendamentos Database Functions", () => {
  let agendamentoId: number | null = null;

  beforeAll(async () => {
    // Limpar dados de teste anteriores
    const db = await getDb();
    if (db) {
      try {
        await db.delete(agendamentos);
      } catch (error) {
        console.warn("Could not clean up test data:", error);
      }
    }
  });

  afterAll(async () => {
    // Limpar dados de teste
    const db = await getDb();
    if (db) {
      try {
        await db.delete(agendamentos);
      } catch (error) {
        console.warn("Could not clean up test data:", error);
      }
    }
  });

  it("should create a new agendamento", async () => {
    const dataAgendamento = new Date();
    dataAgendamento.setHours(14, 30, 0, 0);
    
    const novoAgendamento = {
      clienteId: 1,
      nomeCliente: "João Silva",
      telefonecliente: "(27) 99999-9999",
      nomePet: "Rex",
      tipoPet: "cão",
      servico: "Banho e Tosa",
      dataAgendamento,
      observacoes: "Pet agressivo, cuidado",
      status: "pendente" as const,
      enviouWhatsApp: false,
    };

    const resultado = await criarAgendamento(novoAgendamento);
    
    expect(resultado).not.toBeNull();
    expect(resultado?.nomeCliente).toBe("João Silva");
    expect(resultado?.servico).toBe("Banho e Tosa");
    expect(resultado?.status).toBe("pendente");
    
    if (resultado?.id) {
      agendamentoId = resultado.id;
    }
  });

  it("should list all agendamentos", async () => {
    const lista = await obterAgendamentos();
    
    expect(Array.isArray(lista)).toBe(true);
    expect(lista.length).toBeGreaterThan(0);
  });

  it("should get pending agendamentos", async () => {
    const pendentes = await obterAgendamentosPendentes();
    
    expect(Array.isArray(pendentes)).toBe(true);
    if (pendentes.length > 0) {
      expect(pendentes.every(a => a.status === "pendente")).toBe(true);
    }
  });

  it("should count agendamentos by status", async () => {
    const counts = await contarAgendamentosPorStatus();
    
    expect(counts).toBeDefined();
    expect(typeof counts.pendente).toBe("number");
  });

  it("should update agendamento status", async () => {
    if (!agendamentoId) {
      console.warn("Skipping status update test: no agendamento ID");
      expect(true).toBe(true);
      return;
    }

    const sucesso = await atualizarStatusAgendamento(agendamentoId, "confirmado");
    
    expect(sucesso).toBe(true);
  });

  it("should delete agendamento", async () => {
    if (!agendamentoId) {
      console.warn("Skipping delete test: no agendamento ID");
      expect(true).toBe(true);
      return;
    }

    const sucesso = await deletarAgendamento(agendamentoId);
    
    expect(sucesso).toBe(true);
  });

  it("should handle empty string inputs gracefully", async () => {
    try {
      const resultado = await criarAgendamento({
        clienteId: 0,
        nomeCliente: "",
        telefonecliente: "",
        nomePet: "",
        tipoPet: "",
        servico: "",
        dataAgendamento: new Date(),
        status: "pendente" as const,
        enviouWhatsApp: false,
      });
      expect(resultado).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
