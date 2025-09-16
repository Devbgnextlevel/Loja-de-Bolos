import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Search, LogOut, Menu, User } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [carrinhoCount, setCarrinhoCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const [bolos] = useState([
    { id: 1, nome: "Bolo de Chocolate", preco: 59.9, img: "https://via.placeholder.com/300x200?text=Chocolate" },
    { id: 2, nome: "Bolo de Morango", preco: 64.9, img: "https://via.placeholder.com/300x200?text=Morango" },
    { id: 3, nome: "Bolo de Limão", preco: 54.9, img: "https://via.placeholder.com/300x200?text=Limao" },
    { id: 4, nome: "Bolo de Cenoura", preco: 49.9, img: "https://via.placeholder.com/300x200?text=Cenoura" },
    { id: 5, nome: "Bolo Red Velvet", preco: 69.9, img: "https://via.placeholder.com/300x200?text=Red+Velvet" },
    { id: 6, nome: "Bolo de Abacaxi", preco: 62.9, img: "https://via.placeholder.com/300x200?text=Abacaxi" },
    { id: 7, nome: "Bolo de Nozes", preco: 74.9, img: "https://via.placeholder.com/300x200?text=Nozes" },
    { id: 8, nome: "Bolo de Coco", preco: 57.9, img: "https://via.placeholder.com/300x200?text=Coco" },
    { id: 9, nome: "Bolo de Chocolate", preco: 59.9, img: "https://via.placeholder.com/300x200?text=Chocolate" },
    { id: 10, nome: "Bolo de Moranguete", preco: 64.9, img: "https://via.placeholder.com/300x200?text=Morango" },
    { id: 11, nome: "Bolo de Limão", preco: 54.9, img: "https://via.placeholder.com/300x200?text=Limao" },
    { id: 12, nome: "Bolo de maracujá", preco: 49.9, img: "https://via.placeholder.com/300x200?text=Maracuja" },
    { id: 13, nome: "Bolo de banana", preco: 69.9, img: "https://via.placeholder.com/300x200?text=Banana" },
    { id: 14, nome: "Bolo de limão", preco: 62.9, img: "https://via.placeholder.com/300x200?text=Limão" },
    { id: 15, nome: "Bolo de morango", preco: 74.9, img: "https://via.placeholder.com/300x200?text=Morango" },
    { id: 16, nome: "Bolo de uva", preco: 57.9, img: "https://via.placeholder.com/300x200?text=Uva" },
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
    navigate("/usuario");
  };

  const handleCartClick = () => {
    navigate("/compras");
  };

  const handlePerfilClick = () => {
    navigate("/usuario");
  };

  const addToCart = (bolo) => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    carrinho.push(bolo);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    setCarrinhoCount(carrinho.length);
  };

  const filteredBolos = bolos.filter((bolo) =>
    bolo.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#ffcbff] relative">
      {/* Navbar */}
      <header className="bg-[#ffb2c5] shadow p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-[#4B2E83]">Ju Doces</h1>
          <button
            className="sm:hidden p-2 rounded hover:bg-[#fff5d9]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Campo de busca desktop */}
        <div className="hidden sm:flex items-center bg-[#fff6dc] rounded-lg px-3 py-1 w-1/3">
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
        <div className="flex space-x-3 relative items-center">
          {/* Lupa mobile */}
          <button
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className="sm:hidden p-2 rounded-full hover:bg-[#F5E1A4]"
          >
            <Search size={24} className="text-[#4B2E83]" />
          </button>

          {/* Carrinho */}
          <button onClick={handleCartClick} className="p-2 rounded-full hover:bg-[#F5E1A4] relative">
            <ShoppingCart size={24} className="text-[#4B2E83]" />
            {carrinhoCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ffbdbd] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {carrinhoCount}
              </span>
            )}
          </button>

          {/* Perfil */}
          <button onClick={handlePerfilClick} className="p-2 rounded-full hover:bg-[#F5E1A4]">
            <User size={24} className="text-[#4B2E83]" />
          </button>

          {/* Logout */}
          <button onClick={handleLogout} className="p-2 rounded-full hover:bg-[#F5E1A4]">
            <LogOut size={24} className="text-[#ee9393]" />
          </button>
        </div>
      </header>

      {/* Campo de busca mobile */}
      {showMobileSearch && (
        <div className="sm:hidden px-4 py-2 bg-[#fff6dc] flex items-center animate-slide-down shadow">
          <Search className="text-[#4B2E83] mr-2" size={18} />
          <input
            type="text"
            placeholder="Pesquisar bolo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-[#4B2E83]"
            autoFocus
          />
        </div>
      )}

      {/* Menu mobile */}
      {menuOpen && (
        <div className="sm:hidden bg-[#ffa0b7] shadow p-4 space-y-2">
          <p className="text-[#130716] font-semibold">{nome}</p>
          <p className="text-[#130716] font-semibold">{email}</p>
          <div className="flex space-x-2 gap-4" >
            <button onClick={handleCartClick} className="flex-1 bg-[#f88d87] hover:bg-[#F5E1A4] text-[#4B2E83] py-2 rounded-lg">
              Carrinho
            </button>
            <button onClick={handlePerfilClick} className="flex-1 bg-[#f88d87] hover:bg-[#F5E1A4] text-[#4B2E83] py-2 rounded-lg">
              Perfil
            </button>
            <button onClick={handleLogout} className="flex-1 bg-[#f88d87] hover:bg-[#F5E1A4] text-[#4B2E83] py-2 rounded-lg">
              Sair
            </button>
          </div>
        </div>
      )}

      {/* Boas-vindas */}
      <div className="text-center py-4 px-2 sm:px-4">
        <h2 className="text-xl font-semibold text-[#4B2E83]">{nome}</h2>
        <p className="text-[#ffaac0]">{email}</p>
      </div>

      {/* Vitrine de bolos */}
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
        {filteredBolos.map((bolo) => (
          <div
            key={bolo.id}
            className="bg-[#ffb8ca] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col"
          >
            <img src={bolo.img} alt={bolo.nome} className="w-full h-40 object-cover" />
            <div className="p-4 text-center flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#4B2E83]">{bolo.nome}</h3>
                <p className="text-[#ffa9a9] mb-3">R$ {bolo.preco.toFixed(2)}</p>
              </div>
              <button
                onClick={() => addToCart(bolo)}
                className="w-full bg-[#ff7b7b] hover:bg-[#F5E1A4] text-[#4B2E83] py-2 rounded-lg mt-2 font-semibold"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Seção de Contato */}
      <footer className="bg-[#ffb2c5] mt-15 p-6 rounded-t-3xl shadow-inner text-[#4B2E83]">
        <h2 className="text-xl font-bold mb-8 text-left">Contato</h2>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-7 text-left sm:text-left">
          <div>
            <p className="font-semibold">Telefone:</p>
            <p>(11) 99999-9999</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>contato@judoces.com</p>
          </div>
          <div>
            <p className="font-semibold">Endereço:</p>
            <p>Rua das Flores, 123 - Barueri,SP</p>
          </div>
          <div>
            <p className="font-semibold">Trabalhe Conosco:</p>
            <p>envie seu currículo para rh@judoces.com</p>
          </div>
        </div>
        <p className="text-center text-sm mt-5">&copy; 2025 Ju Doces. Todos os direitos reservados.</p>
      </footer>



      {/* Toast
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#4B2E83] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          {toastMessage}
        </div>
      )} */}


      {/* Estilos adicionais */}
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

        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
