import { eq, gte, lte, desc, sql } from "drizzle-orm";
import { getDb } from "./db";
import { movimentacoesEstoque, produtos, agendamentos } from "../drizzle/schema";

/**
 * Obter vendas por período (últimos 30 dias)
 */
export async function obterVendasPorPeriodo(dias: number = 30) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get sales by period: database not available");
    return [];
  }

  try {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - dias);

    const movimentacoes = await db
      .select()
      .from(movimentacoesEstoque)
      .where(
        gte(movimentacoesEstoque.createdAt, dataInicio)
      );

    // Agrupar por data
    const vendasPorData: Record<string, { data: string; vendas: number; quantidade: number }> = {};

    movimentacoes.forEach((mov) => {
      const data = new Date(mov.createdAt).toLocaleDateString("pt-BR");
      if (!vendasPorData[data]) {
        vendasPorData[data] = { data, vendas: 0, quantidade: 0 };
      }
      if (mov.tipo === "saida") {
        vendasPorData[data].vendas += 1;
        vendasPorData[data].quantidade += mov.quantidade;
      }
    });

    return Object.values(vendasPorData).sort((a, b) => {
      const [diaA, mesA, anoA] = a.data.split("/").map(Number);
      const [diaB, mesB, anoB] = b.data.split("/").map(Number);
      return new Date(anoA, mesA - 1, diaA).getTime() - new Date(anoB, mesB - 1, diaB).getTime();
    });
  } catch (error) {
    console.error("[Database] Failed to get sales by period:", error);
    return [];
  }
}

/**
 * Obter produtos mais vendidos
 */
export async function obterProdutosMaisVendidos(limite: number = 10) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get best sellers: database not available");
    return [];
  }

  try {
    const movimentacoes = await db
      .select()
      .from(movimentacoesEstoque)
      .where(eq(movimentacoesEstoque.tipo, "saida"));

    // Agrupar por produto
    const vendas: Record<number, { produtoId: number; quantidade: number; vendas: number }> = {};

    movimentacoes.forEach((mov) => {
      if (!vendas[mov.produtoId]) {
        vendas[mov.produtoId] = { produtoId: mov.produtoId, quantidade: 0, vendas: 0 };
      }
      vendas[mov.produtoId].quantidade += mov.quantidade;
      vendas[mov.produtoId].vendas += 1;
    });

    // Enriquecer com dados do produto
    const produtosMaisVendidos = await Promise.all(
      Object.values(vendas)
        .sort((a, b) => b.quantidade - a.quantidade)
        .slice(0, limite)
        .map(async (venda) => {
          const produto = await obterProduto(venda.produtoId);
          return {
            ...venda,
            produto,
            receita: produto ? Number(produto.preco) * venda.quantidade : 0,
          };
        })
    );

    return produtosMaisVendidos;
  } catch (error) {
    console.error("[Database] Failed to get best sellers:", error);
    return [];
  }
}

/**
 * Obter receita por período
 */
export async function obterReceitaPorPeriodo(dias: number = 30) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get revenue by period: database not available");
    return [];
  }

  try {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - dias);

    const movimentacoes = await db
      .select()
      .from(movimentacoesEstoque)
      .where(gte(movimentacoesEstoque.createdAt, dataInicio));

    // Agrupar por data e calcular receita
    const receitaPorData: Record<string, { data: string; receita: number; quantidade: number }> = {};

    for (const mov of movimentacoes) {
      if (mov.tipo === "saida") {
        const data = new Date(mov.createdAt).toLocaleDateString("pt-BR");
        const produto = await obterProduto(mov.produtoId);

        if (!receitaPorData[data]) {
          receitaPorData[data] = { data, receita: 0, quantidade: 0 };
        }

        if (produto) {
          receitaPorData[data].receita += Number(produto.preco) * mov.quantidade;
          receitaPorData[data].quantidade += mov.quantidade;
        }
      }
    }

    return Object.values(receitaPorData)
      .sort((a, b) => {
        const [diaA, mesA, anoA] = a.data.split("/").map(Number);
        const [diaB, mesB, anoB] = b.data.split("/").map(Number);
        return new Date(anoA, mesA - 1, diaA).getTime() - new Date(anoB, mesB - 1, diaB).getTime();
      });
  } catch (error) {
    console.error("[Database] Failed to get revenue by period:", error);
    return [];
  }
}

