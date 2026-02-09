import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  criarProduto,
  obterProduto,
  listarProdutos,
  obterProdutosComEstoqueBaixo,
  registrarMovimentacao,
  obterAlertasNaoLidos,
  marcarAlertaComoLido,
  obterHistoricoMovimentacoes,
  obterValorTotalEstoque,
  obterEstatisticasEstoque,
} from "./db-estoque";

export const estoqueRouter = router({
  /**
   * Criar novo produto
   */
  criarProduto: publicProcedure
    .input(
      z.object({
        nome: z.string().min(1, "Nome é obrigatório"),
        descricao: z.string().optional(),
        categoria: z.string().min(1, "Categoria é obrigatória"),
        preco: z.number().min(0, "Preço não pode ser negativo"),
        estoque: z.number().min(0, "Estoque não pode ser negativo"),
        estoqueMinimo: z.number().min(0, "Estoque mínimo não pode ser negativo"),
        fornecedor: z.string().optional(),
        sku: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const produto = await criarProduto(input);
        return {
          success: !!produto,
          produto,
          message: produto ? "Produto criado com sucesso" : "Erro ao criar produto",
        };
      } catch (error) {
        console.error("Erro ao criar produto:", error);
        return {
          success: false,
          produto: null,
          message: "Erro ao criar produto",
        };
      }
    }),

  /**
   * Listar todos os produtos
   */
  listar: publicProcedure.query(async () => {
    try {
      const produtos = await listarProdutos();
      return {
        success: true,
        produtos,
      };
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      return {
        success: false,
        produtos: [],
      };
    }
  }),

  /**
   * Obter produtos com estoque baixo
   */
  obterComEstoqueBaixo: publicProcedure.query(async () => {
    try {
      const produtos = await obterProdutosComEstoqueBaixo();
      return {
        success: true,
        produtos,
      };
    } catch (error) {
      console.error("Erro ao obter produtos com estoque baixo:", error);
      return {
        success: false,
        produtos: [],
      };
    }
  }),

  /**
   * Registrar movimentação de estoque
   */
  registrarMovimentacao: publicProcedure
    .input(
      z.object({
        produtoId: z.number(),
        tipo: z.enum(["entrada", "saida", "ajuste"]),
        quantidade: z.number().min(1, "Quantidade deve ser maior que 0"),
        motivo: z.string().optional(),
        usuarioId: z.number().optional(),
        notas: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await registrarMovimentacao(input);
        return {
          success: !!result,
          message: result ? "Movimentação registrada com sucesso" : "Erro ao registrar movimentação",
        };
      } catch (error) {
        console.error("Erro ao registrar movimentação:", error);
        return {
          success: false,
          message: "Erro ao registrar movimentação",
        };
      }
    }),

  /**
   * Obter alertas não lidos
   */
  obterAlertas: publicProcedure.query(async () => {
    try {
      const alertas = await obterAlertasNaoLidos();
      return {
        success: true,
        alertas,
        totalAlertas: alertas.length,
      };
    } catch (error) {
      console.error("Erro ao obter alertas:", error);
      return {
        success: false,
        alertas: [],
        totalAlertas: 0,
      };
    }
  }),

  /**
   * Marcar alerta como lido
   */
  marcarAlertaComoLido: publicProcedure
    .input(z.object({ alertaId: z.number() }))
    .mutation(async ({ input }) => {
      try {
        const success = await marcarAlertaComoLido(input.alertaId);
        return {
          success,
          message: success ? "Alerta marcado como lido" : "Erro ao marcar alerta",
        };
      } catch (error) {
        console.error("Erro ao marcar alerta como lido:", error);
        return {
          success: false,
          message: "Erro ao marcar alerta",
        };
      }
    }),

  /**
   * Obter histórico de movimentações
   */
  obterHistorico: publicProcedure
    .input(
      z.object({
        produtoId: z.number().optional(),
        limite: z.number().default(50),
      })
    )
    .query(async ({ input }) => {
      try {
        const movimentacoes = await obterHistoricoMovimentacoes(input.produtoId, input.limite);
        return {
          success: true,
          movimentacoes,
        };
      } catch (error) {
        console.error("Erro ao obter histórico:", error);
        return {
          success: false,
          movimentacoes: [],
        };
      }
    }),

  /**
   * Obter valor total do estoque
   */
  obterValorTotal: publicProcedure.query(async () => {
    try {
      const valorTotal = await obterValorTotalEstoque();
      return {
        success: true,
        valorTotal,
      };
    } catch (error) {
      console.error("Erro ao obter valor total:", error);
      return {
        success: false,
        valorTotal: 0,
      };
    }
  }),

  /**
   * Obter estatísticas de estoque
   */
  obterEstatisticas: publicProcedure.query(async () => {
    try {
      const stats = await obterEstatisticasEstoque();
      return {
        success: !!stats,
        stats,
      };
    } catch (error) {
      console.error("Erro ao obter estatísticas:", error);
      return {
        success: false,
        stats: null,
      };
    }
  }),
});
