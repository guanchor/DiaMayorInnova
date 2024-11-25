import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import encodeCredentials from "../utils/authUtils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAvatarUrl, setUserAvatarUrl] = useState(null);
  const navigate = useNavigate();

  const clearInvalidToken = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
    setUserAvatarUrl(null);
    setError("El token ha expirado o es inválido. Por favor, inicie sesión nuevamente.");
    navigate("/sign_in");
  };

  const restoreUserFromToken = async () => {
    if (!token) {
      setLoading(false);
      navigate("/sign_in");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/me", {
        headers: { "AUTH-TOKEN": token },
      });

      if (response.data.is_success) {
        const userData = response.data.data.user;
        setUser(userData);

        setUserAvatarUrl(
          userData.featured_image ? `http://localhost:3000${userData.featured_image}` : null
        );
      } else {
        console.log("Se ejecuta este 1");
        clearInvalidToken(); // Token invalid
      }

    } catch (err) {
      console.error("Error al restaurar el usuario:", err);
      setError("No se pudo restaurar la sesión. Inicie sesión nuevamente.");
      console.log("Se ejecuta este 2");
      clearInvalidToken();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restoreUserFromToken();
  }, [token]);

  const signUpAction = async (encodedCredentials, formData) => {
    try {
      const response = await axios.post("http://localhost:3000/sign_up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      if (response.data && response.data.is_success) {
        const userData = response.data.data?.user;
        const { authentication_token, featured_image } = userData;

        console.log("Datos del usuario:", userData);
        console.log("Token de autenticación:", authentication_token);
        console.log("Imagen destacada:", featured_image);

        setUser(userData);
        setToken(authentication_token);
        localStorage.setItem("auth_token", authentication_token);

        setUserAvatarUrl(
          featured_image
            ? `http://localhost:3000${featured_image}`
            : null
        );

        navigate("/Home");
      } else {
        throw new Error(response.data.message || "Error al registrar el usuario");
      }
    } catch (err) {
      console.error("Error al registrar el usuario:", err);
      setError("Error al registrar el usuario. Por favor, intente nuevamente.");
    }
  };

  const signInAction = async (data) => {
    try {
      let response;

      if (data.email && data.password) {
        //console.log("Credenciales codificadas:", encodeCredentials(data.email, data.password));
        const credentials = encodeCredentials(data.email, data.password);
        response = await axios.post("http://localhost:3000/sign_in", {}, {
          headers: { Authorization: `Basic ${credentials}` },
        });
      } else if (data.authentication_token) {
        response = await axios.post("http://localhost:3000/sign_in", {}, {
          headers: { "AUTH-TOKEN": data.authentication_token },
        });
      }

      //console.log("Respuesta completa del servidor:", response);
      //console.log("HASTA AQUI LLEGA"); // CORRECTO
      if (!response || !response.data) {
        console.log("ENTRA?"); // CORRECTO, NO ENTRA
        console.error("Respuesta inválida del servidor:", response);
        throw new Error("El servidor no devolvió datos válidos.");
      }

      else if (response && response.data && response.data.is_success) {
        //console.log("ENTRA HASTA AQUÍ"); // CORRECTO
        const { user } = response.data.data;
        const authToken = user.authentication_token;

        //console.log("ENTRA HASTA AQUÍ user", user); // CORRECTO
        //console.log("ENTRA HASTA AQUÍ authToken", authToken); // CORRECTO
        if (!user || !authToken) {
          throw new Error("La respuesta no contiene usuario o token.");
        }

        setUser(user);
        setToken(authToken);
        localStorage.setItem("auth_token", authToken);

        //console.log("El AVATAR:", response.data.data.user.featured_image); // HASTA AQUÍ LLEGA BIEN
        setUserAvatarUrl(user.featured_image ? `http://localhost:3000${user.featured_image}` : null);

        navigate("/Home");
      } else {
        console.error("Respuesta del servidor está incompleta:", response.data);
        throw new Error("La respuesta del servidor no contiene usuario o token.");
      }
    } catch (err) {
      console.error("Error de autenticación:", err);
      setError("Error de autenticación. Por favor, verifica tus credenciales.");
    }
  };

  //console.log("Token almacenado en localStorage:", localStorage.getItem("auth_token"));
  //console.log("Token en contexto", token);
  //console.log("Usuario en contexto", user);
  //console.log("Avatar en contexto", userAvatarUrl);

  const logOut = async (explicit = false) => {
    if (!explicit) {
      return;
    }

    try {
      await axios.delete("http://localhost:3000/log_out", {
        headers: {
          "Content-Type": "application/json",
          "AUTH-TOKEN": token,
        },
      });
      setUser(null);
      setToken(null);
      setUserAvatarUrl(null);
      setError(null);
      localStorage.removeItem("auth_token");
      navigate("/sign_in");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setUser(null);
      setToken(null);
      setUserAvatarUrl(null);
      navigate("/sign_in");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signUpAction,
        signInAction,
        logOut,
        userAvatarUrl,
        setUserAvatarUrl,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
