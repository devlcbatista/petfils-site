import { eq, desc } from "drizzle-orm";
import { getDb } from "./db";
import { agendamentos, clientes, pets, InsertAgendamento, Agendamento } from "../drizzle/schema";

/**
 * Criar novo agendamento
 */
export async function criarAgendamento(data: InsertAgendamento): Promise<Agendamento | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create agendamento: database not available");
    return null;
  }

  try {
    const result = await db.insert(agendamentos).values(data);
    const agendamentoId = result[0]?.insertId;
    
    if (agendamentoId) {
      const rows = await db.select().from(agendamentos).where(eq(agendamentos.id, Number(agendamentoId)));
      return rows[0] || null;
    }
    return null;
  } catch (error) {
    console.error("[Database] Failed to create agendamento:", error);
    throw error;
  }
}

/**
 * Obter todos os agendamentos
 */
export async function obterAgendamentos(): Promise<Agendamento[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get agendamentos: database not available");
    return [];
  }

  try {
    return await db.select().from(agendamentos).orderBy(desc(agendamentos.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get agendamentos:", error);
    return [];
  }
}

/**
 * Obter agendamento por ID
 */
export async function obterAgendamentoPorId(id: number): Promise<Agendamento | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get agendamento: database not available");
    return null;
  }

  try {
    const result = await db.select().from(agendamentos).where(eq(agendamentos.id, id));
    return result[0] || null;
  } catch (error) {
    console.error("[Database] Failed to get agendamento:", error);
    return null;
  }
}

/**
 * Atualizar status do agendamento
 */
export async function atualizarStatusAgendamento(id: number, status: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update agendamento: database not available");
    return false;
  }

  try {
    await db.update(agendamentos).set({ status: status as any }).where(eq(agendamentos.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update agendamento:", error);
    return false;
  }
}

/**
 * Deletar agendamento
 */
export async function deletarAgendamento(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete agendamento: database not available");
    return false;
  }

  try {
    await db.delete(agendamentos).where(eq(agendamentos.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete agendamento:", error);
    return false;
  }
}

/**
 * Obter agendamentos pendentes
 */
export async function obterAgendamentosPendentes(): Promise<Agendamento[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get agendamentos: database not available");
    return [];
  }

  try {
    return await db.select().from(agendamentos).where(eq(agendamentos.status, "pendente")).orderBy(desc(agendamentos.dataAgendamento));
  } catch (error) {
    console.error("[Database] Failed to get agendamentos pendentes:", error);
    return [];
  }
}

/**
 * Contar agendamentos por status
 */
export async function contarAgendamentosPorStatus(): Promise<Record<string, number>> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot count agendamentos: database not available");
    return {};
  }

  try {
    const allAgendamentos = await db.select().from(agendamentos);
    const counts: Record<string, number> = {
      pendente: 0,
      confirmado: 0,
      concluido: 0,
      cancelado: 0,
    };

    for (const agendamento of allAgendamentos) {
      counts[agendamento.status]++;
    }

    return counts;
  } catch (error) {
    console.error("[Database] Failed to count agendamentos:", error);
    return {};
  }
}
