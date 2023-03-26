import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    
    e.preventDefault();
    // Aquí puedes enviar los datos del registro a tu API o backend
    

    try {
        axios.post("http://localhost:4000/api/login", {
            nickname: username,
            password: password,
          })
          .then(res =>{
           
            console.log(res.data)
            sessionStorage.setItem("sessionToken", res.data.token)
            navigate("/")
          })
          .catch(err =>{
            console.log(err.response.data)
          })
    } catch (error) {
        console.log(error)
    }

      
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-center">Iniciar Sesión</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Nombre de usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Ingresa tu nombre de usuario"
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

                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary">
                    Iniciar Sesión
                  </button>
                </div>
              </form>
              <div className='dropdown-menu'>
              <div className="dropdown-divider"></div>
              
              </div>
              <Link to="/register" >¿No tienes cuenta? Regístrate aquí</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;