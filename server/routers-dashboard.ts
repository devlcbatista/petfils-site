import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  obterEstatisticasGerais,
  calcularReceitaTotal,
  calcularReceitaPorPeriodo,
  obterServicoMaisPopular,
  obterReceitaPorServico,
  obterAgendamentosRecentes,
  obterClientesMaisFrequentes,
  obterTaxaConclusao,
} from "./db-dashboard";

export const dashboardRouter = router({
  /**
   * Obter estatísticas gerais
   */
  estatisticas: publicProcedure.query(async () => {
    try {
      const stats = await obterEstatisticasGerais();
      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      console.error("Erro ao obter estatísticas:", error);
      return {
        success: false,
        data: null,
      };
    }
  }),

  /**
   * Obter receita total
   */
  receitaTotal: publicProcedure.query(async () => {
    try {
      const receita = await calcularReceitaTotal();
      return {
        success: true,
        receita,
      };
    } catch (error) {
      console.error("Erro ao calcular receita total:", error);
      return {
        success: false,
        receita: 0,
      };
    }
  }),

  /**
   * Obter receita por período
   */
  receitaPorPeriodo: publicProcedure
    .input(
      z.object({
        dataInicio: z.date(),
        dataFim: z.date(),
      })
    )
    .query(async ({ input }) => {
      try {
        const receita = await calcularReceitaPorPeriodo(input.dataInicio, input.dataFim);
        return {
          success: true,
          receita,
        };
      } catch (error) {
        console.error("Erro ao calcular receita por período:", error);
        return {
          success: false,
          receita: 0,
        };
      }
    }),

  /**
   * Obter serviço mais popular
   */
  servicoPopular: publicProcedure.query(async () => {
    try {
      const servico = await obterServicoMaisPopular();
      return {
        success: true,
        servico,
      };
    } catch (error) {
      console.error("Erro ao obter serviço popular:", error);
      return {
        success: false,
        servico: null,
      };
    }
  }),

  /**
   * Obter receita por serviço
   */
  receitaPorServico: publicProcedure.query(async () => {
    try {
      const receita = await obterReceitaPorServico();
      return {
        success: true,
        receita,
      };
    } catch (error) {
      console.error("Erro ao obter receita por serviço:", error);
      return {
        success: false,
        receita: [],
      };
    }
  }),

  /**
   * Obter agendamentos recentes
   */
  agendamentosRecentes: publicProcedure
    .input(z.object({ limite: z.number().default(10) }))
    .query(async ({ input }) => {
      try {
        const agendamentos = await obterAgendamentosRecentes(input.limite);
        return {
          success: true,
          agendamentos,
        };
      } catch (error) {
        console.error("Erro ao obter agendamentos recentes:", error);
        return {
          success: false,
          agendamentos: [],
        };
      }
    }),

  /**
   * Obter clientes mais frequentes
   */
  clientesFrequentes: publicProcedure
    .input(z.object({ limite: z.number().default(10) }))
    .query(async ({ input }) => {
      try {
        const clientes = await obterClientesMaisFrequentes(input.limite);
        return {
          success: true,
          clientes,
        };
      } catch (error) {
        console.error("Erro ao obter clientes frequentes:", error);
        return {
          success: false,
          clientes: [],
        };
      }
    }),

  /**
   * Obter taxa de conclusão
   */
  taxaConclusao: publicProcedure.query(async () => {
    try {
      const taxa = await obterTaxaConclusao();
      return {
        success: true,
        taxa,
      };
    } catch (error) {
      console.error("Erro ao obter taxa de conclusão:", error);
      return {
        success: false,
        taxa: 0,
      };
    }
  }),
});
