import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Sign.css";

const SignIn = () => {
  const [input, setInput] = useState({ email: "", password: "", });
  const navigate = useNavigate();
  const { signInAction, user, userAvatarUrl, error, loading } = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      signInAction(input)
        .then(() => {
          console.log("Llega aquí - SignIn");
          console.log("Usuario autenticado:", user);
          console.log("URL del avatar:", userAvatarUrl);
        }).catch((error) => {
          console.error("Error during sign-in:", error);
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

  useEffect(() => {
    if (user) {
      console.log("Usuario autenticado actualizado:", user);
      console.log("URL del avatar actualizado:", userAvatarUrl);
      console.log("El error", error);

      // Navegar a la página principal si el usuario está autenticado
      navigate("/Home");
    }
  }, [user, userAvatarUrl, navigate]);

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
            {error && <div style={{ color: "red" }}>{error}</div>}
            {loading && <div>Loading...</div>}
            <button className="btn light" type="submit" disabled={loading}>Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;