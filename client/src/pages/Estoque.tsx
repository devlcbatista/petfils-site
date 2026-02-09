import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { AlertCircle, Package, TrendingDown, DollarSign, Plus, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function Estoque() {
  const { user, isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria: "Rações",
    preco: 0,
    estoque: 0,
    estoqueMinimo: 5,
    fornecedor: "",
    sku: "",
  });

  // Queries
  const produtosQuery = trpc.estoque.listar.useQuery();
  const alertasQuery = trpc.estoque.obterAlertas.useQuery();
  const estatisticasQuery = trpc.estoque.obterEstatisticas.useQuery();
  const valorTotalQuery = trpc.estoque.obterValorTotal.useQuery();
  const produtosBaixoQuery = trpc.estoque.obterComEstoqueBaixo.useQuery();

  // Mutations
  const criarProdutoMutation = trpc.estoque.criarProduto.useMutation();
  const marcarAlertaMutation = trpc.estoque.marcarAlertaComoLido.useMutation();

  const produtos = produtosQuery.data?.produtos || [];
  const alertas = alertasQuery.data?.alertas || [];
  const stats = estatisticasQuery.data?.stats;
  const valorTotal = valorTotalQuery.data?.valorTotal || 0;
  const produtosBaixo = produtosBaixoQuery.data?.produtos || [];

  const handleCriarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await criarProdutoMutation.mutateAsync(formData);
      setFormData({
        nome: "",
        descricao: "",
        categoria: "Rações",
        preco: 0,
        estoque: 0,
        estoqueMinimo: 5,
        fornecedor: "",
        sku: "",
      });
      setShowForm(false);
      produtosQuery.refetch();
      estatisticasQuery.refetch();
      valorTotalQuery.refetch();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  const handleMarcarAlerta = async (alertaId: number) => {
    try {
      await marcarAlertaMutation.mutateAsync({ alertaId });
      alertasQuery.refetch();
    } catch (error) {
      console.error("Erro ao marcar alerta:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Gestão de Estoque</h1>
            <p className="text-gray-600 mt-2">Controle de produtos e alertas de reposição</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total de Produtos */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Produtos</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats?.totalProdutos || 0}</p>
              </div>
              <Package className="w-12 h-12 text-blue-300" />
            </div>
          </Card>

          {/* Total de Itens */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Itens</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats?.totalItens || 0}</p>
              </div>
              <TrendingDown className="w-12 h-12 text-green-300" />
            </div>
          </Card>

          {/* Valor Total */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Valor Total</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">R$ {valorTotal.toFixed(2)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-purple-300" />
            </div>
          </Card>

          {/* Alertas */}
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-0 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Alertas Ativos</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{alertas.length}</p>
                <p className="text-sm text-red-500 mt-1">{stats?.produtosSemEstoque || 0} sem estoque</p>
              </div>
              <AlertCircle className="w-12 h-12 text-red-300" />
            </div>
          </Card>
        </div>

        {/* Formulário de Novo Produto */}
        {showForm && (
          <Card className="bg-white border-0 shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Adicionar Novo Produto</h2>
            <form onSubmit={handleCriarProduto} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Rações</option>
                    <option>Brinquedos</option>
                    <option>Petiscos</option>
                    <option>Higiene</option>
                    <option>Acessórios</option>
                    <option>Medicamentos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.preco}
                    onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade em Estoque *</label>
                  <input
                    type="number"
                    required
                    value={formData.estoque}
                    onChange={(e) => setFormData({ ...formData, estoque: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Mínimo *</label>
                  <input
                    type="number"
                    required
                    value={formData.estoqueMinimo}
                    onChange={(e) => setFormData({ ...formData, estoqueMinimo: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Salvar Produto
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="border-gray-300"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Alertas de Estoque */}
        {alertas.length > 0 && (
          <Card className="bg-red-50 border-l-4 border-red-500 shadow-md p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-red-800 mb-3">Alertas de Estoque</h2>
                <div className="space-y-2">
                  {alertas.map((alerta) => (
                    <div key={alerta.id} className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">{alerta.produto?.nome}</p>
                        <p className="text-sm text-gray-600">
                          Estoque atual: {alerta.estoque_atual} | Mínimo: {alerta.estoque_minimo}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleMarcarAlerta(alerta.id)}
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Resolver
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Lista de Produtos */}
        <Card className="bg-white border-0 shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produtos em Estoque</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Produto</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Categoria</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Preço</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Estoque</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {produtos.length > 0 ? (
                  produtos.map((produto) => (
                    <tr key={produto.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800 font-medium">{produto.nome}</td>
                      <td className="py-3 px-4 text-gray-600">{produto.categoria}</td>
                      <td className="py-3 px-4 text-gray-600">R$ {Number(produto.preco).toFixed(2)}</td>
                      <td className="py-3 px-4 text-gray-600">{produto.estoque}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            produto.estoque === 0
                              ? "bg-red-100 text-red-800"
                              : produto.estoque <= produto.estoqueMinimo
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {produto.estoque === 0
                            ? "Sem estoque"
                            : produto.estoque <= produto.estoqueMinimo
                            ? "Baixo"
                            : "OK"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-800 font-medium">
                        R$ {(Number(produto.preco) * produto.estoque).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      Nenhum produto cadastrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
