import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Bolos1 from "../assets/Bolos1.jpg";


export default function Login() {
  
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (usuario) {
    setNome(usuario.nome);
    setEmail(usuario.email);
    console.log("Dados recuperados do localStorage:", usuario);
  } else {
    console.log("Nenhum usuário salvo no localStorage");
  }
 }, []);

 // Função do botão Entrar
  const handleLogin = () => {
  if (nome && email) {
    // alert(`Bem-vindo, ${nome}!`);
    navigate("/home"); // Vai para Home
  } else {
    alert("Preencha todos os campos!");
  }
  };

  

  return (     
    
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${Bolos1})` }}
    >
    
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          🍰  Loja de Bolos 
           <br />
              Ju Doces
        </h2>

       
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="seuemail@gmail.com"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        
        <button
          onClick={handleLogin}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-xl transition duration-200"
        >
          Entrar
        </button>

        
        <p className="mt-4 text-center text-gray-600">
          Não tem cadastro?{" "}
          <Link
            to="/cadastro"
            className="text-pink-500 hover:underline font-medium"
          >
            Registre-se
          </Link>
        </p>
      </div>
    </div>
    // </div>
  );
}
