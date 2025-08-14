import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Forms() {
  

   const navigate = useNavigate();

   const [nome, setNome] = useState("");
   const [email, setEmail] = useState("");

  const handleEnviar = () => {
    // Aqui você pode validar os dados antes de redirecionar
    // alert("Formulário enviado com sucesso!");
    localStorage.setItem("usuario", JSON.stringify({ nome, email }));
    console.log("Formulário enviado com sucesso!", { nome, email });
    if (email && nome) {
      navigate("/"); // vai para login
      // navigate("/", { state: { email, nome } });
    } else {
      alert("Preencha todos os campos!");
    }
  };

  //  const handleSubmit = (e) => {
  //    e.preventDefault();
  //    const { Nome, email, telefone } = e.target.elements;
  //    navigate("/login", { state: { Nome: Nome.value, email: email.value, telefone: telefone.value } });
  //  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3">
      <form className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Cadastro
        </h2>

        {/* Nome */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Nome
          </label>
          <input
            type="text"
            placeholder="Seu nome"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="seuemail@gmail.com"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Telefone */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Telefone
          </label>
          <input
            type="tel"
            placeholder="(11) 99999-9999"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="aceitar"
            className="w-4 h-4 rounded border-gray-300  bg-pink-500 hover:bg-pink-600"
          />
          <label htmlFor="aceitar" className="ml-2 text-gray-700">
            Aceito os termos e condições
          </label>
        </div>

        {/* Botão */}
        <button
          onClick={handleEnviar}
          type="button"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-xl transition duration-200"
        >
          Enviar
        </button>

      </form>
    </div>
  );
}
