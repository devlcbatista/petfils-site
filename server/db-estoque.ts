import { eq, lte, desc } from "drizzle-orm";
import { getDb } from "./db";
import { produtos, movimentacoesEstoque, alertasEstoque } from "../drizzle/schema";

/**
 * Criar novo produto
 */
export async function criarProduto(data: {
  nome: string;
  descricao?: string;
  categoria: string;
  preco: number;
  estoque: number;
  estoqueMinimo: number;
  fornecedor?: string;
  sku?: string;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create product: database not available");
    return null;
  }

  try {
    const result = await db.insert(produtos).values({
      nome: data.nome,
      descricao: data.descricao,
      categoria: data.categoria,
      preco: data.preco.toString() as any,
      estoque: data.estoque,
      estoqueMinimo: data.estoqueMinimo,
      fornecedor: data.fornecedor,
      sku: data.sku,
      ativo: true,
    });

    const produtoId = result[0]?.insertId;
    if (produtoId) {
      return await obterProduto(produtoId);
    }
    return null;
  } catch (error) {
    console.error("[Database] Failed to create product:", error);
    return null;
  }
}

/**
 * Obter produto por ID
 */
export async function obterProduto(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get product: database not available");
    return null;
  }

  try {
    const result = await db.select().from(produtos).where(eq(produtos.id, id));
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get product:", error);
    return null;
  }
}

/**
 * Listar todos os produtos
 */
export async function listarProdutos() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list products: database not available");
    return [];
  }

  try {
    return await db.select().from(produtos).where(eq(produtos.ativo, true));
  } catch (error) {
    console.error("[Database] Failed to list products:", error);
    return [];
  }
}

/**
 * Obter produtos com estoque baixo
 */
export async function obterProdutosComEstoqueBaixo() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get low stock products: database not available");
    return [];
  }

  try {
    const allProducts = await db.select().from(produtos).where(eq(produtos.ativo, true));
    return allProducts.filter(p => p.estoque <= p.estoqueMinimo);
  } catch (error) {
    console.error("[Database] Failed to get low stock products:", error);
    return [];
  }
}

/**
 * Registrar movimentação de estoque
 */
export async function registrarMovimentacao(data: {
  produtoId: number;
  tipo: "entrada" | "saida" | "ajuste";
  quantidade: number;
  motivo?: string;
  usuarioId?: number;
  notas?: string;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot register movement: database not available");
    return null;
  }

  try {
    // Registrar movimentação
    const result = await db.insert(movimentacoesEstoque).values({
      produtoId: data.produtoId,
      tipo: data.tipo,
      quantidade: data.quantidade,
      motivo: data.motivo,
      usuarioId: data.usuarioId,
      notas: data.notas,
    });

    // Atualizar estoque do produto
    const produto = await obterProduto(data.produtoId);
    if (produto) {
      let novoEstoque = produto.estoque;
      if (data.tipo === "entrada") {
        novoEstoque += data.quantidade;
      } else if (data.tipo === "saida") {
        novoEstoque -= data.quantidade;
      } else if (data.tipo === "ajuste") {
        novoEstoque = data.quantidade;
      }

      await db
        .update(produtos)
        .set({ estoque: novoEstoque })
        .where(eq(produtos.id, data.produtoId));

      // Verificar se precisa criar alerta
      if (novoEstoque <= 0) {
        await criarAlerta(data.produtoId, "fora_de_estoque", novoEstoque, produto.estoqueMinimo);
      } else if (novoEstoque <= produto.estoqueMinimo) {
        await criarAlerta(data.produtoId, "minimo", novoEstoque, produto.estoqueMinimo);
      }
    }

    return result;
  } catch (error) {
    console.error("[Database] Failed to register movement:", error);
    return null;
  }
}

/**
 * Criar alerta de estoque
 */
