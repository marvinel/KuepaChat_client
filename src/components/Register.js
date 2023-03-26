import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del registro a tu API o backend
    console.log(name, username, password,userType);

    try {
      axios.post("http://localhost:4000/api/register", {
            name: name,
            nickname: username,
            password: password,
            type: userType
        })
        .then(res =>{
            console.log(res.data)
            navigate("/login")
        })
        .catch(err =>{
          console.log(err.response.data)
        })
  } catch (error) {
      console.log(error)
  }
  };
  const handleSelect = (e)=>{
    console.log(e)
    setUserType(e)
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-center">Registro</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Ingresa tu nombre de usuario"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nickname">Usuario</label>
                  <input
                    type="nickname"
                    className="form-control"
                    id="nickname"
                    placeholder="Ingresa tu Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Dropdown onSelect={handleSelect}>
                  <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    Tipo de usuario
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="estudiante">Estudiante</Dropdown.Item>
                    <Dropdown.Item eventKey="moderador">
                      Moderador
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Registrarse
                  </button>
                </div>
              </form>
              <div className="dropdown-dividir"></div>
              <Link to="/login">Iniciar sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
