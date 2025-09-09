import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";

export default function Compras() {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState([]);
  const [cupom, setCupom] = useState(""); 
  const [desconto, setDesconto] = useState(0); 

  // novos estados
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(0);
  const [pagamento, setPagamento] = useState(null);

  // Carrega carrinho do localStorage
  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem("carrinho") || "[]");

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
      for (let i = 0; i < item.qtd; i++) {
        arrParaStorage.push({ id: item.id, nome: item.nome, preco: item.preco, img: item.img });
      }
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

  // Total sem desconto
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0);

  // Total com desconto e frete
  const totalFinal = Math.max(total - desconto + frete, 0);

  const aplicarCupom = () => {
    if (cupom === "DESCONTO10") {
      const valorDesconto = total * 0.1; 
      setDesconto(valorDesconto);
      alert("Cupom aplicado com sucesso! 10% de desconto.");
    } else {
      setDesconto(0);
      alert("Cupom inválido.");
    }
  };

  // Simulação de cálculo de frete
  const calcularFrete = () => {
    if (cep.length < 8) {
      alert("Digite um CEP válido.");
      return;
    }
    const valor = Math.floor(Math.random() * 20) + 10; // frete entre 10 e 30
    setFrete(valor);
    alert(`Frete calculado: R$ ${valor.toFixed(2)}`);
  };

  const finalizarCompra = () => {
    if (!pagamento) {
      alert("Selecione uma forma de pagamento antes de finalizar.");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const historico = usuario.historico || [];
    historico.push({
      itens: carrinho,
      total: totalFinal,
      data: new Date().toLocaleDateString("pt-BR"),
      cupom: cupom || null,
      frete,
      cep,
      pagamento,
    });

    localStorage.setItem("usuario", JSON.stringify({ ...usuario, historico }));
    localStorage.removeItem("carrinho");
    setCarrinho([]);
    alert("Compra finalizada! Obrigado.");
    navigate("/Perfil");
  };

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

          {/* Cupom */}
          <div className="bg-[#ffd6e0] p-4 rounded-xl shadow flex flex-col sm:flex-row items-center gap-3 mt-4">
            <input
              type="text"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
              placeholder="Digite seu cupom"
              className="flex-1 p-2 rounded-lg border border-[#4B2E83] outline-none"
            />
            <button
              onClick={aplicarCupom}
              className="bg-[#ffa6a6] hover:bg-[#F5E1A4] text-[#4B2E83] px-4 py-2 rounded-xl font-semibold"
            >
              Aplicar
            </button>
          </div>

          {/* Endereço / Frete */}
          <div className="bg-[#ffd6e0] p-4 rounded-xl shadow flex flex-col gap-3 mt-4">
            <label className="font-semibold text-[#4B2E83]">CEP para entrega:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Digite o CEP"
                className="flex-1 p-2 rounded-lg border border-[#4B2E83] outline-none"
              />
              <button
                onClick={calcularFrete}
                className="bg-[#ffa6a6] hover:bg-[#F5E1A4] px-4 py-2 rounded-xl font-semibold text-[#4B2E83]"
              >
                Calcular
              </button>
            </div>
            {frete > 0 && (
              <p className="text-[#4B2E83]">Frete: R$ {frete.toFixed(2)}</p>
            )}
          </div>

          {/* Forma de Pagamento */}
          <div className="bg-[#ffd6e0] p-4 rounded-xl shadow flex flex-col gap-3 mt-4">
            <label className="font-semibold text-[#4B2E83]">Forma de pagamento:</label>
            
            <div className="flex gap-3">
              <button onClick={() => setPagamento("pix")} className={`px-4 py-2 rounded-xl ${pagamento==="pix" ? "bg-[#ffa6a6]" : "bg-[#F5E1A4]"}`}>Pix</button>
              <button onClick={() => setPagamento("credito")} className={`px-4 py-2 rounded-xl ${pagamento==="credito" ? "bg-[#ffa6a6]" : "bg-[#F5E1A4]"}`}>Crédito</button>
              <button onClick={() => setPagamento("debito")} className={`px-4 py-2 rounded-xl ${pagamento==="debito" ? "bg-[#ffa6a6]" : "bg-[#F5E1A4]"}`}>Débito</button>
            </div>

            {pagamento === "credito" && (
              <div className="flex flex-col gap-2">
                <input type="text" placeholder="Número do cartão" className="p-2 border rounded-lg" />
                <input type="text" placeholder="Nome impresso" className="p-2 border rounded-lg" />
                <div className="flex gap-2">
                  <input type="text" placeholder="Validade (MM/AA)" className="p-2 border rounded-lg flex-1" />
                  <input type="text" placeholder="CVV" className="p-2 border rounded-lg w-20" />
                </div>
                <select className="p-2 border rounded-lg">
                  <option>1x sem juros</option>
                  <option>2x sem juros</option>
                  <option>3x sem juros</option>
                </select>
              </div>
            )}
          </div>

          {/* Totais */}
          <div className="bg-[#ff7c9d] p-4 rounded-xl shadow flex flex-col gap-2 mt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#4B2E83]">Subtotal:</span>
              <span className="font-bold text-[#4B2E83] text-lg">R$ {total.toFixed(2)}</span>
            </div>
            {desconto > 0 && (
              <div className="flex justify-between items-center text-green-700">
                <span>Desconto:</span>
                <span>- R$ {desconto.toFixed(2)}</span>
              </div>
            )}
            {frete > 0 && (
              <div className="flex justify-between items-center text-[#4B2E83]">
                <span>Frete:</span>
                <span>+ R$ {frete.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#4B2E83]">Total:</span>
              <span className="font-bold text-[#4B2E83] text-lg">R$ {totalFinal.toFixed(2)}</span>
            </div>
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
