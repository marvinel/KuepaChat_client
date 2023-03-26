import "./App.css";

import { Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import Register from "./components/Register";
import Login from "./components/Login";



function App() {


  
  return (
    <Routes>
      <Route path="/" element={<Chat/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<h1> Ruta No Encontrada </h1>} />
    </Routes>
  );
}

export default App;
