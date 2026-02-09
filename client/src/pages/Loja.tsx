import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Heart, Star, Filter } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Loja() {
  const [, setLocation] = useLocation();
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("");
  const [busca, setBusca] = useState<string>("");

  // Obter produtos
  const { data: produtos = [], isLoading } = trpc.carrinho.obterProdutos.useQuery({
    categoria: categoriaFiltro || undefined,
  });

  // Adicionar ao carrinho
  const adicionarAoCarrinhoMutation = trpc.carrinho.adicionarAoCarrinho.useMutation();

  const handleAdicionarAoCarrinho = async (produtoId: number, nomeProduto: string) => {
    try {
      await adicionarAoCarrinhoMutation.mutateAsync({
        produtoId,
        quantidade: 1,
      });
      toast.success(`${nomeProduto} adicionado ao carrinho!`);
    } catch (error: any) {
      toast.error(error.message || "Erro ao adicionar ao carrinho");
    }
  };

  // Filtrar produtos por busca
  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Categorias únicas
  const categorias = Array.from(new Set(produtos.map((p) => p.categoria)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Loja PetFils</h1>
            <Button
              onClick={() => setLocation("/carrinho")}
              className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Meu Carrinho
            </Button>
          </div>

          {/* Busca */}
          <div className="mb-4">
            <Input
              placeholder="Buscar produtos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full border-gray-300"
            />
          </div>

          {/* Filtros */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              onClick={() => setCategoriaFiltro("")}
              variant={categoriaFiltro === "" ? "default" : "outline"}
              className={`whitespace-nowrap ${categoriaFiltro === "" ? "bg-orange-500 hover:bg-orange-600" : ""}`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Todos
            </Button>
            {categorias.map((categoria) => (
              <Button
                key={categoria}
                onClick={() => setCategoriaFiltro(categoria)}
                variant={categoriaFiltro === categoria ? "default" : "outline"}
                className={`whitespace-nowrap ${categoriaFiltro === categoria ? "bg-orange-500 hover:bg-orange-600" : ""}`}
              >
                {categoria}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Produtos */}
      <div className="container py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando produtos...</p>
          </div>
        ) : produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produtosFiltrados.map((produto) => (
              <Card
                key={produto.id}
                className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Imagem */}
                <div className="relative bg-gray-100 h-48 flex items-center justify-center overflow-hidden">
                  {(produto as any).imagem ? (
                    <img
                      src={(produto as any).imagem}
                      alt={produto.nome}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">Sem imagem</p>
                    </div>
                  )}
                  {produto.estoque <= 5 && produto.estoque > 0 && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Últimas {produto.estoque}
                    </div>
                  )}
                  {produto.estoque === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Fora de Estoque</span>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                      {produto.nome}
                    </h3>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mb-2">{produto.categoria}</p>

                  {produto.descricao && (
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {produto.descricao}
                    </p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(0)</span>
                  </div>

                  {/* Preço */}
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-orange-600">
                      R$ {parseFloat(produto.preco.toString()).toFixed(2)}
                    </p>
                  </div>

                  {/* Botão */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleAdicionarAoCarrinho(produto.id, produto.nome)}
                      disabled={produto.estoque === 0 || adicionarAoCarrinhoMutation.isPending}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-400"
                    >
                      {adicionarAoCarrinhoMutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Adicionando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Adicionar ao Carrinho
                        </span>
                      )}
                    </Button>
                    <Button
                      onClick={() => setLocation(`/produto/${produto.id}`)}
                      variant="outline"
                      className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
