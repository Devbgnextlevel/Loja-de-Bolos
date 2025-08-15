import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Recupera dados do localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
    } else {
      // Se não tiver usuário, redireciona para login
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuario"); // limpa o usuário
    navigate("/"); // volta para login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Bem-vindo(a), {nome}!
        </h2>
        <p className="text-gray-700 mb-6">Seu email cadastrado: {email}</p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition duration-200"
        >
          Sair
        </button>
      </div>
    </div>
  );
}