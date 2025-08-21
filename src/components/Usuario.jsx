import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Usuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("usuario") || "{}");
    setUsuario(dados);
  }, []);

  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#C8A2C8] p-6 flex items-center justify-center">
        <p className="text-[#4B2E83]">Nenhum usuário encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#C8A2C8] p-4 sm:p-6">
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
      <div className="bg-[#D89CAB] rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#4B2E83] mb-2">
          Informações Pessoais
        </h2>
        <p><span className="font-bold">Nome:</span> {usuario.nome || "Não informado"}</p>
        <p><span className="font-bold">Email:</span> {usuario.email || "Não informado"}</p>
      </div>

      {/* Histórico de compras */}
      <div className="bg-[#de6f8a] rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#4B2E83] mb-4">
          Histórico de Compras
        </h2>

        {usuario.historico && usuario.historico.length > 0 ? (
          <div className="space-y-4">
            {usuario.historico.map((compra, idx) => (
              <div key={idx} className="bg-[#F4C2C2] p-4 rounded-lg">
                <p className="font-semibold text-[#4B2E83]">
                  Data: {compra.data}
                </p>
                <p>Total: R$ {compra.total.toFixed(2)}</p>
                <ul className="list-disc pl-6 text-sm mt-2">
                  {compra.itens.map((item, i) => (
                    <li key={i}>
                      {item.nome} — {item.qtd}x (R$ {item.preco.toFixed(2)})
                    </li>
                  ))}
                </ul>
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
