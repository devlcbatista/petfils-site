import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Carrinho() {
  const [, setLocation] = useLocation();
  const [endereco, setEndereco] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [finalizando, setFinalizando] = useState(false);

  // Obter carrinho
  const { data: carrinhoData, refetch: refetchCarrinho } = trpc.carrinho.obterCarrinhoDetalhado.useQuery();

  // Mutações
  const atualizarQuantidadeMutation = trpc.carrinho.atualizarQuantidade.useMutation();
  const removerDoCarrinhoMutation = trpc.carrinho.removerDoCarrinho.useMutation();
  const finalizarPedidoMutation = trpc.carrinho.finalizarPedido.useMutation();

  const handleAtualizarQuantidade = async (carrinhoId: number, novaQuantidade: number) => {
    try {
      await atualizarQuantidadeMutation.mutateAsync({
        carrinhoId,
        novaQuantidade,
      });
      refetchCarrinho();
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar quantidade");
    }
  };

  const handleRemover = async (carrinhoId: number) => {
    try {
      await removerDoCarrinhoMutation.mutateAsync({ carrinhoId });
      refetchCarrinho();
      toast.success("Item removido do carrinho");
    } catch (error: any) {
      toast.error(error.message || "Erro ao remover item");
    }
  };

  const handleFinalizarPedido = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!endereco.trim()) {
      toast.error("Endereço de entrega é obrigatório");
      return;
    }

    setFinalizando(true);
    try {
      const resultado = await finalizarPedidoMutation.mutateAsync({
        endereco,
        observacoes: observacoes || undefined,
      });

      toast.success("Pedido finalizado com sucesso!");
      setTimeout(() => {
        setLocation(`/minha-conta`);
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || "Erro ao finalizar pedido");
    } finally {
      setFinalizando(false);
    }
  };

  const itens = carrinhoData?.itens || [];
  const total = carrinhoData?.total || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setLocation("/loja")}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Loja
          </button>
          <h1 className="text-4xl font-bold text-gray-800">Meu Carrinho</h1>
        </div>

        {itens.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Itens do Carrinho */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {itens.length} {itens.length === 1 ? "item" : "itens"}
                </h2>

                <div className="space-y-4">
                  {itens.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0"
                    >
                      {/* Imagem */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {(item.produto as any)?.imagem ? (
                          <img
                            src={(item.produto as any).imagem}
                            alt={item.produto?.nome}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <ShoppingCart className="w-8 h-8 text-gray-400" />
                        )}
                      </div>

                      {/* Detalhes */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {item.produto?.nome}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {item.produto?.categoria}
                        </p>
                        <p className="text-lg font-bold text-orange-600">
                          R$ {parseFloat(item.precoUnitario.toString()).toFixed(2)}
                        </p>
                      </div>

                      {/* Quantidade e Remover */}
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() =>
                              handleAtualizarQuantidade(item.id, item.quantidade - 1)
                            }
                            disabled={item.quantidade <= 1}
                            className="p-1 hover:bg-gray-200 disabled:opacity-50 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantidade}
                          </span>
                          <button
                            onClick={() =>
                              handleAtualizarQuantidade(item.id, item.quantidade + 1)
                            }
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemover(item.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <p className="text-lg font-bold text-gray-800">
                          R$ {item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Resumo e Checkout */}
            <div>
              <Card className="bg-white border-0 shadow-lg p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumo do Pedido</h2>

                {/* Totais */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete:</span>
                    <span>Grátis</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-orange-600">
                    <span>Total:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Formulário de Checkout */}
                <form onSubmit={handleFinalizarPedido} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço de Entrega *</Label>
                    <Input
                      id="endereco"
                      placeholder="Rua, número, complemento..."
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      required
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Input
                      id="observacoes"
                      placeholder="Deixe uma mensagem (opcional)"
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={finalizando}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
                  >
                    {finalizando ? (
                      <span className="flex items-center gap-2 justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Finalizando...
                      </span>
                    ) : (
                      "Finalizar Pedido"
                    )}
                  </Button>

                  <Button
                    type="button"
                    onClick={() => setLocation("/loja")}
                    variant="outline"
                    className="w-full border-gray-300"
                  >
                    Continuar Comprando
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="bg-white border-0 shadow-lg p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Carrinho Vazio</h2>
            <p className="text-gray-600 mb-6">Você ainda não adicionou nenhum produto ao carrinho</p>
            <Button
              onClick={() => setLocation("/loja")}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Ir para Loja
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
