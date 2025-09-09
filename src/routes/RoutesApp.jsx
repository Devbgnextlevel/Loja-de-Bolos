import { Routes, Route } from "react-router-dom";
import Login from '../components/login.jsx'
import Forms from '../components/forms.jsx' // cadastro
import Home from "../components/home.jsx";
import Compras from "../components/compra.jsx";
import Perfil from "../components/Perfil.jsx";
import Usuario from "../components/Usuario.jsx"; // perfil do usuário


export default function RoutesApp() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Forms />} />
        <Route path="/home" element={<Home />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/perfil" element={<Usuario />} />
        <Route path="/usuario" element={<Usuario />} />
      </Routes>
   
  );
}
