import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import encodeCredentials from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import roleService from "../../services/roleService";

const SignUp = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmation_password: "",
    name: "",
    first_lastName: "",
    second_lastName: "",
    featured_image: null,
    role: "student",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.confirmation_password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (input.password !== input.confirmation_password) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("name", input.name);
    formData.append("first_lastName", input.first_lastName);
    formData.append("second_lastName", input.second_lastName);
    if (input.featured_image) {
      formData.append('featured_image', input.featured_image);
    }
    formData.append("role", input.role);

    auth
    .signUpAction(formData)
    .then((response) => {
      console.log("Usuario registrado", response);
      navigate("/");
    })
    .catch((error) => {
      console.error("Error de registro:", error);
      setError(error.response?.data?.message || "Hubo un error al registar el usuario.");
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onImageChange = (event) => {
    setInput({ ...input, featured_image: event.target.files[0] });
  };

  const handleClick = () => {
    navigate("/");
  }

  return (
    <>
      <form onSubmit={handleSubmitEvent}>
        <div className="form_control">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@dominio.com"
            value={input.email}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form_control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={input.password}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form_control">
          <label htmlFor="confirmation_password">Confirmar Password:</label>
          <input
            type="password"
            id="confirmation_password"
            name="confirmation_password"
            placeholder="Confirma la contraseña"
            value={input.confirmation_password}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form_control">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            value={input.name}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form_control">
          <label htmlFor="first_lastName">Primer Apellido:</label>
          <input
            type="text"
            id="first_lastName"
            name="first_lastName"
            placeholder="El primer apellido"
            value={input.first_lastName}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form_control">
          <label htmlFor="second_lastName">Segundo Apellido:</label>
          <input
            type="text"
            id="second_lastName"
            name="second_lastName"
            placeholder="El segundo apellido"
            value={input.second_lastName}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form_control">
          <label htmlFor="featured_image">Sube una imagen de perfil:</label>
          <input
            type="file"
            id="featured_image"
            name="featured_image"
            accept="image/*"
            multiple={false}
            onChange={onImageChange}
          />
        </div>

        <div className="form_control">
          <label htmlFor="role">Seleccione el rol:</label>
          <select  
            id="role" 
            name="role" 
            value={input.role} 
            onChange={handleInput} 
            required
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="btn-submit">
          Registrar
        </button>
      </form>
      <button onClick={handleClick}>Ir a Inicio</button>
    </>
  );
};

export default SignUp;