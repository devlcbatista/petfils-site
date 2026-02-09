import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calendar, DollarSign, CheckCircle, Clock, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<"mes" | "trimestre" | "ano">("mes");

  // Queries
  const statsQuery = trpc.dashboard.estatisticas.useQuery();
  const receitaTotalQuery = trpc.dashboard.receitaTotal.useQuery();
  const servicoPopularQuery = trpc.dashboard.servicoPopular.useQuery();
  const receitaPorServicoQuery = trpc.dashboard.receitaPorServico.useQuery();
  const agendamentosRecentesQuery = trpc.dashboard.agendamentosRecentes.useQuery({ limite: 10 });
  const clientesFrequentesQuery = trpc.dashboard.clientesFrequentes.useQuery({ limite: 5 });
  const taxaConclusaoQuery = trpc.dashboard.taxaConclusao.useQuery();

  const stats = statsQuery.data?.data;
  const receitaTotal = receitaTotalQuery.data?.receita || 0;
  const servicoPopular = servicoPopularQuery.data?.servico;
  const receitaPorServico = receitaPorServicoQuery.data?.receita || [];
  const agendamentosRecentes = agendamentosRecentesQuery.data?.agendamentos || [];
  const clientesFrequentes = clientesFrequentesQuery.data?.clientes || [];
  const taxaConclusao = taxaConclusaoQuery.data?.taxa || 0;

  const isLoading = statsQuery.isLoading || receitaTotalQuery.isLoading;

  // Dados para gráficos
  const statusData = stats ? [
    { name: "Pendentes", value: stats.agendamentosPendentes, fill: "#FFA500" },
    { name: "Confirmados", value: stats.agendamentosConfirmados, fill: "#4CAF50" },
    { name: "Concluídos", value: stats.agendamentosConcluidos, fill: "#2196F3" },
  ] : [];

  const receitaData = receitaPorServico.map(item => ({
    name: item.servico,
    receita: item.total,
    count: item.count,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-2">Bem-vindo, {user?.name || "Administrador"}!</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedPeriod === "mes" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("mes")}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Mês
            </Button>
            <Button
              variant={selectedPeriod === "trimestre" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("trimestre")}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Trimestre
            </Button>
            <Button
              variant={selectedPeriod === "ano" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("ano")}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Ano
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total de Agendamentos */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Agendamentos</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats?.totalAgendamentos || 0}</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-300" />
            </div>
          </Card>

          {/* Receita Total */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Receita Total</p>
                <p className="text-3xl font-bold text-green-600 mt-2">R$ {receitaTotal.toFixed(2)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-300" />
            </div>
          </Card>

          {/* Agendamentos Concluídos */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Concluídos</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats?.agendamentosConcluidos || 0}</p>
                <p className="text-sm text-purple-500 mt-1">{taxaConclusao.toFixed(1)}% de conclusão</p>
              </div>
              <CheckCircle className="w-12 h-12 text-purple-300" />
            </div>
          </Card>

          {/* Clientes */}
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Clientes</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats?.totalClientes || 0}</p>
              </div>
              <Users className="w-12 h-12 text-orange-300" />
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status de Agendamentos */}
          <Card className="bg-white border-0 shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Status de Agendamentos</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Receita por Serviço */}
          <Card className="bg-white border-0 shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Receita por Serviço</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={receitaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="receita" fill="#FF8C42" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Agendamentos Recentes e Clientes Frequentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agendamentos Recentes */}
          <Card className="bg-white border-0 shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Agendamentos Recentes</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {agendamentosRecentes.length > 0 ? (
                agendamentosRecentes.map((agendamento) => (
                  <div key={agendamento.id} className="border-l-4 border-orange-500 pl-4 py-2">
                    <p className="font-semibold text-gray-800">{agendamento.nomeCliente}</p>
                    <p className="text-sm text-gray-600">{agendamento.nomePet} - {agendamento.servico}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">
                        {new Date(agendamento.dataAgendamento).toLocaleDateString("pt-BR")}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        agendamento.status === "pendente" ? "bg-yellow-100 text-yellow-800" :
                        agendamento.status === "confirmado" ? "bg-green-100 text-green-800" :
                        agendamento.status === "concluido" ? "bg-blue-100 text-blue-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {agendamento.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">Nenhum agendamento recente</p>
              )}
            </div>
          </Card>

          {/* Clientes Mais Frequentes */}
          <Card className="bg-white border-0 shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Clientes Mais Frequentes</h2>
            <div className="space-y-3">
              {clientesFrequentes.length > 0 ? (
                clientesFrequentes.map((cliente, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">{cliente.nome}</p>
                      <p className="text-sm text-gray-600">{cliente.telefone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500">{cliente.count}</p>
                      <p className="text-xs text-gray-500">agendamentos</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">Nenhum cliente registrado</p>
              )}
            </div>
          </Card>
        </div>

        {/* Serviço Mais Popular */}
        {servicoPopular && (
          <Card className="bg-gradient-to-r from-orange-50 to-pink-50 border-0 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Serviço Mais Popular</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">{servicoPopular.servico}</p>
                <p className="text-sm text-gray-600 mt-1">{servicoPopular.count} agendamentos</p>
              </div>
              <TrendingUp className="w-16 h-16 text-orange-300" />
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
