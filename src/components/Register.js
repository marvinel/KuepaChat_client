import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

import Swal from "sweetalert2";
const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del registro a tu API o backend

    try {
      axios
        .post("http://localhost:4000/api/register", {
          name: name,
          nickname: username,
          password: password,
          type: userType,
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Éxito...",
            text: "Usuario Creado Exitosamente",
          });
          navigate("/login");
        })
        .catch((err) => {
          console.log(err.response.data);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un problema para crear el usuario",
          });
        });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema para crear el usuario",
      });
    }
  };
  const handleSelect = (e) => {
    setUserType(e.target.value);
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className=" form-title card-title text-center ">Registro</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">
                    <strong>Nombre Completo</strong>
                  </label>
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
                  <label htmlFor="nickname">
                    <strong>Usuario</strong>
                  </label>
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
                  <label htmlFor="password">
                    <strong>Contraseña</strong>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <strong id="dropdown">Tipo de Usuario</strong>
                <Form.Select
                  aria-label="Tipo de usuario"
                  onChange={handleSelect}
                  className="form-control"
                >
                  <option>Tipo de usuario</option>
                  <option value="estudiante">Estudiante</option>
                  <option value="moderador">Moderador</option>
                </Form.Select>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Registrarse
                  </button>
                </div>
              </form>

              <Link to="/login">Iniciar sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
