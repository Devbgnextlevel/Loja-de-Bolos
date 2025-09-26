import { useNavigate } from "react-router-dom";
import React from "react";
import { ArrowLeft } from "lucide-react";

export default function Produtos() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-gray-100 p-4 flex flex-col items-center sm:p-6">
      {/* Botão Voltar */}
      <button
        onClick={() => navigate("/home")}
        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-white shadow rounded-lg hover:bg-gray-200 transition"
      >
        <ArrowLeft size={20} className="text-gray-700" />
        <span className="text-gray-700 font-medium text-sm sm:text-base">Voltar</span>
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800 mt-16 sm:mt-20 text-center sm:text-left">
        Produtos
      </h1>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-md sm:max-w-2xl mt-6 sm:mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center sm:text-left">
          Nossos Produtos
        </h2>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Aqui você pode encontrar uma seleção dos nossos deliciosos bolos:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4 text-sm sm:text-base">
          <li>Bolo de Chocolate</li>
          <li>Bolo de Morango</li>
          <li>Bolo de Limão</li>
          <li>Bolo de Cenoura</li>
          <li>Bolo Red Velvet</li>
        </ul>
      </div>
    </div>
  );
}
