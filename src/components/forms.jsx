import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Bolos1 from "../assets/Bolos1.jpg";

export default function Forms() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const handleEnviar = () => {
    if (nome && email && telefone && dataNascimento) {
      localStorage.setItem(
        "usuario",
        JSON.stringify({ nome, email, telefone, dataNascimento })
      );
      console.log("Formulário enviado com sucesso!", {
        nome,
        email,
        telefone,
        dataNascimento,
      });
      navigate("/");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    setTelefone(value);
  };

  const handleEmailChange = (e) => {
    let value = e.target.value;
    if (value.length > 25) value = value.slice(0, 25);
    setEmail(value);
  };

  const handleDataNascimentoChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // só números
    if (value.length > 8) value = value.slice(0, 8);

    // Formata em dd/mm/yyyy
    if (value.length >= 5) {
      value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    } else if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    }

    setDataNascimento(value);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${Bolos1})` }}
    >
      <div className="flex items-center justify-center w-full">
        <form className="bg-white rounded-4xl shadow-lg p-10 w-full max-w-md sm:max-w-lg md:max-w-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Cadastro
          </h2>

          {/* Nome */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Nome</label>
            <input
              type="text"
              placeholder="Nome"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="email@gmail.com"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={handleEmailChange}
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
              value={telefone}
              onChange={handleTelefoneChange}
            />
          </div>

          {/* Data de Nascimento */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Data de Nascimento
            </label>
            <input
              type="text"
              placeholder="dd/mm/aaaa"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dataNascimento}
              onChange={handleDataNascimentoChange}
              maxLength={10}
            />
          </div>

          {/* Termos */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="aceitar"
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="aceitar" className="ml-2 text-gray-700">
              Aceito os termos e condições
            </label>
          </div>

          {/* Botões */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-xl transition duration-200"
            >
              Voltar
            </button>

            <button
              onClick={handleEnviar}
              type="button"
              className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-xl transition duration-200"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
