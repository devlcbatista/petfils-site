import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  obterCarrinho,
  adicionarAoCarrinho,
  atualizarQuantidadeCarrinho,
  removerDoCarrinho,
  limparCarrinho,
  calcularTotalCarrinho,
  obterCarrinhoDetalhado,
  finalizarPedido,
  obterProdutos,
  obterProduto,
  obterProdutosRecomendados,
} from "./db-carrinho";

export const carrinhoRouter = router({
  /**
   * Obter carrinho do cliente
   */
  obterCarrinho: protectedProcedure.query(async ({ ctx }) => {
    const clienteId = ctx.user?.id;
    if (!clienteId) {
      throw new Error("Usuário não autenticado");
    }

    const itens = await obterCarrinho(clienteId);
    const total = await calcularTotalCarrinho(clienteId);

    return {
      itens,
      total,
    };
  }),

  /**
   * Obter carrinho detalhado com informações dos produtos
   */
  obterCarrinhoDetalhado: protectedProcedure.query(async ({ ctx }) => {
    const clienteId = ctx.user?.id;
    if (!clienteId) {
      throw new Error("Usuário não autenticado");
    }

    return obterCarrinhoDetalhado(clienteId);
  }),

  /**
   * Adicionar produto ao carrinho
   */
  adicionarAoCarrinho: protectedProcedure
    .input(
      z.object({
        produtoId: z.number(),
        quantidade: z.number().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const clienteId = ctx.user?.id;
      if (!clienteId) {
        throw new Error("Usuário não autenticado");
      }

      try {
        const carrinho = await adicionarAoCarrinho(
          clienteId,
          input.produtoId,
          input.quantidade
        );
        const total = await calcularTotalCarrinho(clienteId);

        return {
          sucesso: true,
          carrinho,
          total,
          mensagem: "Produto adicionado ao carrinho",
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),

  /**
   * Atualizar quantidade de um item no carrinho
   */
  atualizarQuantidade: protectedProcedure
    .input(
      z.object({
        carrinhoId: z.number(),
        novaQuantidade: z.number().min(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const clienteId = ctx.user?.id;
      if (!clienteId) {
        throw new Error("Usuário não autenticado");
      }

      await atualizarQuantidadeCarrinho(
        input.carrinhoId,
        input.novaQuantidade
      );
      const total = await calcularTotalCarrinho(clienteId);

      return {
        sucesso: true,
        total,
        mensagem: "Quantidade atualizada",
      };
    }),

  /**
   * Remover item do carrinho
   */
  removerDoCarrinho: protectedProcedure
    .input(z.object({ carrinhoId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const clienteId = ctx.user?.id;
      if (!clienteId) {
        throw new Error("Usuário não autenticado");
      }

      await removerDoCarrinho(input.carrinhoId);
      const total = await calcularTotalCarrinho(clienteId);

      return {
        sucesso: true,
        total,
        mensagem: "Item removido do carrinho",
      };
    }),

  /**
   * Limpar carrinho
   */
  limparCarrinho: protectedProcedure.mutation(async ({ ctx }) => {
    const clienteId = ctx.user?.id;
    if (!clienteId) {
      throw new Error("Usuário não autenticado");
    }

    await limparCarrinho(clienteId);

    return {
      sucesso: true,
      mensagem: "Carrinho limpo",
    };
  }),

  /**
   * Finalizar pedido
   */
  finalizarPedido: protectedProcedure
    .input(
      z.object({
        endereco: z.string().min(1, "Endereço é obrigatório"),
        observacoes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const clienteId = ctx.user?.id;
      if (!clienteId) {
        throw new Error("Usuário não autenticado");
      }

      try {
        const resultado = await finalizarPedido(
          clienteId,
          input.endereco,
          input.observacoes
        );

        return {
          sucesso: true,
          pedido: resultado,
          mensagem: "Pedido finalizado com sucesso",
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),

  /**
   * Obter lista de produtos
   */
  obterProdutos: publicProcedure
    .input(z.object({ categoria: z.string().optional() }))
    .query(async ({ input }) => {
      return obterProdutos(input.categoria);
    }),

  /**
   * Obter um produto específico
   */
  obterProduto: publicProcedure
    .input(z.object({ produtoId: z.number() }))
    .query(async ({ input }) => {
      return obterProduto(input.produtoId);
    }),

  /**
   * Obter produtos recomendados baseado em um produto
   */
  obterProdutosRecomendados: publicProcedure
    .input(z.object({ produtoId: z.number(), limite: z.number().optional() }))
    .query(async ({ input }) => {
      return obterProdutosRecomendados(input.produtoId, input.limite || 4);
    }),
});
