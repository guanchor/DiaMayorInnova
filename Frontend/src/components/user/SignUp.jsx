import React, { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import encodeCredentials from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmation_password: "",
    featured_image: null,
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('featured_image', this.state.featured_image);

    if (!input.email || !input.password || !input.confirmation_password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (input.password !== input.confirmation_password) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const credentials = encodeCredentials(input.email, input.password, input.confirmation_password);

    console.log("Enviando solicitud de registro con:", input);
    auth.signUpAction(credentials).then((response) => {
      console.log("Usuario registrado", response);
    }).catch((error) => {
      setError("Hubo un error al registar el usuario.");
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onImageChange = event => {
    this.setInput({ featured_image: event.target.files[0] });
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
            placeholder="Confirma tu contraseña"
            value={input.confirmation_password}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form_control">
          <label htmlFor="image_featured">Confirmar Password:</label>
          <input
            type="file"
            id="image_featured"
            name="image_featured"
            accept="image/*"
            multiple={false}
            onChange={onImageChange}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="btn-submit">
          Registrarse
        </button>
      </form>
      <button onClick={handleClick}>Ir a Inicio</button>
    </>
  );
};

export default SignUp;