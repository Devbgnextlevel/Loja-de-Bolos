import { Routes, Route } from "react-router-dom";
import Login from '../components/login.jsx'
import Forms from '../components/forms.jsx' // cadastro

export default function RoutesApp() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Forms />} />
      </Routes>
   
  );
}
