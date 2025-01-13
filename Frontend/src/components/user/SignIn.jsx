import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Sign.css";

const SignIn = () => {



  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      auth.signInAction(input.email.toLowerCase(), input.password)
        .then((response) => {
          const user = response?.data?.data?.user;
          const roles = response?.data?.data?.roles;
          // Guardar roles en el contexto si no se han guardado aún
          if (roles) {
            auth.setRoles(roles);  // Guardamos los roles en el contexto
          }
          if (user && user.featured_image) {
            const avatarUrl = `http://localhost:3000${user.featured_image}`;
            auth.setUserAvatarUrl(avatarUrl);
          } else {
            console.log("Response is missing user or featured_image");
          }
        }).catch((error) => {
          console.error("Error during sign-in:", error);
          alert("Hubo un error durante el inicio de sesión, por favor verifica tus credenciales SIGNIN.");
        });
      return;
    }

    alert("Please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="log__section">
        <img className="log__img" src="/images/log.jpg" alt="users imagen" />
        <div className="log__container">
          <h1 className="log__tittle">Iniciar Sesión</h1>
          <form className="log__form" onSubmit={handleSubmitEvent}>
            <div className="inputs__wrapper">
              <div className="form_control">
                <label className="input__wrapper" htmlFor="user-email">Email:
                  <input
                    type="email"
                    id="user-email"
                    name="email"
                    placeholder="example@yahoo.com"
                    aria-describedby="user-email"
                    aria-invalid="false"
                    onChange={handleInput}
                  />
                </label>
              </div>
              <div className="form_control">
                <label className="input__wrapper" htmlFor="password">Password:
                  <input
                    type="password"
                    id="password"
                    name="password"
                    aria-describedby="user-password"
                    aria-invalid="false"
                    onChange={handleInput}
                  />
                </label>
              </div>
            </div>
            {auth.error && <div style={{ color: "red" }}>{auth.error}</div>}
            <button className="btn light">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;