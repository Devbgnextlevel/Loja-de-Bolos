import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Search, LogOut, Menu } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [carrinhoCount, setCarrinhoCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [bolos] = useState([
    { id: 1, nome: "Bolo de Chocolate", preco: 59.9, img: "https://via.placeholder.com/300x200?text=Chocolate" },
    { id: 2, nome: "Bolo de Morango", preco: 64.9, img: "https://via.placeholder.com/300x200?text=Morango" },
    { id: 3, nome: "Bolo de Limão", preco: 54.9, img: "https://via.placeholder.com/300x200?text=Limao" },
    { id: 4, nome: "Bolo de Cenoura", preco: 49.9, img: "https://via.placeholder.com/300x200?text=Cenoura" },
    { id: 5, nome: "Bolo Red Velvet", preco: 69.9, img: "https://via.placeholder.com/300x200?text=Red+Velvet" },
    { id: 6, nome: "Bolo de Abacaxi", preco: 62.9, img: "https://via.placeholder.com/300x200?text=Abacaxi" },
    { id: 7, nome: "Bolo de Nozes", preco: 74.9, img: "https://via.placeholder.com/300x200?text=Nozes" },
    { id: 8, nome: "Bolo de Coco", preco: 57.9, img: "https://via.placeholder.com/300x200?text=Coco" },
  ]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
    } else {
      navigate("/");
    }

    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    setCarrinhoCount(carrinho.length);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/compras");
  };

  const addToCart = (bolo) => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    carrinho.push(bolo);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    setCarrinhoCount(carrinho.length);

    setToastMessage(`${bolo.nome} adicionado ao carrinho!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredBolos = bolos.filter((bolo) =>
    bolo.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#C8A2C8] relative">
      {/* Navbar */}
      <header className="bg-[#D89CAB] shadow p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-[#4B2E83]">Ju Doces</h1>
          <button
            className="sm:hidden p-2 rounded hover:bg-[#F5E1A4]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Campo de busca */}
        <div className="hidden sm:flex items-center bg-[#F5E1A4] rounded-lg px-3 py-1 w-1/3">
          <Search className="text-[#4B2E83] mr-2" size={18} />
          <input
            type="text"
            placeholder="Pesquisar bolo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-[#4B2E83]"
          />
        </div>

        {/* Botões ícones */}
        <div className="flex space-x-3 relative">
          <button onClick={handleCartClick} className="p-2 rounded-full hover:bg-[#F5E1A4] relative">
            <ShoppingCart size={24} className="text-[#4B2E83]" />
            {carrinhoCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F4C2C2] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {carrinhoCount}
              </span>
            )}
          </button>
          <button onClick={handleLogout} className="p-2 rounded-full hover:bg-[#F5E1A4]">
            <LogOut size={24} className="text-[#F4C2C2]" />
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="sm:hidden bg-[#D89CAB] shadow p-4 space-y-2">
          <p className="text-[#4B2E83] font-semibold">{nome}</p>
          <p className="text-[#4B2E83]">{email}</p>
          <div className="flex space-x-2">
            <button onClick={handleCartClick} className="flex-1 bg-[#F4C2C2] hover:bg-[#F5E1A4] text-[#4B2E83] py-2 rounded-lg">
              Carrinho
            </button>
            <button onClick={handleLogout} className="flex-1 bg-[#F4C2C2] hover:bg-[#F5E1A4] text-[#4B2E83] py-2 rounded-lg">
              Sair
            </button>
          </div>
        </div>
      )}

      {/* Boas-vindas */}
      <div className="text-center py-4 px-2 sm:px-4">
        <h2 className="text-xl font-semibold text-[#4B2E83]">{nome}</h2>
        <p className="text-[#D89CAB]">{email}</p>
      </div>

      {/* Vitrine de bolos */}
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBolos.map((bolo) => (
          <div
            key={bolo.id}
            className="bg-[#D89CAB] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col"
          >
            <img src={bolo.img} alt={bolo.nome} className="w-full h-40 object-cover" />
            <div className="p-4 text-center flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#4B2E83]">{bolo.nome}</h3>
                <p className="text-[#F4C2C2] mb-3">R$ {bolo.preco.toFixed(2)}</p>
              </div>
              <button
                onClick={() => addToCart(bolo)}
                className="w-full bg-[#F4C2C2] hover:bg-[#F5E1A4] text-[#4B2E83] py-2 rounded-lg mt-2 font-semibold"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#4B2E83] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          {toastMessage}
        </div>
      )}

      <style>{`
        .animate-fade-in-out {
          animation: fadeInOut 3s forwards;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(20px); }
        }
      `}</style>
    </div>
  );
}
