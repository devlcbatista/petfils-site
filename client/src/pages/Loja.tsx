import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Heart, Star, Filter, Search, ChevronDown, ArrowLeft, Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: produtos = [], isLoading } = trpc.carrinho.obterProdutosComFiltros.useQuery({
    categoria: categoriaFiltro || undefined,
    precoMin,
    precoMax,
    ordenacao,
  });

  const { data: categorias = [] } = trpc.carrinho.obterCategoriasLista.useQuery();
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

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const imagensProdutos: { [key: number]: string } = {
    1: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/fBaQVTzZxwtNkbEW.jpeg", // Ração Pedigree
    2: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/NqbMJRUwvypastpz.jpg", // Ração Purina Pro Plan
    3: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/WaDshsLsMPXDYPBl.jpg", // Ração Dr. Marty
    4: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/gIYwvSypEXWYZRqn.jpeg", // Brinquedos para gatos
    5: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/dGkDcsharZMYhUWe.jpg", // Kit brinquedos gatos
    6: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/JfqXOZORISBzHnWs.jpg", // Cama para cães
    7: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/ZnVJqPXPJWnGyshi.jpg", // Kit grooming
    8: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/fBaQVTzZxwtNkbEW.jpeg", // Caixa de areia gatos
    9: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/NqbMJRUwvypastpz.jpg", // Shampoo
    10: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/WaDshsLsMPXDYPBl.jpg", // Coleira antipulga
    11: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/gIYwvSypEXWYZRqn.jpeg", // Cama ortopédica
    12: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/dGkDcsharZMYhUWe.jpg", // Comedouro inox
    13: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/JfqXOZORISBzHnWs.jpg", // Brinquedo corda
    14: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/ZnVJqPXPJWnGyshi.jpg", // Toca gatos
    15: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663342017274/fBaQVTzZxwtNkbEW.jpeg", // Escova cães
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="container px-4 sm:px-6 flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Button onClick={() => setLocation("/")} variant="ghost" className="hover:bg-orange-100">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">🐾 Loja</h1>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="/login" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-lg">Login</a>
            <a href="/admin" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full">Admin</a>
            <a href="/minha-conta" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-lg">Minha Conta</a>
            <Button onClick={() => setLocation("/carrinho")} className="bg-orange-500 hover:bg-orange-600">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Carrinho
            </Button>
            <a href="https://wa.me/552799261948" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full">WhatsApp</a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-2">
            <a href="/login" onClick={() => setMenuOpen(false)} className="block text-gray-700 py-2">Login</a>
            <a href="/admin" onClick={() => setMenuOpen(false)} className="block text-gray-700 py-2 font-semibold">Admin</a>
            <a href="/minha-conta" onClick={() => setMenuOpen(false)} className="block text-gray-700 py-2">Minha Conta</a>
            <Button onClick={() => { setLocation("/carrinho"); setMenuOpen(false); }} className="w-full bg-orange-500">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Carrinho
            </Button>
            <a href="https://wa.me/552799261948" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="block w-full text-center bg-green-500 text-white px-4 py-2 rounded-full">WhatsApp</a>
          </div>
        )}

        <div className="container px-4 sm:px-6 py-4 border-t border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input type="text" placeholder="Buscar produtos..." value={busca} onChange={(e) => setBusca(e.target.value)} className="pl-10 py-2" />
          </div>
        </div>
      </header>

      <div className="container px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-32">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h2 className="text-lg font-bold">Filtros</h2>
                <button onClick={() => setMostrarFiltros(!mostrarFiltros)}>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mostrarFiltros ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {(mostrarFiltros || window.innerWidth >= 1024) && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-3">Categorias</h3>
                    <div className="space-y-2">
                      <button onClick={() => setCategoriaFiltro("")} className={`block w-full text-left px-3 py-2 rounded-lg ${categoriaFiltro === "" ? "bg-orange-500 text-white" : "hover:bg-orange-50"}`}>Todas</button>
                      {categorias.map((cat) => (
                        <button key={cat} onClick={() => setCategoriaFiltro(cat)} className={`block w-full text-left px-3 py-2 rounded-lg ${categoriaFiltro === cat ? "bg-orange-500 text-white" : "hover:bg-orange-50"}`}>{cat}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3">Preço</h3>
                    <div className="space-y-2">
                      <Input type="number" placeholder="Mín" value={precoMin || ""} onChange={(e) => setPrecoMin(e.target.value ? parseFloat(e.target.value) : undefined)} />
                      <Input type="number" placeholder="Máx" value={precoMax || ""} onChange={(e) => setPrecoMax(e.target.value ? parseFloat(e.target.value) : undefined)} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3">Ordenar por</h3>
                    <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value as any)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="nome_asc">Nome (A-Z)</option>
                      <option value="nome_desc">Nome (Z-A)</option>
                      <option value="preco_asc">Preço (menor)</option>
                      <option value="preco_desc">Preço (maior)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="text-center py-12"><p className="text-gray-600">Carregando produtos...</p></div>
            ) : produtosFiltrados.length === 0 ? (
              <div className="text-center py-12"><p className="text-gray-600">Nenhum produto encontrado</p></div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {produtosFiltrados.map((produto: any) => (
                  <Card key={produto.id} className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                    <div className="relative bg-gray-100 h-48 overflow-hidden">
                      <img src={imagensProdutos[produto.id] || "https://via.placeholder.com/300x200?text=Produto"} alt={produto.nome} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-orange-50">
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>

                    <div className="p-4">
                      <p className="text-xs font-semibold text-orange-600 uppercase mb-1">{produto.categoria}</p>
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-10">{produto.nome}</h3>

                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">(5.0)</span>
                      </div>

                      <p className="text-2xl font-bold text-orange-600 mb-3">R$ {parseFloat(produto.preco.toString()).toFixed(2)}</p>

                      <div className="space-y-2">
                        <Button onClick={() => setLocation(`/produto/${produto.id}`)} className="w-full bg-blue-500 hover:bg-blue-600 text-sm">Ver Detalhes</Button>
                        <Button onClick={() => handleAdicionarAoCarrinho(produto.id, produto.nome)} className="w-full bg-orange-500 hover:bg-orange-600 text-sm">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Adicionar ao Carrinho
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
