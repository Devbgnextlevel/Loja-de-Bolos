import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Usuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ historico: [] });

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("usuario") || "{}");
    setUsuario({ ...dados, historico: dados.historico || [] });
  }, []);

  const handleCancelarCompra = (indexToRemove) => {
    const novoHistorico = usuario.historico.filter(
      (_compra, idx) => idx !== indexToRemove
    );
    const novoUsuario = { ...usuario, historico: novoHistorico };
    setUsuario(novoUsuario);
    localStorage.setItem("usuario", JSON.stringify(novoUsuario));
  };

  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#C8A2C8] p-6 flex items-center justify-center">
        <p className="text-[#4B2E83]">Nenhum usuário encontrado.</p>
      </div>
    );
  }

  const totalGeral = usuario.historico.reduce(
    (acc, compra) => acc + (compra.total || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4 sm:p-6">
      {/* Cabeçalho */}
      <header className="flex items-center mb-6">
        <button
          onClick={() => navigate("/home")}
          className="p-2 rounded-full hover:bg-[#F5E1A4]"
        >
          <ArrowLeft size={24} className="text-[#4B2E83]" />
        </button>
        <h1 className="ml-3 text-2xl font-bold text-[#4B2E83]">Perfil do Usuário</h1>
      </header>

      {/* Informações do usuário */}
      <div className="bg-[#ffaac0] rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#4B2E83] mb-2">
          Informações Pessoais
        </h2>
        <p><span className="font-bold">Nome:</span> {usuario.nome || "Não informado"}</p>
        <p><span className="font-bold">Email:</span> {usuario.email || "Não informado"}</p>
      </div>

      {/* Total geral */}
      <div className="mb-6 text-right font-semibold text-[#4B2E83]">
        Total geral: R$ {totalGeral.toFixed(2)}
      </div>

      {/* Histórico de compras */}
      <div className="bg-[#ffaac0] rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#4B2E83] mb-4">
          Histórico de Compras
        </h2>

        {usuario.historico.length > 0 ? (
          <div className="space-y-4">
            {usuario.historico.map((compra, idx) => (
              <div key={idx} className="bg-[#f8f8f8] p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#4B2E83]">📅 {compra.data}</span>
                  <span className="font-bold text-[#4B2E83]">
                    Total: R$ {compra.total?.toFixed(2)}
                  </span>
                </div>
                <ul className="space-y-1">
                  {compra.itens.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-[#F5E1A4] p-2 rounded"
                    >
                      <span>{item.nome} (x{item.qtd})</span>
                      <span>R$ {(item.preco * item.qtd).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-right">
                  <button
                    onClick={() => handleCancelarCompra(idx)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancelar Compra
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#4B2E83]">Nenhuma compra realizada ainda.</p>
        )}
      </div>
    </div>
  );
}
