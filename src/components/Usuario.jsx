import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  XCircle,
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
  Star,
  Key,
  LogIn,
} from "lucide-react";

export default function Usuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ historico: [] });

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("usuario") || "{}");

    // Simulação de campos extras caso não existam no localStorage
    const usuarioCompleto = {
      historico: dados.historico || [],
      telefone: dados.telefone || "(xx) xxxxx-xxxx",
      nascimento: dados.nascimento || "01/01/2000",
      cidade: dados.cidade || "São Paulo - SP",
      cadastro: dados.cadastro || "01/01/2025",
      nivel: dados.nivel || "Bronze",
      id: dados.id || "#USR-12345",
      ultimoAcesso: dados.ultimoAcesso || new Date().toLocaleString(),
      ...dados, // sobrescreve defaults caso existam valores
    };

    setUsuario(usuarioCompleto);

    // Atualiza localStorage caso campos default tenham sido usados
    localStorage.setItem("usuario", JSON.stringify(usuarioCompleto));
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
      <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-100 flex items-center justify-center">
        <p className="text-purple-800 font-semibold text-lg">
          Nenhum usuário encontrado.
        </p>
      </div>
    );
  }

  const totalGeral = usuario.historico.reduce(
    (acc, compra) => acc + (compra.total || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-8">
      {/* Cabeçalho */}
      <header className="flex items-center mb-8">
        <button
          onClick={() => navigate("/home")}
          className="p-2 rounded-full hover:bg-purple-100 transition"
        >
          <ArrowLeft size={24} className="text-purple-800" />
        </button>
        <h1 className="ml-4 text-3xl font-bold text-purple-900">
          Perfil do Usuário
        </h1>
      </header>

      {/* Informações do usuário */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-8 ">
        <h2 className="text-xl font-semibold text-purple-900 mb-6">
          Informações Pessoais
        </h2>

        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center gap-3">
            <User className="text-purple-700" size={20} />
            <span>
              <strong>Nome:</strong> {usuario.nome || "Não informado"}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="text-purple-700" size={20} />
            <span>
              <strong>Email:</strong> {usuario.email || "Não informado"}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Phone className="text-purple-700" size={20} />
            <span>
              <strong>Telefone:</strong> {usuario.telefone}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Calendar className="text-purple-700" size={20} />
            <span>
              <strong>Data de Nascimento:</strong> {usuario.nascimento}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="text-purple-700" size={20} />
            <span>
              <strong>Cidade:</strong> {usuario.cidade}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Key className="text-purple-700" size={20} />
            <span>
              <strong>ID Usuário:</strong> {usuario.id}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Star className="text-purple-700" size={20} />
            <span>
              <strong>Nível:</strong> {usuario.nivel}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Calendar className="text-purple-700" size={20} />
            <span>
              <strong>Cadastro:</strong> {usuario.cadastro}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <LogIn className="text-purple-700" size={20} />
            <span>
              <strong>Último acesso:</strong> {usuario.ultimoAcesso}
            </span>
          </li>
        </ul>
      </div>

      {/* Total geral */}
      <div className="mb-6 text-right">
        <p className="text-lg font-bold text-purple-900">
          Total geral:{" "}
          <span className="text-purple-900">R$ {totalGeral.toFixed(2)}</span>
        </p>
      </div>

      {/* Histórico de compras */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-purple-900 mb-6 flex items-center gap-2">
          <ShoppingBag className="text-pink-600" /> Histórico de Compras
        </h2>

        {usuario.historico.length > 0 ? (
          <div className="space-y-6">
            {usuario.historico.map((compra, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 p-5 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">📅 {compra.data}</span>
                  <span className="font-bold text-purple-900">
                    Total: R$ {compra.total?.toFixed(2)}
                  </span>
                </div>
                <ul className="space-y-2">
                  {compra.itens.map((item, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center bg-white border rounded-lg px-3 py-2 shadow-sm"
                    >
                      <span>
                        {item.nome}{" "}
                        <span className="text-gray-500">(x{item.qtd})</span>
                      </span>
                      <span className="font-medium text-purple-800">
                        R$ {(item.preco * item.qtd).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleCancelarCompra(idx)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow hover:bg-red-600 transition"
                  >
                    <XCircle size={18} /> Cancelar Compra
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhuma compra realizada ainda.</p>
        )}
      </div>
    </div>
  );
}
