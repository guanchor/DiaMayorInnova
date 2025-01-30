import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";

const AddUsers = ({ setUsers }) => {
  const initialUserState = {
    email: "",
    password: "",
    confirmation_password: "",
    name: "",
    first_lastName: "",
    second_lastName: "",
    featured_image: null,
    role: "student",
  };

  const [input, setInput] = useState(initialUserState);
  const [error, setError] = useState("");

  const auth = useAuth();

  const addUser = (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.confirmation_password || !input.name || !input.first_lastName || !input.second_lastName) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (input.password !== input.confirmation_password) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const formData = new FormData();
    formData.append("user[email]", input.email);
    formData.append("user[password]", input.password);
    formData.append("user[name]", input.name);
    formData.append("user[first_lastName]", input.first_lastName);
    formData.append("user[second_lastName]", input.second_lastName);
    if (input.featured_image) {
      formData.append('user[featured_image]', input.featured_image);
    }
    formData.append("user[role]", input.role);

    auth.signUpAction(formData)
      .then(response => {
        setUsers(prev => [...prev, response.data.user]);
        setInput(initialUserState); // Clear form
      })
      .catch((error) => {
        console.error("Error de registro:", error);
        setError(error.response?.data?.message || "Hubo un error al registrar el usuario.");
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

  return (
    <>
      <section className="create-schools_wrapper">
        <h2>Registrar Nuevo Usuario</h2>
        <form className="create-schools_form" onSubmit={addUser}>
          <fieldset className='create-schools_fieldset'>
            <label className='school_label'>Email
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleInput}
                placeholder="Email"
                required
              />
            </label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleInput}
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="confirmation_password"
              value={input.confirmation_password}
              onChange={handleInput}
              placeholder="Confirmar Password"
              required
            />
          </fieldset>
          <fieldset className='create-schools_fieldset'>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleInput}
              placeholder="Nombre"
              required
            />
            <input
              type="text"
              name="first_lastName"
              value={input.first_lastName}
              onChange={handleInput}
              placeholder="Primer Apellido"
              required
            />
            <input
              type="text"
              name="second_lastName"
              value={input.second_lastName}
              onChange={handleInput}
              placeholder="Segundo Apellido"
              required
            />
          </fieldset>
          <input
            type="file"
            name="featured_image"
            onChange={onImageChange}
          />
          <select
            name="role"
            value={input.role}
            onChange={handleInput}
            required
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>

          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Registrar</button>
        </form>
      </section>
    </>
  );
};

export default AddUsers;