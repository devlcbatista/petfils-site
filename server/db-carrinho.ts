import { eq, and, sql } from "drizzle-orm";
import { getDb } from "./db";
import { carrinho, produtos, itensPedido, pedidos } from "../drizzle/schema";

/**
 * Obter todos os itens do carrinho de um cliente
 */
export async function obterCarrinho(usuarioClienteId: number) {
  const db = await getDb();
  if (!db) return [];

  const itens = await db
    .select()
    .from(carrinho)
    .where(eq(carrinho.usuarioClienteId, usuarioClienteId));

  return itens;
}

/**
 * Adicionar item ao carrinho
 */
export async function adicionarAoCarrinho(
  usuarioClienteId: number,
  produtoId: number,
  quantidade: number
) {
  const db = await getDb();
  if (!db) return null;

  // Obter informações do produto
  const produtoData = await db
    .select()
    .from(produtos)
    .where(eq(produtos.id, produtoId))
    .limit(1);

  if (produtoData.length === 0) {
    throw new Error("Produto não encontrado");
  }

  const produto = produtoData[0];

  // Verificar se o item já existe no carrinho
  const itemExistente = await db
    .select()
    .from(carrinho)
    .where(
      and(
        eq(carrinho.usuarioClienteId, usuarioClienteId),
        eq(carrinho.produtoId, produtoId)
      )
    )
    .limit(1);

  if (itemExistente.length > 0) {
    // Atualizar quantidade
    const novaQuantidade = itemExistente[0].quantidade + quantidade;
    await db
      .update(carrinho)
      .set({
        quantidade: novaQuantidade,
        updatedAt: new Date(),
      })
      .where(eq(carrinho.id, itemExistente[0].id));
  } else {
    // Adicionar novo item
    await db.insert(carrinho).values({
      usuarioClienteId,
      produtoId,
      quantidade,
      precoUnitario: produto.preco,
    });
  }

  return obterCarrinho(usuarioClienteId);
}

/**
 * Atualizar quantidade de um item no carrinho
 */
export async function atualizarQuantidadeCarrinho(
  carrinhoId: number,
  novaQuantidade: number
) {
  const db = await getDb();
  if (!db) return null;

  if (novaQuantidade <= 0) {
    // Remover item se quantidade for 0 ou menor
    await db.delete(carrinho).where(eq(carrinho.id, carrinhoId));
  } else {
    await db
      .update(carrinho)
      .set({
        quantidade: novaQuantidade,
        updatedAt: new Date(),
      })
      .where(eq(carrinho.id, carrinhoId));
  }

  return true;
}

/**
 * Remover item do carrinho
 */
export async function removerDoCarrinho(carrinhoId: number) {
  const db = await getDb();
  if (!db) return false;

  await db.delete(carrinho).where(eq(carrinho.id, carrinhoId));
  return true;
}

/**
 * Limpar carrinho de um cliente
 */
export async function limparCarrinho(usuarioClienteId: number) {
  const db = await getDb();
  if (!db) return false;

  await db
    .delete(carrinho)
    .where(eq(carrinho.usuarioClienteId, usuarioClienteId));

  return true;
}

/**
 * Calcular total do carrinho
 */
export async function calcularTotalCarrinho(usuarioClienteId: number) {
  const db = await getDb();
  if (!db) return 0;

  const itens = await db
    .select()
    .from(carrinho)
    .where(eq(carrinho.usuarioClienteId, usuarioClienteId));

  const total = itens.reduce((acc, item) => {
    return acc + parseFloat(item.precoUnitario.toString()) * item.quantidade;
  }, 0);

  return total;
}

/**
 * Obter detalhes do carrinho com informações dos produtos
 */
export async function obterCarrinhoDetalhado(usuarioClienteId: number) {
  const db = await getDb();
  if (!db) return { itens: [], total: 0 };

  const itens = await db
    .select()
    .from(carrinho)
    .where(eq(carrinho.usuarioClienteId, usuarioClienteId));

  const itensDetalhados = await Promise.all(
    itens.map(async (item) => {
      const produtoData = await db
        .select()
        .from(produtos)
        .where(eq(produtos.id, item.produtoId))
        .limit(1);

      return {
        ...item,
        produto: produtoData[0] || null,
        subtotal: parseFloat(item.precoUnitario.toString()) * item.quantidade,
      };
    })
  );

  const total = itensDetalhados.reduce((acc, item) => acc + item.subtotal, 0);

  return {
    itens: itensDetalhados,
    total,
  };
}

/**
 * Finalizar pedido a partir do carrinho
 */
export async function finalizarPedido(
  usuarioClienteId: number,
  endereco: string,
  observacoes?: string
) {
  const db = await getDb();
  if (!db) return null;

  const carrinhoDetalhado = await obterCarrinhoDetalhado(usuarioClienteId);

  if (carrinhoDetalhado.itens.length === 0) {
    throw new Error("Carrinho vazio");
  }

  // Gerar número do pedido
  const numeroPedido = `PED-${Date.now()}`;

  // Criar pedido
  const resultado = await db.insert(pedidos).values({
    usuarioClienteId,
    numeroPedido,
    status: "pendente",
    totalPedido: carrinhoDetalhado.total.toString(),
    endereco,
    observacoes: observacoes || null,
  });

  const pedidoId = (resultado as any).insertId || 1;

  // Adicionar itens do carrinho ao pedido
  for (const item of carrinhoDetalhado.itens) {
    await db.insert(itensPedido).values({
      pedidoId: pedidoId as number,
      produtoId: item.produtoId,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario,
      subtotal: (parseFloat(item.precoUnitario.toString()) * item.quantidade).toString(),
    });
  }

  // Limpar carrinho
  await limparCarrinho(usuarioClienteId);

  return {
    pedidoId,
    numeroPedido,
    total: carrinhoDetalhado.total,
  };
}

/**
 * Obter todos os produtos disponíveis
 */
export async function obterProdutos(categoria?: string) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(produtos).where(eq(produtos.ativo, true));

  if (categoria) {
    query = db
      .select()
      .from(produtos)
      .where(and(eq(produtos.ativo, true), eq(produtos.categoria, categoria)));
  }

  return query;
}

/**
 * Obter um produto específico
 */
export async function obterProduto(produtoId: number) {
  const db = await getDb();
  if (!db) return null;

  const resultado = await db
    .select()
    .from(produtos)
    .where(eq(produtos.id, produtoId))
    .limit(1);

  return resultado.length > 0 ? resultado[0] : null;
}

/**
 * Obter produtos recomendados baseado em um produto específico
 * Retorna produtos da mesma categoria e complementares
 */
export async function obterProdutosRecomendados(produtoId: number, limite: number = 4) {
  const db = await getDb();
  if (!db) return [];

  // Obter o produto atual para saber a categoria
  const produtoAtual = await obterProduto(produtoId);
  if (!produtoAtual) return [];

  // Obter produtos da mesma categoria (excluindo o produto atual)
  const recomendados = await db
    .select()
    .from(produtos)
    .where(
      and(
        eq(produtos.ativo, true),
        eq(produtos.categoria, produtoAtual.categoria),
        sql`${produtos.id} != ${produtoId}`
      )
    )
    .limit(limite);

  return recomendados;
}
