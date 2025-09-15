import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import {
  boleto, // valida qualquer boleto (bancário ou de arrecadação), com ou sem máscara
  boletoBancario,
  boletoArrecadacao,
  boletoBancarioLinhaDigitavel,
  boletoArrecadacaoLinhaDigitavel
} from "boleto-brasileiro-validator";


export default function Compras() {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState([]);
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);

  // novos estados
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(0);
  const [pagamento, setPagamento] = useState(null);

  // estados do cartão de crédito
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");  // formato “MM/AA” ou “MM/AAAA”
  const [cardCVV, setCardCVV] = useState("");

  // novos estados para boleto
  const [boletoLinha, setBoletoLinha] = useState("");
  const [erroBoleto, setErroBoleto] = useState("");

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

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0);
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

  // Funções de validação simples
  const onlyDigits = (str) => {
    return str.replace(/\D/g, "");
  };
  

  const validarCEP = (cep) => {
    const clean = onlyDigits(cep);
    return clean.length === 8;
  };


    const validarNumeroCartao = (num) => {
    const clean = onlyDigits(num);
    return clean.length >= 13 && clean.length <= 19;
  };


  const validarValidade = (val) => {
    if (!val) return false;
    const parts = val.split("/");
    if (parts.length !== 2) return false;
    const mm = parseInt(parts[0], 10);
    let yy = parseInt(parts[1], 10);
    if (isNaN(mm) || mm < 1 || mm > 12) return false;

    const now = new Date();
    const currentYearFull = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // se o ano vier como 2 dígitos, considerar 2000 + yy
    if (parts[1].length === 2) {
      yy += 2000;
    }
    if (isNaN(yy)) return false;

    if (yy < currentYearFull) return false;
    if (yy === currentYearFull && mm < currentMonth) return false;


    return true;
   };

  const validarCVV = (cvv) => {
    const clean = onlyDigits(cvv);
    return clean.length === 3 || clean.length === 4;
  };

  const validarCartao = () => {
    const erros = [];

    if (!validarNumeroCartao(cardNumber)) {
      erros.push("Número do cartão inválido (13‑19 dígitos)");
    }
    if (!cardName || cardName.trim().length === 0) {
      erros.push("Nome impresso faltando");
    }
    if (!validarValidade(cardExpiry)) {
      erros.push("Validade do cartão inválida ou expirado");
    }
    if (!validarCVV(cardCVV)) {
      erros.push("CVV inválido (3 ou 4 dígitos)");
    }

    return erros;
  };

  const calcularFrete = () => {
    if (!validarCEP(cep)) {
      alert("Digite um CEP válido (8 dígitos numéricos).");
      return;
    }

    const valor = Math.floor(Math.random() * 20) + 10; // frete fictício entre 10 e 30
    setFrete(valor);
    alert(`Frete calculado: R$ ${valor.toFixed(2)}`);
   };

  const validarBoletoLinha = (linha) => {
    const clean = linha.replace(/\s/g, "");
    // usa a lib para validar boleto completo
    return boleto(clean);
  };

  const finalizarCompra = () => {
    if (!pagamento) {
      alert("Selecione uma forma de pagamento antes de finalizar.");
      return;
    }

    if (!validarCEP(cep)) {
      alert("Digite um CEP válido antes de finalizar.");
      return;
    }

    if (pagamento === "credito") {
      const errosCartao = validarCartao();
      if (errosCartao.length > 0) {
        alert("Erro no pagamento: " + errosCartao.join(", "));
        return;
      }
    }

    if (pagamento === "boleto") {
      if (!boletoLinha || boletoLinha.trim().length === 0) {
        setErroBoleto("Linha digitável do boleto é obrigatória.");
        alert("Linha digitável do boleto é obrigatória.");
        return;
      }
      if (!validarBoletoLinha(boletoLinha)) {
        setErroBoleto("Linha digitável do boleto inválida.");
        alert("Erro no boleto: linha digitável inválida.");
        return;
      }
    }

    // Prossegue com “compra fictícia”
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
      boletoLinha: pagamento === "boleto" ? boletoLinha : null,
      // não guardar dados do cartão
    });

    localStorage.setItem("usuario", JSON.stringify({ ...usuario, historico }));
    localStorage.removeItem("carrinho");
    setCarrinho([]);

    // limpar campos
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCVV("");
    setPagamento(null);
    setCep("");
    setFrete(0);
    setDesconto(0);
    setCupom("");
    setBoletoLinha("");
    setErroBoleto("");

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

      {carrinho.length === 0 ? (
        <div className="bg-[#de6f8a] rounded-2xl shadow-lg p-6 text-center">
          <p className="text-[#4B2E83]">Seu carrinho está vazio.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {carrinho.map((item, index) => (
            <div key={index} className="bg-[] p-4 rounded-xl shadow flex flex-col sm:flex-row items-center sm:justify-between gap-4">
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
          <div className="bg-[] p-4 rounded-xl shadow flex  sm:flex-row items-center gap-3 mt-4">
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
          <div className="bg-[] p-4 rounded-xl shadow flex flex-col gap-3 mt=4">
            <label className="font-semibold text-[#4B2E83]">Taxa para entrega:</label>
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
                className="bg-[#ffa6a6] px-4 py-2 rounded-xl font-semibold text-[#4B2E83]"
              >
                Calcular
              </button>
            </div>
            {frete > 0 && (
              <p className="text-[#4B2E83]">Frete: R$ {frete.toFixed(2)}</p>
            )}
          </div>

          {/* Forma de Pagamento */}
          <div className="bg-[] p-4 rounded-xl shadow flex flex-col gap-3 mt-4">
            <label className="font-semibold text-[#4B2E83]">Forma de pagamento:</label>
            <div className="flex gap-3">
              <button
                onClick={() => setPagamento("pix")}
                className={`px-4 py-2 rounded-xl ${pagamento === "pix" ? "bg-[#ffa6a6]" : "bg-[#F5E1A4]"}`}
              >
                Pix
              </button>
              <button
                onClick={() => setPagamento("credito")}
                className={`px-4 py-2 rounded-xl ${pagamento === "credito" ? "bg-[#ffa6a6]" : "bg-[#F5E1A4]"}`}
              >
                Crédito
              </button>
              <button
                onClick={() => setPagamento("boleto")}
                className={`px-4 py-2 rounded-xl ${pagamento === "boleto" ? "bg-[#ffa6a6]" : "bg-[#F5E1A4]"}`}
              >
                Boleto
              </button>
            </div>

            {pagamento === "credito" && (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Número do cartão"
                  className="p-2 border rounded-lg"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Nome impresso"
                  className="p-2 border rounded-lg"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Validade (MM/AA)"
                    className="p-2 border rounded-lg flex-1"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="p-2 border rounded-lg w-20"
                    value={cardCVV}
                    onChange={(e) => setCardCVV(e.target.value)}
                  />
                </div>
                <select className="p-2 border rounded-lg">
                  <option>1x sem juros</option>
                  <option>2x sem juros</option>
                  <option>3x sem juros</option>
                   <option>4x sem juros</option>
                   <option>5x sem juros</option>
                </select>
              </div>
            )}

            {pagamento === "boleto" && (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Linha digitável do boleto"
                  className={`p-2 border rounded-lg ${erroBoleto ? "border-red-500" : ""}`}
                  value={boletoLinha}
                  onChange={(e) => {
                    setBoletoLinha(e.target.value);
                    if (erroBoleto) setErroBoleto("");
                  }}
                />
                {erroBoleto && <p className="text-red-600">{erroBoleto}</p>}
              </div>
            )}
          </div>

          {/* Totais */}
          <div className="p-4 rounded-xl shadow flex flex-col gap-2 mt-4">
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
