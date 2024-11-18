import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import encodeCredentials from "../utils/authUtils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .post("http://localhost:3000/validate_token",
          {},
          {
            headers: {
              "AUTH-TOKEN": token,
            },
          })
        .then((response) => {
          if (response.data.is_success) {
            setUser(response.data.data.user);
          } else {
            setError("Token inválido. Por favor, inicie sesión nuevamente.");
            logOut();
          }
        })
        .catch(() => {
          setError("Error de autenticación.");
          logOut();
        });
    }
  }, [token]);

  const signUpAction = async (encodedCredentials) => {
    try {
      let response = await axios.post("http://localhost:3000/sign_up", 
        {},
        {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${encodedCredentials}`,
        },
      });

      if (response.data && response.data.is_success) {
        const user = response.data.data.user;
        const token = response.data.data.token;

        setUser(user);
        setToken(token);
        localStorage.setItem("site", token);
        navigate("/Home");
      } else {
        throw new Error(response.data.message || "Error al registrar el usuario");
      }
    } catch (err) {
      console.error("Error al enviar solicitud de registro", err);
      alert("Error al registrar el usuario.");
    }
  };

  const signInAction = async (data) => {
    try {
      let response;

      if (data.email && data.password) {
        const credentials = encodeCredentials(data.email, data.password);

        response = await axios.post(
          "http://localhost:3000/sign_in",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Basic ${credentials}`,
            },
          }
        );
      } else if (data.authentication_token) {
        response = await axios.post(
          "http://localhost:3000/sign_in",
          { user: { authentication_token: data.authentication_token } },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      console.log("Response Data:", response.data);
      if (response.data && response.data.is_success) {
        const user = response.data.data.user;
        const token = response.data.data.token;

        setUser(user);
        setToken(token);
        localStorage.setItem("site", token);
        navigate("/Home");
      } else {
        throw new Error(response.data.message || "Error en la autenticación");
      }
    } catch (err) {
      console.error(err);
      alert("Error de autenticación.");
    }
  };

  const logOut = async () => {
    try {
      await axios.delete("http://localhost:3000/log_out", {
        headers: {
          "Content-Type": "application/json",
          "AUTH-TOKEN": token,
        },
      });

      setUser(null);
      setToken(null);
      localStorage.removeItem("site");

      navigate("/Home");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión en el servidor.");
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, signUpAction, signInAction, logOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
}