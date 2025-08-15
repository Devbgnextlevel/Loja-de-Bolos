import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";

export default function Compras() {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState([]);

  // Carrega carrinho do localStorage
  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem("carrinho") || "[]");

    // Agrupa itens iguais para quantidade
    const itensComQtd = itens.reduce((acc, item) => {
      const existe = acc.find(i => i.id === item.id);
      if (existe) {
        existe.qtd += 1;
      } else {
        acc.push({ ...item, qtd: 1 });
      }
      return acc;
    }, []);
    setCarrinho(itensComQtd);
  }, []);

  const salvarCarrinho = (novoCarrinho) => {
    const arrParaStorage = [];
    novoCarrinho.forEach(item => {
      for (let i = 0; i < item.qtd; i++) arrParaStorage.push({ id: item.id, nome: item.nome, preco: item.preco, img: item.img });
    });
    localStorage.setItem("carrinho", JSON.stringify(arrParaStorage));
    setCarrinho(novoCarrinho);
  };

  const aumentarQtd = (index) => {
    const novo = [...carrinho];
    novo[index].qtd += 1;
    salvarCarrinho(novo);
  };

  const diminuirQtd = (index) => {
    const novo = [...carrinho];
    if (novo[index].qtd > 1) {
      novo[index].qtd -= 1;
      salvarCarrinho(novo);
    } else {
      removerItem(index);
    }
  };

  const removerItem = (index) => {
    const novo = carrinho.filter((_, i) => i !== index);
    salvarCarrinho(novo);
  };

  const finalizarCompra = () => {
    localStorage.removeItem("carrinho");
    setCarrinho([]);
    alert("Compra finalizada! Obrigado.");
    navigate("/home");
  };

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0);

  return (
    <div className="min-h-screen bg-[#C8A2C8] p-4 sm:p-6">
      {/* Cabeçalho */}
      <header className="flex items-center mb-6">
        <button onClick={() => navigate("/home")} className="p-2 rounded-full hover:bg-[#F5E1A4]">
          <ArrowLeft size={24} className="text-[#4B2E83]" />
        </button>
        <h1 className="ml-3 text-2xl font-bold text-[#4B2E83]">Carrinho de Compras</h1>
      </header>

      {/* Lista de produtos */}
      {carrinho.length === 0 ? (
        <div className="bg-[#de6f8a] rounded-2xl shadow-lg p-6 text-center">
          <p className="text-[#4B2E83]">Seu carrinho está vazio.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {carrinho.map((item, index) => (
            <div key={index} className="bg-[#D89CAB] p-4 rounded-xl shadow flex flex-col sm:flex-row items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4 flex-1">
                <img src={item.img} alt={item.nome} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-[#4B2E83]">{item.nome}</h3>
                  <p className="text-[#F4C2C2]">R$ {item.preco.toFixed(2)}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button onClick={() => diminuirQtd(index)} className="p-1 rounded-full hover:bg-[#F5E1A4]">
                      <Minus size={16} />
                    </button>
                    <span className="w-6 text-center">{item.qtd}</span>
                    <button onClick={() => aumentarQtd(index)} className="p-1 rounded-full hover:bg-[#F5E1A4]">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={() => removerItem(index)} className="p-2 rounded-full hover:bg-[#F5E1A4]">
                <Trash2 size={20} className="text-[#edcdcd]" />
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="bg-[#ff7c9d] p-4 rounded-xl shadow flex justify-between items-center mt-4">
            <span className="font-semibold text-[#4B2E83]">Total:</span>
            <span className="font-bold text-[#4B2E83] text-lg">R$ {total.toFixed(2)}</span>
          </div>

          {/* Finalizar compra */}
          <button
            onClick={finalizarCompra}
            className="w-full bg-[#ffa6a6] hover:bg-[#F5E1A4] text-[#4B2E83] py-3 rounded-xl mt-4 font-semibold"
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
}
