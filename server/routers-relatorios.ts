import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  obterVendasPorPeriodo,
  obterProdutosMaisVendidos,
  obterReceitaPorPeriodo,
  obterReceitaPorCategoria,
  obterEstatisticasVendas,
  obterAgendamentosPorPeriodo,
} from "./db-relatorios";

export const relatoriosRouter = router({
  /**
   * Obter vendas por período
   */
  vendasPorPeriodo: publicProcedure
    .input(z.object({ dias: z.number().default(30) }))
    .query(async ({ input }) => {
      try {
        const vendas = await obterVendasPorPeriodo(input.dias);
        return {
          success: true,
          vendas,
        };
      } catch (error) {
        console.error("Erro ao obter vendas por período:", error);
        return {
          success: false,
          vendas: [],
        };
      }
    }),

  /**
   * Obter produtos mais vendidos
   */
  produtosMaisVendidos: publicProcedure
    .input(z.object({ limite: z.number().default(10) }))
    .query(async ({ input }) => {
      try {
        const produtos = await obterProdutosMaisVendidos(input.limite);
        return {
          success: true,
          produtos,
        };
      } catch (error) {
        console.error("Erro ao obter produtos mais vendidos:", error);
        return {
          success: false,
          produtos: [],
        };
      }
    }),

  /**
   * Obter receita por período
   */
  receitaPorPeriodo: publicProcedure
    .input(z.object({ dias: z.number().default(30) }))
    .query(async ({ input }) => {
      try {
        const receita = await obterReceitaPorPeriodo(input.dias);
        return {
          success: true,
          receita,
        };
      } catch (error) {
        console.error("Erro ao obter receita por período:", error);
        return {
          success: false,
          receita: [],
        };
      }
    }),

  /**
   * Obter receita por categoria
   */
  receitaPorCategoria: publicProcedure
    .input(z.object({ dias: z.number().default(30) }))
    .query(async ({ input }) => {
      try {
        const receita = await obterReceitaPorCategoria(input.dias);
        return {
          success: true,
          receita,
        };
      } catch (error) {
        console.error("Erro ao obter receita por categoria:", error);
        return {
          success: false,
          receita: [],
        };
      }
    }),

  /**
   * Obter estatísticas de vendas gerais
   */
  estatisticasVendas: publicProcedure
    .input(z.object({ dias: z.number().default(30) }))
    .query(async ({ input }) => {
      try {
        const stats = await obterEstatisticasVendas(input.dias);
        return {
          success: !!stats,
          stats,
        };
      } catch (error) {
        console.error("Erro ao obter estatísticas de vendas:", error);
        return {
          success: false,
          stats: null,
        };
      }
    }),

  /**
   * Obter agendamentos por período
   */
  agendamentosPorPeriodo: publicProcedure
    .input(z.object({ dias: z.number().default(30) }))
    .query(async ({ input }) => {
      try {
        const agendamentos = await obterAgendamentosPorPeriodo(input.dias);
        return {
          success: true,
          agendamentos,
        };
      } catch (error) {
        console.error("Erro ao obter agendamentos por período:", error);
        return {
          success: false,
          agendamentos: [],
        };
      }
    }),
});
