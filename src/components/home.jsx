import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Search, LogOut, Menu, User, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";


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

   const handleHomelClick = () => {
    navigate("/Home");
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

    <div className="min-h-screen bg-[#f8f8f8] relative">
      
      <header className="bg-[#f8f8f8] shadow p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-[#4B2E83]">Ju Doces</h1>
          <button
            className="sm:hidden p-2 rounded hover:bg-[#f8f8f8]"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>

        
        <div className="hidden sm:flex items-center bg-[#ebdcdc] rounded-lg px-3 py-1 w-1/3">
          <Search className="text-[#1f094a] mr-2" size={20} />
          <input
            type="text"
            placeholder="Pesquisar bolo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-[##1f094a]"
          />
        </div>


        {!menuOpen && (
          <div className="flex space-x-3 relative items-center">
            <button
              onClick={() => setShowMobileSearch((prev) => !prev)}
              className="sm:hidden p-2 rounded-full hover:bg-[#ede9dc]"
            >
              <Search size={24} className="text-[#1f094a]" />
            </button>

            <button onClick={handleCartClick} className="p-2 rounded-full hover:bg-[#ede9dc] relative">
              <ShoppingCart size={24} className="text-[#1f094a]" />
              {carrinhoCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#fb1111] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {carrinhoCount}
                </span>
              )}
            </button>

            {/* Perfil */}
            <button onClick={handlePerfilClick} className="p-2 rounded-full hover:bg-[#ede9dc]">
              <User size={24} className="text-[#1f094a]" />
            </button>

            {/* Logout */}
            <button onClick={handleLogout} className="p-2 rounded-full hover:bg-[#ede9dc]">
              <LogOut size={24} className="text-[#c40505]" />
            </button>
          </div>
        )}
      </header>

      {/* Campo de busca mobile */}
      {showMobileSearch && !menuOpen && (
        <div className="sm:hidden px-4 py-2 bg-[#ede9dc] flex items-center animate-slide-down shadow">
          <Search className="text-[#1f094a] mr-2" size={18} />
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

      {/* Sidebar lateral */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-[#f8f8f8] shadow-lg z-50 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#4B2E83]">JuDoces</h2>
            <button onClick={() => setMenuOpen(false)}>
              <X size={24} className="text-[#4B2E83]" />
            </button>
          </div>

          <br />

          <div className="flex flex-col mt-16 space-y-2 mb-6">
          <button
            onClick={handleCartClick}
            className="w-full bg-[#ffaac0] hover:bg-[#ff7b7b] text-[#4B2E83] py-2 rounded-lg mb-3 font-semibold flex items-center justify-center"
          >
            Carrinho ({carrinhoCount})
          </button>
          <button
            onClick={handlePerfilClick}
            className="w-full bg-[#ffaac0] hover:bg-[#ff7b7b] text-[#4B2E83] py-2 rounded-lg mb-3  font-semibold flex items-center justify-center"
          >
            Perfil
          </button>

           <button
            onClick={handleHomelClick}
            className="w-full bg-[#ffaac0] hover:bg-[#ff7b7b] text-[#4B2E83] py-2 rounded-lg mb-3  font-semibold flex items-center justify-center"
          >
            Produtos
          </button>
           <button
            onClick={handleHomelClick}
            className="w-full bg-[#ffaac0] hover:bg-[#ff7b7b] text-[#4B2E83] py-2 rounded-lg mb-3  font-semibold flex items-center justify-center"
          >
            Ajuda
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-[#ffaac0] hover:bg-[#ff7b7b] text-[#4B2E83] py-2 rounded-lg  font-semibold flex items-center justify-center"
          >
            Sair
          </button>
          </div>
          
          <div className="mt-auto text-center text-[#4B2E83]">
           <p className="text-center text-sm mt-1">&copy; 2025 Ju Doces. Todos os direitos reservados.</p>
           <div className="text-2xl font-bold">Ju Doces</div>
          </div>
        </div>
      )}

      <div className="text-center py-4 px-2 sm:px-4">
        <h2 className="text-xl font-semibold text-[#4B2E83]">
          Olá {nome}, aproveite as promoções!
       </h2>
        <p className="text-[#ffaac0]">{email}</p>
      </div>
      

  <main className="p-6 flex flex-col items-center gap-8">
   <div className="w-[300px] h-[500px] bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
    <img
      src="https://via.placeholder.com/400x250?text=Oferta+do+Dia"
      alt="Oferta do Dia"
      className="w-full h-1/2 object-cover"
    />
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-1">Oferta do Dia</h2>
      <p className="text-sm text-gray-600 mb-1">Bolo Especial de Chocolate</p>
      <p className="text-xs text-gray-400 line-through">R$ 89,90</p>
      <p className="text-xl font-bold text-green-700">R$ 44,90</p>
      <p className="text-xs text-green-600">50% OFF</p>
      <p className="text-xs text-green-600 font-medium mb-2">Frete grátis</p>
      <button className="w-full bg-[#ff7b7b] hover:bg-[#ff5a5a] text-white py-2 rounded-lg font-semibold shadow-sm transition">
        Comprar Agora 🛒
      </button>
    </div>
  </div> 

                        
  <div className="w-full ml-2 mt-11">
  <Swiper
    slidesPerView={1}
    spaceBetween={15}
    pagination={{ clickable: true }} 
    modules={[Pagination]}
    breakpoints={{
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    }}
    className="mySwiper"
  >
    {filteredBolos.map((bolo) => {
      const precoAntigo = bolo.preco * 1.2;
      const desconto = Math.round(((precoAntigo - bolo.preco) / precoAntigo) * 100);

      return (
        <SwiperSlide key={bolo.id}>
          <div className="w-[300px] h-[400px] bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col mx-auto">
            <img src={bolo.img} alt={bolo.nome} className="w-full h-1/2 object-cover" />
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">{bolo.nome}</h3>
              <div className="mb-2">
                <p className="text-xs text-gray-400 line-through">R$ {precoAntigo.toFixed(2)}</p>
                <p className="text-lg font-bold text-green-700">R$ {bolo.preco.toFixed(2)}</p>
                <p className="text-xs text-green-600">{desconto}% OFF</p>
              </div>
              <p className="text-xs text-green-600 font-medium mb-2">Frete grátis</p>
              <button
                onClick={() => addToCart(bolo)}
                className="w-full bg-[#ff7b7b] hover:bg-[#ff5a5a] text-white py-2 rounded-lg font-semibold shadow-sm transition mt-auto"
              >
                Adicionar ao carrinho 🛒
              </button>
            </div>
          </div>
          <br />
          <br />
          <br />
        </SwiperSlide>
      );
    })}
  </Swiper>
</div> 



       <div className="flex flex-wrap justify-center gap-6">
          {filteredBolos.map((bolo) => {
       const precoAntigo = bolo.preco * 1.2;
        const desconto = Math.round(((precoAntigo - bolo.preco) / precoAntigo) * 100);

      return (
        
        <div
          key={bolo.id}
          className="w-[300px] h-[400px] mt-8 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col"
        >
          {/* Imagem */}
          <img
            src={bolo.img}
            alt={bolo.nome}
            className="w-full h-1/2 object-cover"
          />

          {/* Informações */}
          <div className="p-3 flex flex-col flex-1">
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
              {bolo.nome}
            </h3>

            {/* Preços */}
            <div className="mb-2">
              <p className="text-xs text-gray-400 line-through">
                R$ {precoAntigo.toFixed(2)}
              </p>
              <p className="text-lg font-bold text-green-700">
                R$ {bolo.preco.toFixed(2)}
              </p>
              <p className="text-xs text-green-600">{desconto}% OFF</p>
            </div>

            {/* Frete grátis */}
            <p className="text-xs text-green-600 font-medium mb-2">Frete grátis</p>

            {/* Botão */}
            <button
              onClick={() => addToCart(bolo)}
              className="w-full bg-[#ff7b7b] hover:bg-[#ff5a5a] text-white py-2 rounded-lg font-semibold shadow-sm transition mt-auto"
            >
              Adicionar ao carrinho 🛒
                  </button>
                 </div>
                  </div>
               );
             })}
               </div>
           </main>




      {/* Seção de Contato */}
      <footer className="bg-[#ffb2c5] p-6 flex flex-col items-center gap-4 mt-52 text-[#4B2E83]">
        {/* <h2 className="text-xl font-bold mb-8 text-left">Contato</h2> */}
       
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left sm:text-left">
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
          <br />
         </div>
         <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-left sm:text-left">
          <a href="#sobre" className="hover:text-[#ff7b7b] transition">Sobre</a>
          <a href="/Home" className="hover:text-[#ff7b7b] transition">Produtos</a>
         </div>
          <div className="flex gap-4">
          <a href="https://www.instagram.com/" className="hover:text-[#ff7b7b] transition">Instagram</a>
          <a href="https://www.facebook.com/?locale=pt_BR" className="hover:text-[#ff7b7b] transition">Facebook</a>
          <a href="https://web.whatsapp.com/" className="hover:text-[#ff7b7b] transition">WhatsApp</a>
         </div>
        <p className="text-center text-sm mt-1">&copy; 2025 Ju Doces. Todos os direitos reservados.</p>
         <div className="text-2xl font-bold">Ju Doces</div>
      </footer>


      {/* Estilos adicionais */}
      <style>{`
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}