/**
 * Obter receita por categoria
 */
export async function obterReceitaPorCategoria(dias: number = 30) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get revenue by category: database not available");
    return [];
  }

  try {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - dias);

    const movimentacoes = await db
      .select()
      .from(movimentacoesEstoque)
      .where(gte(movimentacoesEstoque.createdAt, dataInicio));

    // Agrupar por categoria
    const receitaPorCategoria: Record<string, { categoria: string; receita: number; quantidade: number }> = {};

    for (const mov of movimentacoes) {
      if (mov.tipo === "saida") {
        const produto = await obterProduto(mov.produtoId);

        if (produto) {
          const categoria = produto.categoria;
          if (!receitaPorCategoria[categoria]) {
            receitaPorCategoria[categoria] = { categoria, receita: 0, quantidade: 0 };
          }
          receitaPorCategoria[categoria].receita += Number(produto.preco) * mov.quantidade;
          receitaPorCategoria[categoria].quantidade += mov.quantidade;
        }
      }
    }

    return Object.values(receitaPorCategoria).sort((a, b) => b.receita - a.receita);
  } catch (error) {
    console.error("[Database] Failed to get revenue by category:", error);
    return [];
  }
}

/**
 * Obter estatísticas de vendas gerais
 */
export async function obterEstatisticasVendas(dias: number = 30) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get sales statistics: database not available");
    return null;
  }

  try {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - dias);

    const movimentacoes = await db
      .select()
      .from(movimentacoesEstoque)
      .where(gte(movimentacoesEstoque.createdAt, dataInicio));

    let totalVendas = 0;
    let totalQuantidade = 0;
    let totalReceita = 0;
    let totalEntradas = 0;

    for (const mov of movimentacoes) {
      if (mov.tipo === "saida") {
        totalVendas += 1;
        totalQuantidade += mov.quantidade;
        const produto = await obterProduto(mov.produtoId);
        if (produto) {
          totalReceita += Number(produto.preco) * mov.quantidade;
        }
      } else if (mov.tipo === "entrada") {
        totalEntradas += mov.quantidade;
      }
    }

    const ticketMedio = totalVendas > 0 ? totalReceita / totalVendas : 0;
    const vendiasPorDia = totalVendas / dias;

    return {
      totalVendas,
      totalQuantidade,
      totalReceita,
      totalEntradas,
      ticketMedio,
      vendiasPorDia,
      periodo: `Últimos ${dias} dias`,
    };
  } catch (error) {
    console.error("[Database] Failed to get sales statistics:", error);
    return null;
  }
}

/**
 * Obter agendamentos por período
 */
export async function obterAgendamentosPorPeriodo(dias: number = 30) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get appointments by period: database not available");
    return [];
  }

  try {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - dias);

    const agendamentosData = await db
      .select()
      .from(agendamentos)
      .where(gte(agendamentos.createdAt, dataInicio));

    // Agrupar por data
    const agendamentosPorData: Record<string, { data: string; total: number; concluidos: number; pendentes: number }> = {};

    agendamentosData.forEach((agend) => {
      const data = new Date(agend.createdAt).toLocaleDateString("pt-BR");
      if (!agendamentosPorData[data]) {
        agendamentosPorData[data] = { data, total: 0, concluidos: 0, pendentes: 0 };
      }
      agendamentosPorData[data].total += 1;
      if (agend.status === "concluido") {
        agendamentosPorData[data].concluidos += 1;
      } else if (agend.status === "pendente") {
        agendamentosPorData[data].pendentes += 1;
      }
    });

    return Object.values(agendamentosPorData).sort((a, b) => {
      const [diaA, mesA, anoA] = a.data.split("/").map(Number);
      const [diaB, mesB, anoB] = b.data.split("/").map(Number);
      return new Date(anoA, mesA - 1, diaA).getTime() - new Date(anoB, mesB - 1, diaB).getTime();
    });
  } catch (error) {
    console.error("[Database] Failed to get appointments by period:", error);
    return [];
  }
}

/**
 * Helper para obter produto por ID
 */
async function obterProduto(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(produtos).where(eq(produtos.id, id));
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get product:", error);
    return null;
  }
}
