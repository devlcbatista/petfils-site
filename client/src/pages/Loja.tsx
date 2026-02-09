import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Heart, Star, Filter, Search, ChevronDown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Loja() {
  const [, setLocation] = useLocation();
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("");
  const [busca, setBusca] = useState<string>("");
  const [precoMin, setPrecoMin] = useState<number | undefined>();
  const [precoMax, setPrecoMax] = useState<number | undefined>();
  const [ordenacao, setOrdenacao] = useState<'preco_asc' | 'preco_desc' | 'nome_asc' | 'nome_desc'>('nome_asc');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Obter produtos com filtros
  const { data: produtos = [], isLoading } = trpc.carrinho.obterProdutosComFiltros.useQuery({
    categoria: categoriaFiltro || undefined,
    precoMin,
    precoMax,
    ordenacao,
  });

  // Obter categorias
  const { data: categorias = [] } = trpc.carrinho.obterCategoriasLista.useQuery();

  // Obter estatísticas
  const { data: estatisticas } = trpc.carrinho.obterEstatisticas.useQuery();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Loja PetFils</h1>
            <Button
              onClick={() => setLocation("/carrinho")}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Carrinho
            </Button>
          </div>

          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 py-2 border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filtros */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h2 className="text-lg font-bold text-gray-800">Filtros</h2>
                <button onClick={() => setMostrarFiltros(!mostrarFiltros)}>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mostrarFiltros ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {(mostrarFiltros || window.innerWidth >= 1024) && (
                <div className="space-y-6">
                  {/* Categorias */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Categorias</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setCategoriaFiltro("")}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                          categoriaFiltro === ""
                            ? "bg-orange-100 text-orange-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Todas as Categorias
                      </button>
                      {categorias.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategoriaFiltro(cat)}
                          className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                            categoriaFiltro === cat
                              ? "bg-orange-100 text-orange-600 font-semibold"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preço */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Preço</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="text-sm text-gray-600">Mínimo</label>
                        <Input
                          type="number"
                          placeholder="R$ 0"
                          value={precoMin || ""}
                          onChange={(e) => setPrecoMin(e.target.value ? parseFloat(e.target.value) : undefined)}
                          className="border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Máximo</label>
                        <Input
                          type="number"
                          placeholder="R$ 1000"
                          value={precoMax || ""}
                          onChange={(e) => setPrecoMax(e.target.value ? parseFloat(e.target.value) : undefined)}
                          className="border-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ordenação */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Ordenar por</h3>
                    <select
                      value={ordenacao}
                      onChange={(e) => setOrdenacao(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="nome_asc">Nome (A-Z)</option>
                      <option value="nome_desc">Nome (Z-A)</option>
                      <option value="preco_asc">Menor Preço</option>
                      <option value="preco_desc">Maior Preço</option>
                    </select>
                  </div>

                  {/* Limpar Filtros */}
                  <Button
                    onClick={() => {
                      setCategoriaFiltro("");
                      setPrecoMin(undefined);
                      setPrecoMax(undefined);
                      setOrdenacao("nome_asc");
                      setBusca("");
                    }}
                    variant="outline"
                    className="w-full border-orange-500 text-orange-600"
                  >
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Grid de Produtos */}
          <div className="lg:col-span-3">
            {/* Estatísticas */}
            {estatisticas && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-white border-0 shadow-md p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{estatisticas.totalProdutos}</div>
                  <div className="text-sm text-gray-600">Produtos</div>
                </Card>
                <Card className="bg-white border-0 shadow-md p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{produtosFiltrados.length}</div>
                  <div className="text-sm text-gray-600">Exibindo</div>
                </Card>
                <Card className="bg-white border-0 shadow-md p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    R$ {Math.min(...produtosFiltrados.map(p => parseFloat(p.preco.toString()))).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Menor Preço</div>
                </Card>
                <Card className="bg-white border-0 shadow-md p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    R$ {Math.max(...produtosFiltrados.map(p => parseFloat(p.preco.toString()))).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Maior Preço</div>
                </Card>
              </div>
            )}

            {/* Produtos */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              </div>
            ) : produtosFiltrados.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {produtosFiltrados.map((produto) => (
                  <Card key={produto.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                    <div className="bg-gray-100 h-48 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
                        <ShoppingCart className="w-16 h-16 text-gray-300" />
                      </div>
                      {produto.estoque === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Fora de Estoque</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold text-orange-600 uppercase mb-1">{produto.categoria}</p>
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-14">{produto.nome}</h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">(42)</span>
                      </div>

                      {/* Preço */}
                      <div className="mb-4">
                        <p className="text-2xl font-bold text-orange-600">
                          R$ {parseFloat(produto.preco.toString()).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-600">
                          {produto.estoque > 0 ? `${produto.estoque} em estoque` : "Fora de estoque"}
                        </p>
                      </div>

                      {/* Botões */}
                      <div className="space-y-2">
                        <Button
                          onClick={() => setLocation(`/produto/${produto.id}`)}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          disabled={produto.estoque === 0}
                        >
                          Ver Detalhes
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAdicionarAoCarrinho(produto.id, produto.nome)}
                            variant="outline"
                            className="flex-1 border-orange-500 text-orange-600 hover:bg-orange-50"
                            disabled={produto.estoque === 0}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-pink-500 text-pink-600 hover:bg-pink-50"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white border-0 shadow-lg p-12 text-center">
                <p className="text-gray-600 text-lg">Nenhum produto encontrado com os filtros selecionados</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
