import { eq, and } from "drizzle-orm";
import { usuariosClientes, pedidos, itensPedido, produtos } from "../drizzle/schema";
import { getDb } from "./db";
import crypto from "crypto";

/**
 * Hash de senha usando SHA-256
 */
function hashSenha(senha: string): string {
  return crypto.createHash("sha256").update(senha).digest("hex");
}

/**
 * Verificar senha
 */
function verificarSenha(senhaInformada: string, senhaHash: string): boolean {
  return hashSenha(senhaInformada) === senhaHash;
}

/**
 * Criar novo usuário cliente
 */
export async function criarUsuarioCliente(email: string, senha: string, nome: string, telefone?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Hash da senha
  const senhaHash = hashSenha(senha);

  const result = await db.insert(usuariosClientes).values({
    email,
    senha: senhaHash,
    nome,
    telefone,
  });

  return result;
}

/**
 * Buscar usuário cliente por email
 */
export async function buscarUsuarioClientePorEmail(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const resultado = await db.select().from(usuariosClientes).where(eq(usuariosClientes.email, email)).limit(1);
  return resultado.length > 0 ? resultado[0] : null;
}

/**
 * Buscar usuário cliente por ID
 */
export async function buscarUsuarioClientePorId(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const resultado = await db.select().from(usuariosClientes).where(eq(usuariosClientes.id, id)).limit(1);
  return resultado.length > 0 ? resultado[0] : null;
}

/**
 * Verificar senha do cliente
 */
export function verificarSenhaCliente(senhaInformada: string, senhaHash: string): boolean {
  return verificarSenha(senhaInformada, senhaHash);
}

/**
 * Atualizar perfil do cliente
 */
export async function atualizarPerfilCliente(
  id: number,
  dados: {
    nome?: string;
    telefone?: string;
    endereco?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const atualizacoes: any = {};
  if (dados.nome) atualizacoes.nome = dados.nome;
  if (dados.telefone) atualizacoes.telefone = dados.telefone;
  if (dados.endereco) atualizacoes.endereco = dados.endereco;
  if (dados.cidade) atualizacoes.cidade = dados.cidade;
  if (dados.estado) atualizacoes.estado = dados.estado;
  if (dados.cep) atualizacoes.cep = dados.cep;

  if (Object.keys(atualizacoes).length === 0) {
    return null;
  }

  await db.update(usuariosClientes).set(atualizacoes).where(eq(usuariosClientes.id, id));
  return await buscarUsuarioClientePorId(id);
}

/**
 * Alterar senha do cliente
 */
export async function alterarSenhaCliente(id: number, senhaAtual: string, novaSenha: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const usuario = await buscarUsuarioClientePorId(id);
  if (!usuario) throw new Error("Usuário não encontrado");

  // Verificar senha atual
  const senhaValida = await verificarSenhaCliente(senhaAtual, usuario.senha);
  if (!senhaValida) throw new Error("Senha atual incorreta");

  // Hash da nova senha
  const novaSenhaHash = hashSenha(novaSenha);

  await db.update(usuariosClientes).set({ senha: novaSenhaHash }).where(eq(usuariosClientes.id, id));
  return true;
}

/**
 * Buscar todos os pedidos do cliente
 */
export async function buscarPedidosCliente(usuarioClienteId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const resultado = await db.select().from(pedidos).where(eq(pedidos.usuarioClienteId, usuarioClienteId));
  return resultado;
}

/**
 * Buscar detalhes de um pedido específico
 */
export async function buscarDetalhePedido(pedidoId: number, usuarioClienteId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const pedido = await db
    .select()
    .from(pedidos)
    .where(and(eq(pedidos.id, pedidoId), eq(pedidos.usuarioClienteId, usuarioClienteId)))
    .limit(1);

  if (pedido.length === 0) return null;

  // Buscar itens do pedido
  const itens = await db.select().from(itensPedido).where(eq(itensPedido.pedidoId, pedidoId));

  // Buscar detalhes dos produtos
  const itensComProdutos = await Promise.all(
    itens.map(async (item) => {
      const produto = await db.select().from(produtos).where(eq(produtos.id, item.produtoId)).limit(1);
      return {
        ...item,
        produto: produto[0] || null,
      };
    })
  );

  return {
    ...pedido[0],
    itens: itensComProdutos,
  };
}

/**
 * Criar novo pedido
 */
export async function criarPedido(
  usuarioClienteId: number,
  totalPedido: number,
  endereco: string,
  observacoes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Gerar número único do pedido
  const numeroPedido = `PED-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const resultado = await db.insert(pedidos).values({
    usuarioClienteId: usuarioClienteId,
    numeroPedido: numeroPedido,
    totalPedido: totalPedido.toString(),
    endereco: endereco,
    observacoes: observacoes,
    status: "pendente",
  });

  return resultado;
}

/**
 * Adicionar item ao pedido
 */
export async function adicionarItemPedido(
  pedidoId: number,
  produtoId: number,
  quantidade: number,
  precoUnitario: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const subtotal = quantidade * precoUnitario;

  const resultado = await db.insert(itensPedido).values({
    pedidoId: pedidoId,
    produtoId: produtoId,
    quantidade: quantidade,
    precoUnitario: precoUnitario.toString(),
    subtotal: subtotal.toString(),
  });

  return resultado;
}

/**
 * Atualizar status do pedido
 */
export async function atualizarStatusPedido(pedidoId: number, novoStatus: "pendente" | "confirmado" | "enviado" | "entregue" | "cancelado") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(pedidos).set({ status: novoStatus }).where(eq(pedidos.id, pedidoId));
  return true;
}

/**
 * Cancelar pedido
 */
export async function cancelarPedido(pedidoId: number, usuarioClienteId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const pedido = await db
    .select()
    .from(pedidos)
    .where(and(eq(pedidos.id, pedidoId), eq(pedidos.usuarioClienteId, usuarioClienteId)))
    .limit(1);

  if (pedido.length === 0) throw new Error("Pedido não encontrado");
  if (pedido[0].status === "entregue") throw new Error("Não é possível cancelar um pedido entregue");

  await db.update(pedidos).set({ status: "cancelado" }).where(eq(pedidos.id, pedidoId));
  return true;
}

/**
 * Obter estatísticas do cliente
 */
export async function obterEstatisticasCliente(usuarioClienteId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const todosPedidos = await db.select().from(pedidos).where(eq(pedidos.usuarioClienteId, usuarioClienteId));

  const totalPedidos = todosPedidos.length;
  const totalGasto = todosPedidos.reduce((acc, p) => acc + parseFloat(p.totalPedido.toString()), 0);
  const pedidosEntregues = todosPedidos.filter((p) => p.status === "entregue").length;
  const pedidosPendentes = todosPedidos.filter((p) => p.status === "pendente").length;

  return {
    totalPedidos,
    totalGasto,
    pedidosEntregues,
    pedidosPendentes,
  };
}
