import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Package, DollarSign, Calendar } from "lucide-react";
import { useState } from "react";

export default function Relatorios() {
  const { user, isAuthenticated } = useAuth();
  const [periodo, setPeriodo] = useState(30);

  // Queries
  const vendasQuery = trpc.relatorios.vendasPorPeriodo.useQuery({ dias: periodo });
  const produtosQuery = trpc.relatorios.produtosMaisVendidos.useQuery({ limite: 10 });
  const receitaQuery = trpc.relatorios.receitaPorPeriodo.useQuery({ dias: periodo });
  const categoriasQuery = trpc.relatorios.receitaPorCategoria.useQuery({ dias: periodo });
  const statsQuery = trpc.relatorios.estatisticasVendas.useQuery({ dias: periodo });
  const agendamentosQuery = trpc.relatorios.agendamentosPorPeriodo.useQuery({ dias: periodo });

  const vendas = vendasQuery.data?.vendas || [];
  const produtos = produtosQuery.data?.produtos || [];
  const receita = receitaQuery.data?.receita || [];
  const categorias = categoriasQuery.data?.receita || [];
  const stats = statsQuery.data?.stats;
  const agendamentos = agendamentosQuery.data?.agendamentos || [];

  const COLORS = ["#FF8C42", "#FF6B9D", "#FFD93D", "#A8E6CF", "#6BCB77", "#4D96FF"];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Relatórios e Análises</h1>
            <p className="text-gray-600 mt-2">Visualize dados de vendas e desempenho</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPeriodo(7)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                periodo === 7
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              7 dias
            </button>
            <button
              onClick={() => setPeriodo(30)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                periodo === 30
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              30 dias
            </button>
            <button
              onClick={() => setPeriodo(90)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                periodo === 90
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              90 dias
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total de Vendas</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalVendas}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-blue-300" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Receita Total</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">R$ {stats.totalReceita.toFixed(2)}</p>
                </div>
                <DollarSign className="w-12 h-12 text-green-300" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Ticket Médio</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">R$ {stats.ticketMedio.toFixed(2)}</p>
                </div>
                <Package className="w-12 h-12 text-purple-300" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Vendas/Dia</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">{stats.vendiasPorDia.toFixed(1)}</p>
                </div>
                <Calendar className="w-12 h-12 text-orange-300" />
              </div>
            </Card>
          </div>
        )}

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vendas por Período */}
          <Card className="bg-white border-0 shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Vendas por Período</h2>
            {vendas.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={vendas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="vendas"
                    stroke="#FF8C42"
                    strokeWidth={2}
                    name="Número de Vendas"
                  />
                  <Line
                    type="monotone"
                    dataKey="quantidade"
                    stroke="#FFD93D"
                    strokeWidth={2}
                    name="Quantidade"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                Sem dados disponíveis
              </div>
            )}
          </Card>

          {/* Receita por Período */}
          <Card className="bg-white border-0 shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Receita por Período</h2>
            {receita.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={receita}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
                  <Legend />
                  <Bar dataKey="receita" fill="#6BCB77" name="Receita (R$)" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                Sem dados disponíveis
              </div>
            )}
          </Card>

          {/* Produtos Mais Vendidos */}
          <Card className="bg-white border-0 shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Top 10 Produtos Mais Vendidos</h2>
            {produtos.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={produtos.map((p) => ({
                    nome: p.produto?.nome || "Desconhecido",
                    quantidade: p.quantidade,
                  }))}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="nome" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="#FF6B9D" name="Quantidade" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                Sem dados disponíveis
              </div>
            )}
          </Card>

          {/* Receita por Categoria */}
          <Card className="bg-white border-0 shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Receita por Categoria</h2>
            {categorias.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categorias}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ categoria, receita }) => `${categoria}: R$ ${receita.toFixed(0)}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="receita"
                  >
                    {categorias.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                Sem dados disponíveis
              </div>
            )}
          </Card>
        </div>

        {/* Tabela de Produtos Mais Vendidos */}
        <Card className="bg-white border-0 shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalhes dos Produtos Mais Vendidos</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Produto</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Categoria</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantidade Vendida</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Preço Unitário</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Receita Total</th>
                </tr>
              </thead>
              <tbody>
                {produtos.length > 0 ? (
                  produtos.map((produto, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800 font-medium">{produto.produto?.nome}</td>
                      <td className="py-3 px-4 text-gray-600">{produto.produto?.categoria}</td>
                      <td className="py-3 px-4 text-gray-600">{produto.quantidade}</td>
                      <td className="py-3 px-4 text-gray-600">
                        R$ {Number(produto.produto?.preco).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-gray-800 font-medium">
                        R$ {produto.receita.toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      Nenhum dado disponível
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
