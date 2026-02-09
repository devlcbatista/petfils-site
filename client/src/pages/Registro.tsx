import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Registro() {
  const [, setLocation] = useLocation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const registroMutation = trpc.clientes.registro.useMutation();

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);

    // Validações
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos obrigatórios");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não conferem");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    setCarregando(true);

    try {
      const resultado = await registroMutation.mutateAsync({
        nome,
        email,
        senha,
        telefone: telefone || undefined,
      });

      if (resultado.sucesso) {
        setSucesso(true);
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          setLocation("/login");
        }, 2000);
      }
    } catch (error: any) {
      setErro(error.message || "Erro ao criar conta. Tente novamente.");
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
          <p className="text-gray-600 mt-2">Crie sua conta</p>
        </div>

        {/* Card de Registro */}
        <Card className="bg-white border-0 shadow-lg p-8">
          {sucesso ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Conta Criada!</h2>
              <p className="text-gray-600">Sua conta foi criada com sucesso. Redirecionando para login...</p>
            </div>
          ) : (
            <form onSubmit={handleRegistro} className="space-y-4">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-gray-700 font-semibold">
                  Nome Completo *
                </Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold">
                  Email *
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

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-gray-700 font-semibold">
                  Telefone (Opcional)
                </Label>
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="(27) 99999-9999"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="senha" className="text-gray-700 font-semibold">
                  Senha *
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

              {/* Confirmar Senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha" className="text-gray-700 font-semibold">
                  Confirmar Senha *
                </Label>
                <Input
                  id="confirmarSenha"
                  type="password"
                  placeholder="••••••••"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              {/* Mensagem de Erro */}
              {erro && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{erro}</div>}

              {/* Botão de Registro */}
              <Button
                type="submit"
                disabled={carregando}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {carregando ? "Criando conta..." : "Criar Conta"}
              </Button>

              {/* Link para Login */}
              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">
                  Já tem conta?{" "}
                  <button
                    type="button"
                    onClick={() => setLocation("/login")}
                    className="text-orange-500 hover:text-orange-600 font-semibold"
                  >
                    Faça login
                  </button>
                </p>
              </div>

              {/* Link para Home */}
              <div className="text-center">
                <a href="/" className="text-gray-600 hover:text-orange-500 transition text-sm font-semibold">
                  ← Voltar para Home
                </a>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
