import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { criarAgendamento, obterAgendamentos, obterAgendamentosPendentes, contarAgendamentosPorStatus, atualizarStatusAgendamento, deletarAgendamento } from "./db-agendamentos";
import { dashboardRouter } from "./routers-dashboard";
import { estoqueRouter } from "./routers-estoque";

// Schema de validação para agendamento
const agendamentoSchema = z.object({
  clienteId: z.number().optional().default(0),
  petId: z.number().optional(),
  nomeCliente: z.string().min(1, "Nome do cliente é obrigatório"),
  telefonecliente: z.string().min(1, "Telefone é obrigatório"),
  nomePet: z.string().min(1, "Nome do pet é obrigatório"),
  tipoPet: z.string().min(1, "Tipo de pet é obrigatório"),
  servico: z.string().min(1, "Serviço é obrigatório"),
  dataAgendamento: z.date().optional(),
  observacoes: z.string().optional(),
  status: z.enum(["pendente", "confirmado", "concluido", "cancelado"]).default("pendente"),
  enviouWhatsApp: z.boolean().default(false),
});

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  dashboard: dashboardRouter,
  estoque: estoqueRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  agendamentos: router({
    /**
     * Criar novo agendamento
     */
    criar: publicProcedure
      .input(agendamentoSchema)
      .mutation(async ({ input }) => {
        try {
          const agendamentoData = {
            ...input,
            clienteId: input.clienteId || 0,
            dataAgendamento: input.dataAgendamento || new Date(),
          };
          const agendamento = await criarAgendamento(agendamentoData as any);
          return {
            success: true,
            agendamento,
            message: "Agendamento criado com sucesso!",
          };
        } catch (error) {
          console.error("Erro ao criar agendamento:", error);
          return {
            success: false,
            message: "Erro ao criar agendamento",
          };
        }
      }),

    /**
     * Listar todos os agendamentos
     */
    listar: publicProcedure.query(async () => {
      try {
        const agendamentos = await obterAgendamentos();
        return {
          success: true,
          agendamentos,
        };
      } catch (error) {
        console.error("Erro ao listar agendamentos:", error);
        return {
          success: false,
          agendamentos: [],
        };
      }
    }),

    /**
     * Obter agendamentos pendentes
     */
    obterPendentes: publicProcedure.query(async () => {
      try {
        const agendamentos = await obterAgendamentosPendentes();
        return {
          success: true,
          agendamentos,
        };
      } catch (error) {
        console.error("Erro ao obter agendamentos pendentes:", error);
        return {
          success: false,
          agendamentos: [],
        };
      }
    }),

    /**
     * Contar agendamentos por status
     */
    contar: publicProcedure.query(async () => {
      try {
        const counts = await contarAgendamentosPorStatus();
        return {
          success: true,
          counts,
        };
      } catch (error) {
        console.error("Erro ao contar agendamentos:", error);
        return {
          success: false,
          counts: {},
        };
      }
    }),

    /**
     * Atualizar status do agendamento
     */
    atualizarStatus: publicProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pendente", "confirmado", "concluido", "cancelado"]),
      }))
      .mutation(async ({ input }) => {
        try {
          const success = await atualizarStatusAgendamento(input.id, input.status);
          return {
            success,
            message: success ? "Status atualizado com sucesso" : "Erro ao atualizar status",
          };
        } catch (error) {
          console.error("Erro ao atualizar status:", error);
          return {
            success: false,
            message: "Erro ao atualizar status",
          };
        }
      }),

    /**
     * Deletar agendamento
     */
    deletar: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        try {
          const success = await deletarAgendamento(input.id);
          return {
            success,
            message: success ? "Agendamento deletado com sucesso" : "Erro ao deletar agendamento",
          };
        } catch (error) {
          console.error("Erro ao deletar agendamento:", error);
          return {
            success: false,
            message: "Erro ao deletar agendamento",
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
