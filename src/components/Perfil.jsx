import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ historico: [] });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario") || "{}");
    setUsuario({ historico: user.historico || [] });
  }, []);

  const handleCancelarCompra = (indexToRemove) => {
    const novoHistorico = usuario.historico.filter(
      (_compra, idx) => idx !== indexToRemove
    );
    const novoUsuario = { ...usuario, historico: novoHistorico };
    setUsuario(novoUsuario);
    localStorage.setItem("usuario", JSON.stringify(novoUsuario));
  };

  // Total geral das compras
  const totalGeral = usuario.historico.reduce(
    (acc, compra) => acc + (compra.total || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#C8A2C8] p-4 sm:p-6">
      <header className="flex items-center mb-6">
        <button
          onClick={() => navigate("/home")}
          className="p-2 rounded-full hover:bg-[#F5E1A4]"
        >
          <ArrowLeft size={24} className="text-[#4B2E83]" />
        </button>
        <h1 className="ml-3 text-2xl font-bold text-[#4B2E83]">
          Meu Perfil
        </h1>
      </header>

      {/* Total geral */}
      <div className="mb-6 text-right font-semibold text-[#4B2E83]">
        Total geral: R$ {totalGeral.toFixed(2)}
      </div>

      <div className="space-y-4">
        {usuario.historico.length === 0 ? (
          <div className="bg-[#de6f8a] rounded-2xl shadow-lg p-6 text-center">
            <p className="text-[#4B2E83]">Nenhuma compra realizada ainda.</p>
          </div>
        ) : (
          usuario.historico.map((compra, index) => (
            <div key={index} className="bg-[#D89CAB] p-4 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#4B2E83]">
                  📅 {compra.data}
                </span>
                <span className="font-bold text-[#4B2E83]">
                  Total: R$ {compra.total?.toFixed(2)}
                </span>
              </div>
              <div className="space-y-2">
                {compra.itens.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-[#F4C2C2] rounded-lg p-2"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.img}
                        alt={item.nome}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="text-[#4B2E83] font-medium">
                        {item.nome} (x{item.qtd})
                      </span>
                    </div>
                    <span className="text-[#4B2E83] font-semibold">
                      R$ {(item.preco * item.qtd).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              {/* Botão cancelar compra */}
              <div className="mt-3 text-right">
                <button
                  onClick={() => handleCancelarCompra(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancelar Compra
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
