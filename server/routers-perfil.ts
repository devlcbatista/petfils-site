import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import {
  getClientePerfil,
  atualizarClientePerfil,
  getPedidosCliente,
  getPedidoDetalhes,
  getEstatisticasCliente,
  alterarSenhaCliente,
} from "./db-perfil";

export const perfilRouter = router({
  /**
   * Obter dados do perfil do cliente
   */
  obterPerfil: protectedProcedure.query(async ({ ctx }) => {
    const clienteId = ctx.user?.id;
    if (!clienteId) {
      throw new Error("Usuário não autenticado");
    }

    const perfil = await getClientePerfil(clienteId);
    return perfil || null;
  }),

  /**
   * Atualizar dados do perfil
   */
  atualizarPerfil: protectedProcedure
    .input(
      z.object({
        nome: z.string().optional(),
        email: z.string().email().optional(),
        telefone: z.string().optional(),
        endereco: z.string().optional(),
        cidade: z.string().optional(),
        estado: z.string().optional(),
        cep: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const clienteId = ctx.user?.id;
      if (!clienteId) {
        throw new Error("Usuário não autenticado");
      }

      const perfil = await atualizarClientePerfil(clienteId, input);
      return {
        sucesso: true,
        perfil,
      };
    }),

  /**
   * Obter todos os pedidos do cliente
   */
  obterPedidos: protectedProcedure.query(async ({ ctx }) => {
    const clienteId = ctx.user?.id;
    if (!clienteId) {
      throw new Error("Usuário não autenticado");
    }

    const pedidos = await getPedidosCliente(clienteId);
    return pedidos;
  }),

  /**
   * Obter detalhes de um pedido específico
   */
  obterPedidoDetalhes: protectedProcedure
    .input(z.object({ pedidoId: z.number() }))
    .query(async ({ ctx, input }) => {
      const clienteId = ctx.user?.id;
      if (!clienteId) {
        throw new Error("Usuário não autenticado");
      }

      const pedido = await getPedidoDetalhes(input.pedidoId);

      // Verificar se o pedido pertence ao cliente
      if (pedido && pedido.usuarioClienteId !== clienteId) {
        throw new Error("Acesso negado");
      }

      return pedido;
    }),

  /**
   * Obter estatísticas do cliente
   */
  obterEstatisticas: protectedProcedure.query(async ({ ctx }) => {
    const clienteId = ctx.user?.id;
    if (!clienteId) {
      throw new Error("Usuário não autenticado");
    }

    const stats = await getEstatisticasCliente(clienteId);
    return stats;
  }),

  /**
   * Alterar senha do cliente
   */
  alterarSenha: protectedProcedure
    .input(
      z.object({
        senhaAtual: z.string(),
        novaSenha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
        confirmarSenha: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const clienteId = ctx.user?.id;
      if (!clienteId) {
        throw new Error("Usuário não autenticado");
      }

      if (input.novaSenha !== input.confirmarSenha) {
        throw new Error("As senhas não conferem");
      }

      // Verificar senha atual
      const cliente = await getClientePerfil(clienteId);
      if (!cliente) {
        throw new Error("Cliente não encontrado");
      }

      const crypto = await import("crypto");
      const senhaAtualHash = crypto
        .createHash("sha256")
        .update(input.senhaAtual)
        .digest("hex");

      if (cliente.senha !== senhaAtualHash) {
        throw new Error("Senha atual incorreta");
      }

      // Alterar senha
      await alterarSenhaCliente(clienteId, input.novaSenha);

      return {
        sucesso: true,
        mensagem: "Senha alterada com sucesso",
      };
    }),
});
