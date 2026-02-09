import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Heart, Share2, ShoppingCart, ArrowLeft, Minus, Plus, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function DetalheProduto() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/produto/:id");
  const produtoId = params?.id ? parseInt(params.id) : null;
  const [quantidade, setQuantidade] = useState(1);
  const [adicionando, setAdicionando] = useState(false);

  // Obter produto
  const { data: produto, isLoading } = trpc.carrinho.obterProduto.useQuery(
    { produtoId: produtoId || 0 },
    { enabled: !!produtoId }
  );

  // Obter produtos recomendados
  const { data: produtosRecomendados = [] } = trpc.carrinho.obterProdutosRecomendados.useQuery(
    { produtoId: produtoId || 0, limite: 4 },
    { enabled: !!produtoId }
  );

  // Adicionar ao carrinho
  const adicionarAoCarrinhoMutation = trpc.carrinho.adicionarAoCarrinho.useMutation();

  const handleAdicionarAoCarrinho = async () => {
    if (!produto) return;
    setAdicionando(true);
    try {
      await adicionarAoCarrinhoMutation.mutateAsync({
        produtoId: produto.id,
        quantidade,
      });
      toast.success(`${produto.nome} adicionado ao carrinho!`);
      setQuantidade(1);
    } catch (error: any) {
      toast.error(error.message || "Erro ao adicionar ao carrinho");
    } finally {
      setAdicionando(false);
    }
  };

  if (!produtoId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
        <Card className="bg-white border-0 shadow-lg p-8 text-center">
          <p className="text-gray-600 mb-4">Produto não encontrado</p>
          <Button onClick={() => setLocation("/loja")} className="bg-orange-500 hover:bg-orange-600">
            Voltar para Loja
          </Button>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
        <Card className="bg-white border-0 shadow-lg p-8 text-center">
          <p className="text-gray-600 mb-4">Produto não encontrado</p>
          <Button onClick={() => setLocation("/loja")} className="bg-orange-500 hover:bg-orange-600">
            Voltar para Loja
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container py-4">
          <button
            onClick={() => setLocation("/loja")}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Loja
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagem do Produto */}
          <div>
            <Card className="bg-gray-100 border-0 shadow-lg h-96 flex items-center justify-center rounded-lg overflow-hidden">
              {(produto as any).imagem ? (
                <img
                  src={(produto as any).imagem}
                  alt={produto.nome}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Sem imagem disponível</p>
                </div>
              )}
            </Card>

            {/* Galeria Thumb */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="bg-gray-100 border-0 h-24 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
                  <ShoppingCart className="w-8 h-8 text-gray-400" />
                </Card>
              ))}
            </div>
          </div>

          {/* Detalhes do Produto */}
          <div>
            {/* Categoria */}
            <p className="text-orange-600 font-semibold text-sm mb-2">{produto.categoria}</p>

            {/* Título */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{produto.nome}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">(0 avaliações)</span>
            </div>

            {/* Preço */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">Preço</p>
              <p className="text-5xl font-bold text-orange-600">
                R$ {parseFloat(produto.preco.toString()).toFixed(2)}
              </p>
              <p className="text-green-600 font-semibold mt-2 flex items-center gap-2">
                <Check className="w-5 h-5" />
                Em estoque ({produto.estoque} disponíveis)
              </p>
            </div>

            {/* Descrição */}
            {produto.descricao && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Sobre este produto</h3>
                <p className="text-gray-600 leading-relaxed">{produto.descricao}</p>
              </div>
            )}

            {/* Especificações */}
            <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Especificações</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoria</span>
                  <span className="font-semibold text-gray-800">{produto.categoria}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Disponibilidade</span>
                  <span className="font-semibold text-green-600">Em Estoque</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU</span>
                  <span className="font-semibold text-gray-800">{produto.sku || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Quantidade e Botões */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Quantidade</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                    <button
                      onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                      className="p-2 hover:bg-gray-200 rounded"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">{quantidade}</span>
                    <button
                      onClick={() => setQuantidade(quantidade + 1)}
                      className="p-2 hover:bg-gray-200 rounded"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-600">
                    Total: <span className="font-bold text-orange-600">
                      R$ {(parseFloat(produto.preco.toString()) * quantidade).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={handleAdicionarAoCarrinho}
                  disabled={adicionando || produto.estoque === 0}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
                >
                  {adicionando ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adicionando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Adicionar ao Carrinho
                    </span>
                  )}
                </Button>

                <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 py-3">
                  <Heart className="w-5 h-5 mr-2" />
                  Favoritar
                </Button>
              </div>

              {/* Compartilhar */}
              <Button variant="outline" className="w-full border-gray-300 py-3">
                <Share2 className="w-5 h-5 mr-2" />
                Compartilhar
              </Button>
            </div>

            {/* Benefícios */}
            <div className="bg-green-50 rounded-lg p-6 mt-8 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Por que comprar na PetFils?</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <Check className="w-5 h-5 text-green-600" />
                  Frete grátis acima de R$ 100
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Check className="w-5 h-5 text-green-600" />
                  Produtos 100% originais
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Check className="w-5 h-5 text-green-600" />
                  Garantia de satisfação
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Check className="w-5 h-5 text-green-600" />
                  Atendimento ao cliente 24/7
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Produtos Recomendados */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Produtos Recomendados</h2>
          {produtosRecomendados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {produtosRecomendados.map((prod) => (
                <Card key={prod.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-gray-100 h-40 flex items-center justify-center rounded-t-lg">
                    <ShoppingCart className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-2">{prod.categoria}</p>
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{prod.nome}</h3>
                    <p className="text-2xl font-bold text-orange-600 mb-4">
                      R$ {parseFloat(prod.preco.toString()).toFixed(2)}
                    </p>
                    <Button onClick={() => setLocation(`/produto/${prod.id}`)} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Ver Detalhes
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white border-0 shadow-lg p-8 text-center">
              <p className="text-gray-600">Nenhum produto recomendado</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
