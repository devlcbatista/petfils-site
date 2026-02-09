import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, Lock, LogOut, ArrowLeft } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function MinhaConta() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dados");
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  // Dados do perfil
  const { data: perfil, isLoading: carregandoPerfil } = trpc.perfil.obterPerfil.useQuery();
  const { data: pedidos, isLoading: carregandoPedidos } = trpc.perfil.obterPedidos.useQuery();
  const { data: stats } = trpc.perfil.obterEstatisticas.useQuery();

  // Mutações
  const atualizarPerfilMutation = trpc.perfil.atualizarPerfil.useMutation();
  const alterarSenhaMutation = trpc.perfil.alterarSenha.useMutation();

  // Estados de formulário
  const [formDados, setFormDados] = useState({
    nome: perfil?.nome || "",
    email: perfil?.email || "",
    telefone: perfil?.telefone || "",
    endereco: perfil?.endereco || "",
    cidade: perfil?.cidade || "",
    estado: perfil?.estado || "",
    cep: perfil?.cep || "",
  });

  const [formSenha, setFormSenha] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const handleAtualizarDados = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await atualizarPerfilMutation.mutateAsync(formDados);
      setMensagem("Dados atualizados com sucesso!");
      setEditando(false);
      setTimeout(() => setMensagem(""), 3000);
    } catch (error: any) {
      setMensagem(error.message || "Erro ao atualizar dados");
    }
  };

  const handleAlterarSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await alterarSenhaMutation.mutateAsync(formSenha);
      setMensagem("Senha alterada com sucesso!");
      setFormSenha({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
      setTimeout(() => setMensagem(""), 3000);
    } catch (error: any) {
      setMensagem(error.message || "Erro ao alterar senha");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("clienteToken");
    localStorage.removeItem("clienteId");
    localStorage.removeItem("clienteNome");
    setLocation("/");
  };

  if (carregandoPerfil) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Home
          </button>
          <h1 className="text-4xl font-bold text-gray-800">Minha Conta</h1>
          <p className="text-gray-600 mt-2">Gerenciar perfil e pedidos</p>
        </div>

        {/* Mensagem */}
        {mensagem && (
          <div className={`mb-6 p-4 rounded-lg ${mensagem.includes("sucesso") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {mensagem}
          </div>
        )}

        {/* Estatísticas Rápidas */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white p-6 border-0 shadow-md">
              <div className="text-gray-600 text-sm font-semibold mb-2">Total de Pedidos</div>
              <div className="text-3xl font-bold text-orange-600">{stats.totalPedidos}</div>
            </Card>
            <Card className="bg-white p-6 border-0 shadow-md">
              <div className="text-gray-600 text-sm font-semibold mb-2">Total Gasto</div>
              <div className="text-3xl font-bold text-pink-600">R$ {stats.totalGasto.toFixed(2)}</div>
            </Card>
            <Card className="bg-white p-6 border-0 shadow-md">
              <div className="text-gray-600 text-sm font-semibold mb-2">Entregues</div>
              <div className="text-3xl font-bold text-green-600">{stats.pedidosConcluidos}</div>
            </Card>
            <Card className="bg-white p-6 border-0 shadow-md">
              <div className="text-gray-600 text-sm font-semibold mb-2">Pendentes</div>
              <div className="text-3xl font-bold text-yellow-600">{stats.pedidosPendentes}</div>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Card className="bg-white border-0 shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-t-lg">
              <TabsTrigger value="dados" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Dados Pessoais</span>
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="seguranca" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span className="hidden sm:inline">Segurança</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab: Dados Pessoais */}
            <TabsContent value="dados" className="p-6">
              <form onSubmit={handleAtualizarDados} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={formDados.nome}
                      onChange={(e) => setFormDados({ ...formDados, nome: e.target.value })}
                      disabled={!editando}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formDados.email}
                      onChange={(e) => setFormDados({ ...formDados, email: e.target.value })}
                      disabled={!editando}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formDados.telefone}
                      onChange={(e) => setFormDados({ ...formDados, telefone: e.target.value })}
                      disabled={!editando}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      value={formDados.cep}
                      onChange={(e) => setFormDados({ ...formDados, cep: e.target.value })}
                      disabled={!editando}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      value={formDados.endereco}
                      onChange={(e) => setFormDados({ ...formDados, endereco: e.target.value })}
                      disabled={!editando}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      value={formDados.cidade}
                      onChange={(e) => setFormDados({ ...formDados, cidade: e.target.value })}
                      disabled={!editando}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input
                      id="estado"
                      value={formDados.estado}
                      onChange={(e) => setFormDados({ ...formDados, estado: e.target.value })}
                      disabled={!editando}
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  {!editando ? (
                    <Button
                      type="button"
                      onClick={() => setEditando(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Editar Dados
                    </Button>
                  ) : (
                    <>
                      <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                        Salvar Alterações
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setEditando(false)}
                        variant="outline"
                        className="border-gray-300"
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </TabsContent>

            {/* Tab: Pedidos */}
            <TabsContent value="pedidos" className="p-6">
              {carregandoPedidos ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                  <p className="text-gray-600">Carregando pedidos...</p>
                </div>
              ) : pedidos && pedidos.length > 0 ? (
                <div className="space-y-4">
                  {pedidos.map((pedido) => (
                    <Card key={pedido.id} className="bg-gray-50 border-gray-200 p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <p className="text-gray-600 text-sm">Número do Pedido</p>
                          <p className="font-semibold text-gray-800">{pedido.numeroPedido}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Status</p>
                          <p className={`font-semibold ${pedido.status === "entregue" ? "text-green-600" : pedido.status === "cancelado" ? "text-red-600" : "text-yellow-600"}`}>
                            {pedido.status.charAt(0).toUpperCase() + pedido.status.slice(1)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Total</p>
                          <p className="font-semibold text-gray-800">R$ {parseFloat(pedido.totalPedido || "0").toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Data</p>
                          <p className="font-semibold text-gray-800">{new Date(pedido.createdAt).toLocaleDateString("pt-BR")}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Você ainda não tem pedidos</p>
                </div>
              )}
            </TabsContent>

            {/* Tab: Segurança */}
            <TabsContent value="seguranca" className="p-6">
              <form onSubmit={handleAlterarSenha} className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="senhaAtual">Senha Atual</Label>
                  <Input
                    id="senhaAtual"
                    type="password"
                    placeholder="••••••••"
                    value={formSenha.senhaAtual}
                    onChange={(e) => setFormSenha({ ...formSenha, senhaAtual: e.target.value })}
                    required
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="novaSenha">Nova Senha</Label>
                  <Input
                    id="novaSenha"
                    type="password"
                    placeholder="••••••••"
                    value={formSenha.novaSenha}
                    onChange={(e) => setFormSenha({ ...formSenha, novaSenha: e.target.value })}
                    required
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    placeholder="••••••••"
                    value={formSenha.confirmarSenha}
                    onChange={(e) => setFormSenha({ ...formSenha, confirmarSenha: e.target.value })}
                    required
                    className="border-gray-300"
                  />
                </div>

                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto">
                  Alterar Senha
                </Button>
              </form>

              <hr className="my-8" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Sair da Conta</h3>
                <p className="text-gray-600">Clique no botão abaixo para fazer logout</p>
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Fazer Logout
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
