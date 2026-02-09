import { eq, gte, lte, desc } from "drizzle-orm";
import { getDb } from "./db";
import { agendamentos, servicos, clientes } from "../drizzle/schema";

/**
 * Obter estatísticas gerais do dashboard
 */
export async function obterEstatisticasGerais() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get statistics: database not available");
    return null;
  }

  try {
    const totalAgendamentos = await db.select().from(agendamentos);
    const agendamentosPendentes = totalAgendamentos.filter(a => a.status === "pendente");
    const agendamentosConfirmados = totalAgendamentos.filter(a => a.status === "confirmado");
    const agendamentosConcluidos = totalAgendamentos.filter(a => a.status === "concluido");
    
    const totalClientes = await db.select().from(clientes);
    const totalServicos = await db.select().from(servicos);

    return {
      totalAgendamentos: totalAgendamentos.length,
      agendamentosPendentes: agendamentosPendentes.length,
      agendamentosConfirmados: agendamentosConfirmados.length,
      agendamentosConcluidos: agendamentosConcluidos.length,
      totalClientes: totalClientes.length,
      totalServicos: totalServicos.length,
    };
  } catch (error) {
    console.error("[Database] Failed to get statistics:", error);
    return null;
  }
}

/**
 * Calcular receita total
 */
export async function calcularReceitaTotal(): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot calculate revenue: database not available");
    return 0;
  }

  try {
    const agendamentosConcluidos = await db
      .select()
      .from(agendamentos)
      .where(eq(agendamentos.status, "concluido"));

    let total = 0;
    for (const agendamento of agendamentosConcluidos) {
      // Procurar o preço do serviço
      const servico = await db
        .select()
        .from(servicos)
        .where(eq(servicos.nome, agendamento.servico));
      
      if (servico.length > 0 && servico[0].preco) {
        total += Number(servico[0].preco);
      }
    }

    return total;
  } catch (error) {
    console.error("[Database] Failed to calculate revenue:", error);
    return 0;
  }
}

/**
 * Calcular receita por período
 */
export async function calcularReceitaPorPeriodo(dataInicio: Date, dataFim: Date): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot calculate revenue: database not available");
    return 0;
  }

  try {
    const agendamentos_list = await db
      .select()
      .from(agendamentos)
      .where(eq(agendamentos.status, "concluido"));

    let total = 0;
    for (const agendamento of agendamentos_list) {
      const dataAgendamento = new Date(agendamento.dataAgendamento);
      if (dataAgendamento >= dataInicio && dataAgendamento <= dataFim) {
        const servico = await db
          .select()
          .from(servicos)
          .where(eq(servicos.nome, agendamento.servico));
        
        if (servico.length > 0 && servico[0].preco) {
          total += Number(servico[0].preco);
        }
      }
    }

    return total;
  } catch (error) {
    console.error("[Database] Failed to calculate revenue by period:", error);
    return 0;
  }
}

/**
 * Obter serviço mais popular
 */
export async function obterServicoMaisPopular() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get popular service: database not available");
    return null;
  }

  try {
    const agendamentos_list = await db.select().from(agendamentos);
    
    const servicoCount: Record<string, number> = {};
    for (const agendamento of agendamentos_list) {
      servicoCount[agendamento.servico] = (servicoCount[agendamento.servico] || 0) + 1;
    }

    let servicoMaisPopular = null;
    let maxCount = 0;
    for (const [servico, count] of Object.entries(servicoCount)) {
      if (count > maxCount) {
        maxCount = count;
        servicoMaisPopular = servico;
      }
    }

    return { servico: servicoMaisPopular, count: maxCount };
  } catch (error) {
    console.error("[Database] Failed to get popular service:", error);
    return null;
  }
}

/**
 * Obter receita por serviço
 */
export async function obterReceitaPorServico() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get revenue by service: database not available");
    return [];
  }

  try {
    const agendamentosConcluidos = await db
      .select()
      .from(agendamentos)
      .where(eq(agendamentos.status, "concluido"));

    const receitaPorServico: Record<string, { total: number; count: number }> = {};

    for (const agendamento of agendamentosConcluidos) {
      const servico = await db
        .select()
        .from(servicos)
        .where(eq(servicos.nome, agendamento.servico));
      
      if (servico.length > 0 && servico[0].preco) {
        const preco = Number(servico[0].preco);
        if (!receitaPorServico[agendamento.servico]) {
          receitaPorServico[agendamento.servico] = { total: 0, count: 0 };
        }
        receitaPorServico[agendamento.servico].total += preco;
        receitaPorServico[agendamento.servico].count += 1;
      }
    }

    return Object.entries(receitaPorServico).map(([servico, data]) => ({
      servico,
      total: data.total,
      count: data.count,
      media: data.total / data.count,
    }));
  } catch (error) {
    console.error("[Database] Failed to get revenue by service:", error);
    return [];
  }
}

/**
 * Obter agendamentos recentes
 */
export async function obterAgendamentosRecentes(limite: number = 10) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get recent agendamentos: database not available");
    return [];
  }

  try {
    return await db
      .select()
      .from(agendamentos)
      .orderBy(desc(agendamentos.createdAt))
      .limit(limite);
  } catch (error) {
    console.error("[Database] Failed to get recent agendamentos:", error);
    return [];
  }
}

/**
 * Obter clientes mais frequentes
 */
export async function obterClientesMaisFrequentes(limite: number = 10) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get frequent clients: database not available");
    return [];
  }

  try {
    const agendamentos_list = await db.select().from(agendamentos);
    
    const clienteCount: Record<string, { nome: string; telefone: string; count: number }> = {};
    for (const agendamento of agendamentos_list) {
      if (!clienteCount[agendamento.nomeCliente]) {
        clienteCount[agendamento.nomeCliente] = {
          nome: agendamento.nomeCliente,
          telefone: agendamento.telefonecliente,
          count: 0,
        };
      }
      clienteCount[agendamento.nomeCliente].count += 1;
    }

    return Object.values(clienteCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, limite);
  } catch (error) {
    console.error("[Database] Failed to get frequent clients:", error);
    return [];
  }
}

/**
 * Obter taxa de conclusão de agendamentos
 */
export async function obterTaxaConclusao(): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get completion rate: database not available");
    return 0;
  }

  try {
    const agendamentos_list = await db.select().from(agendamentos);
    const concluidos = agendamentos_list.filter(a => a.status === "concluido");
    
    if (agendamentos_list.length === 0) return 0;
    return (concluidos.length / agendamentos_list.length) * 100;
  } catch (error) {
    console.error("[Database] Failed to get completion rate:", error);
    return 0;
  }
}
