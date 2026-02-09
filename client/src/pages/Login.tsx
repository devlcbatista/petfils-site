import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const loginMutation = trpc.clientes.login.useMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resultado = await loginMutation.mutateAsync({
        email,
        senha,
      });

      if (resultado.sucesso) {
        // Salvar token e dados do usuário no localStorage
        localStorage.setItem("clienteToken", resultado.token);
        localStorage.setItem("clienteId", resultado.usuario.id.toString());
        localStorage.setItem("clienteNome", resultado.usuario.nome);

        // Redirecionar para perfil do cliente
        setLocation("/minha-conta");
      }
    } catch (error: any) {
      setErro(error.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">🐾</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">PetFils</h1>
          <p className="text-gray-600 mt-2">Acesse sua conta</p>
        </div>

        {/* Card de Login */}
        <Card className="bg-white border-0 shadow-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label htmlFor="senha" className="text-gray-700 font-semibold">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {mostrarSenha ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mensagem de Erro */}
            {erro && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{erro}</div>}

            {/* Botão de Login */}
            <Button
              type="submit"
              disabled={carregando}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Não tem conta?</span>
              </div>
            </div>

            {/* Link para Registro */}
            <Button
              type="button"
              onClick={() => setLocation("/registro")}
              variant="outline"
              className="w-full border-orange-300 text-orange-500 hover:bg-orange-50 font-semibold py-3 rounded-lg transition"
            >
              Criar Conta
            </Button>
          </form>

          {/* Link para Home */}
          <div className="mt-6 text-center">
            <a href="/" className="text-gray-600 hover:text-orange-500 transition text-sm font-semibold">
              ← Voltar para Home
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
