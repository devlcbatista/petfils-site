import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import {
  criarUsuarioCliente,
  buscarUsuarioClientePorEmail,
  buscarUsuarioClientePorId,
  verificarSenhaCliente,
  atualizarPerfilCliente,
  alterarSenhaCliente,
  buscarPedidosCliente,
  buscarDetalhePedido,
  obterEstatisticasCliente,
} from "./db-clientes";
import { TRPCError } from "@trpc/server";

/**
 * Schema de validação para login
 */
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

/**
 * Schema de validação para registro
 */
const registroSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  telefone: z.string().optional(),
});

/**
 * Schema de validação para atualizar perfil
 */
const atualizarPerfilSchema = z.object({
  nome: z.string().optional(),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  cep: z.string().optional(),
});

/**
 * Schema de validação para alterar senha
 */
const alterarSenhaSchema = z.object({
  senhaAtual: z.string(),
  novaSenha: z.string().min(6, "Nova senha deve ter no mínimo 6 caracteres"),
});

export const clientesRouter = router({
  /**
   * Registrar novo cliente
   */
  registro: publicProcedure.input(registroSchema).mutation(async ({ input }) => {
    try {
      // Verificar se email já existe
      const usuarioExistente = await buscarUsuarioClientePorEmail(input.email);
      if (usuarioExistente) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email já cadastrado",
        });
      }

      // Criar novo usuário
      await criarUsuarioCliente(input.email, input.senha, input.nome, input.telefone);

      return {
        sucesso: true,
        mensagem: "Conta criada com sucesso!",
      };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Erro ao criar conta",
      });
    }
  }),

  /**
   * Fazer login
   */
  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    try {
      // Buscar usuário
      const usuario = await buscarUsuarioClientePorEmail(input.email);
      if (!usuario) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email ou senha incorretos",
        });
      }

      // Verificar senha
      const senhaValida = verificarSenhaCliente(input.senha, usuario.senha);
      if (!senhaValida) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email ou senha incorretos",
        });
      }

      // Retornar dados do usuário (sem a senha)
      const { senha, ...usuarioSemSenha } = usuario;
      return {
        sucesso: true,
        usuario: usuarioSemSenha,
        token: usuario.id.toString(), // Token simples (em produção, usar JWT)
      };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Erro ao fazer login",
      });
    }
  }),

  /**
   * Obter perfil do cliente
   */
  obterPerfil: publicProcedure.input(z.number()).query(async ({ input: usuarioId }) => {
    try {
      const usuario = await buscarUsuarioClientePorId(usuarioId);
      if (!usuario) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuário não encontrado",
        });
      }

      const { senha, ...usuarioSemSenha } = usuario;
      return usuarioSemSenha;
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Erro ao obter perfil",
      });
    }
  }),

  /**
   * Atualizar perfil do cliente
   */
  atualizarPerfil: publicProcedure
    .input(z.object({ usuarioId: z.number(), dados: atualizarPerfilSchema }))
    .mutation(async ({ input }) => {
      try {
        const usuarioAtualizado = await atualizarPerfilCliente(input.usuarioId, input.dados);
        if (!usuarioAtualizado) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Usuário não encontrado",
          });
        }

        const { senha, ...usuarioSemSenha } = usuarioAtualizado;
        return {
          sucesso: true,
          usuario: usuarioSemSenha,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Erro ao atualizar perfil",
        });
      }
    }),

  /**
   * Alterar senha
   */
  alterarSenha: publicProcedure
    .input(z.object({ usuarioId: z.number(), dados: alterarSenhaSchema }))
    .mutation(async ({ input }) => {
      try {
        await alterarSenhaCliente(input.usuarioId, input.dados.senhaAtual, input.dados.novaSenha);
        return {
          sucesso: true,
          mensagem: "Senha alterada com sucesso!",
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Erro ao alterar senha",
        });
      }
    }),

  /**
   * Listar pedidos do cliente
   */
  listarPedidos: publicProcedure.input(z.number()).query(async ({ input: usuarioId }) => {
    try {
      const pedidos = await buscarPedidosCliente(usuarioId);
      return pedidos;
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Erro ao listar pedidos",
      });
    }
  }),

  /**
   * Obter detalhes de um pedido
   */
  obterDetalhePedido: publicProcedure
    .input(z.object({ pedidoId: z.number(), usuarioId: z.number() }))
    .query(async ({ input }) => {
      try {
        const pedido = await buscarDetalhePedido(input.pedidoId, input.usuarioId);
        if (!pedido) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Pedido não encontrado",
          });
        }

        return pedido;
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Erro ao obter detalhes do pedido",
        });
      }
    }),

  /**
   * Obter estatísticas do cliente
   */
  obterEstatisticas: publicProcedure.input(z.number()).query(async ({ input: usuarioId }) => {
    try {
      const estatisticas = await obterEstatisticasCliente(usuarioId);
      return estatisticas;
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Erro ao obter estatísticas",
      });
    }
  }),
});
