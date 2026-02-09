import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { usuariosClientes, pedidos, itensPedido } from "../drizzle/schema";

/**
 * Obter dados completos do cliente
 */
export async function getClientePerfil(clienteId: number) {
  const db = await getDb();
  if (!db) return null;

  const cliente = await db
    .select()
    .from(usuariosClientes)
    .where(eq(usuariosClientes.id, clienteId))
    .limit(1);

  return cliente.length > 0 ? cliente[0] : null;
}

/**
 * Atualizar dados do cliente
 */
export async function atualizarClientePerfil(
  clienteId: number,
  dados: {
    nome?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  }
) {
  const db = await getDb();
  if (!db) return null;

  const updateData: any = {};
  if (dados.nome !== undefined) updateData.nome = dados.nome;
  if (dados.email !== undefined) updateData.email = dados.email;
  if (dados.telefone !== undefined) updateData.telefone = dados.telefone;
  if (dados.endereco !== undefined) updateData.endereco = dados.endereco;
  if (dados.cidade !== undefined) updateData.cidade = dados.cidade;
  if (dados.estado !== undefined) updateData.estado = dados.estado;
  if (dados.cep !== undefined) updateData.cep = dados.cep;
  updateData.updatedAt = new Date();

  await db
    .update(usuariosClientes)
    .set(updateData)
    .where(eq(usuariosClientes.id, clienteId));

  return getClientePerfil(clienteId);
}

/**
 * Obter todos os pedidos do cliente
 */
export async function getPedidosCliente(clienteId: number) {
  const db = await getDb();
  if (!db) return [];

  const pedidosData = await db
    .select()
    .from(pedidos)
    .where(eq(pedidos.usuarioClienteId, clienteId));

  return pedidosData;
}

/**
 * Obter detalhes de um pedido específico com itens
 */
export async function getPedidoDetalhes(pedidoId: number) {
  const db = await getDb();
  if (!db) return null;

  const pedidoData = await db
    .select()
    .from(pedidos)
    .where(eq(pedidos.id, pedidoId))
    .limit(1);

  if (pedidoData.length === 0) return null;

  const itens = await db
    .select()
    .from(itensPedido)
    .where(eq(itensPedido.pedidoId, pedidoId));

  return {
    ...pedidoData[0],
    itens,
  };
}

/**
 * Obter estatísticas do cliente
 */
export async function getEstatisticasCliente(clienteId: number) {
  const db = await getDb();
  if (!db) return null;

  const pedidosData = await db
    .select()
    .from(pedidos)
    .where(eq(pedidos.usuarioClienteId, clienteId));

  const totalPedidos = pedidosData.length;
  const totalGasto = pedidosData.reduce((acc, p) => acc + parseFloat(p.totalPedido || "0"), 0);
  const pedidosConcluidos = pedidosData.filter((p) => p.status === "entregue").length;
  const pedidosPendentes = pedidosData.filter((p) => p.status === "pendente").length;

  return {
    totalPedidos,
    totalGasto,
    pedidosConcluidos,
    pedidosPendentes,
    ultimoPedido: pedidosData[0]?.createdAt || null,
  };
}

/**
 * Alterar senha do cliente
 */
export async function alterarSenhaCliente(clienteId: number, novaSenha: string) {
  const db = await getDb();
  if (!db) return false;

  const crypto = await import("crypto");
  const senhaHash = crypto.createHash("sha256").update(novaSenha).digest("hex");

  await db
    .update(usuariosClientes)
    .set({
      senha: senhaHash,
      updatedAt: new Date(),
    })
    .where(eq(usuariosClientes.id, clienteId));

  return true;
}
