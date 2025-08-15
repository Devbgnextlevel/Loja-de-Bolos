import { Routes, Route } from "react-router-dom";
import Login from '../components/login.jsx'
import Forms from '../components/forms.jsx' // cadastro
import Home from "../components/home.jsx";

export default function RoutesApp() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Forms />} />
        <Route path="/home" element={<Home />} />
      </Routes>
   
  );
}