export async function criarAlerta(
  produtoId: number,
  tipo: "minimo" | "critico" | "fora_de_estoque",
  estoqueAtual: number,
  estoqueMinimo: number
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create alert: database not available");
    return null;
  }

  try {
    // Verificar se já existe alerta não lido para este produto
    const existingAlerts = await db
      .select()
      .from(alertasEstoque)
      .where(eq(alertasEstoque.produtoId, produtoId));

    const unreadAlert = existingAlerts.find(a => !a.lido);
    if (unreadAlert) {
      // Atualizar alerta existente
      return await db
        .update(alertasEstoque)
        .set({
          tipo,
          estoque_atual: estoqueAtual,
          estoque_minimo: estoqueMinimo,
        })
        .where(eq(alertasEstoque.id, unreadAlert.id));
    }

    // Criar novo alerta
    return await db.insert(alertasEstoque).values({
      produtoId,
      tipo,
      estoque_atual: estoqueAtual,
      estoque_minimo: estoqueMinimo,
      lido: false,
    });
  } catch (error) {
    console.error("[Database] Failed to create alert:", error);
    return null;
  }
}

/**
 * Obter alertas não lidos
 */
export async function obterAlertasNaoLidos() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get unread alerts: database not available");
    return [];
  }

  try {
    const alerts = await db
      .select()
      .from(alertasEstoque)
      .where(eq(alertasEstoque.lido, false))
      .orderBy(desc(alertasEstoque.createdAt));

    // Enriquecer com dados do produto
    const enrichedAlerts = await Promise.all(
      alerts.map(async (alert) => {
        const produto = await obterProduto(alert.produtoId);
        return {
          ...alert,
          produto,
        };
      })
    );

    return enrichedAlerts;
  } catch (error) {
    console.error("[Database] Failed to get unread alerts:", error);
    return [];
  }
}

/**
 * Marcar alerta como lido
 */
export async function marcarAlertaComoLido(alertaId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot mark alert as read: database not available");
    return false;
  }

  try {
    await db
      .update(alertasEstoque)
      .set({ lido: true, resolvidoEm: new Date() })
      .where(eq(alertasEstoque.id, alertaId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to mark alert as read:", error);
    return false;
  }
}

/**
 * Obter histórico de movimentações
 */
export async function obterHistoricoMovimentacoes(produtoId?: number, limite: number = 50) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get movement history: database not available");
    return [];
  }

  try {
    let query: any = db.select().from(movimentacoesEstoque);

    if (produtoId) {
      query = query.where(eq(movimentacoesEstoque.produtoId, produtoId));
    }

    return await query.orderBy(desc(movimentacoesEstoque.createdAt)).limit(limite);
  } catch (error) {
    console.error("[Database] Failed to get movement history:", error);
    return [];
  }
}

/**
 * Obter valor total do estoque
 */
export async function obterValorTotalEstoque(): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get total stock value: database not available");
    return 0;
  }

  try {
    const allProducts = await db.select().from(produtos).where(eq(produtos.ativo, true));
    return allProducts.reduce((total, p) => {
      return total + Number(p.preco) * p.estoque;
    }, 0);
  } catch (error) {
    console.error("[Database] Failed to get total stock value:", error);
    return 0;
  }
}

/**
 * Obter estatísticas de estoque
 */
export async function obterEstatisticasEstoque() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get stock statistics: database not available");
    return null;
  }

  try {
    const allProducts = await db.select().from(produtos).where(eq(produtos.ativo, true));
    const produtosComEstoqueBaixo = allProducts.filter(p => p.estoque <= p.estoqueMinimo);
    const produtosSemEstoque = allProducts.filter(p => p.estoque === 0);

    const totalProdutos = allProducts.length;
    const totalItens = allProducts.reduce((sum, p) => sum + p.estoque, 0);
    const valorTotal = await obterValorTotalEstoque();

    const categorias = new Set(allProducts.map(p => p.categoria));
    return {
      totalProdutos,
      totalItens,
      valorTotal,
      produtosComEstoqueBaixo: produtosComEstoqueBaixo.length,
      produtosSemEstoque: produtosSemEstoque.length,
      categorias: categorias.size,
    };
  } catch (error) {
    console.error("[Database] Failed to get stock statistics:", error);
    return null;
  }
}
