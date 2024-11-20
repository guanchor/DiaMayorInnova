import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import encodeCredentials from "../utils/authUtils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAvatarUrl, setUserAvatarUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userAvatarUrl después de actualizar:", userAvatarUrl);
  }, [userAvatarUrl]);
  
  useEffect(() => {
    const checkTokenValidity = async () => {
      if (!token) {
        setLoading(false);
        navigate("/sign_in");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/validate_token",
          {},
          {
            headers: {
              "AUTH-TOKEN": token,
            },
          }
        );

        if (response.data.is_success) {
          setUser(response.data.data.user);
          const avatarUrl = response.data.data.user.featured_image
            ? `http://localhost:3000${avatarUrl}`
            : null;
            if (!userAvatarUrl) {
              setUserAvatarUrl(avatarUrl);
            }
        } else {
          setError("Token inválido, Por favor, inicie sesión nuevamente.");
          logOut();
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Token inválido o sesión expirada.");
          logOut();
        } else {
          setError("Error de autenticación.");
          logOut();
        }
      } finally {
        setLoading(false);
      }
    };

    checkTokenValidity();
  }, [token, navigate, userAvatarUrl]);


  useEffect(() => {
    const handleNavigation = () => {
      checkTokenValidity();
    };

    window.addEventListener("beforeunload", handleNavigation);

    return () => {
      window.removeEventListener("beforeunload", handleNavigation);
    };
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("site", token);
    } else {
      localStorage.removeItem("site");
    }
  }, [token]);

  const signUpAction = async (encodedCredentials, formData) => {
    try {
      let response = await axios.post("http://localhost:3000/sign_up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Basic ${encodedCredentials}`,
        },
      });

      if (response.data && response.data.is_success) {
        const user = response.data.data.user;
        const token = response.data.data.token;

        setUser(user);
        setToken(token);
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
        response = await sendAuthRequest("sign_in", credentials);
      } else if (data.authentication_token) {
        response = await sendAuthRequest("sign_in", data.authentication_token);
      }

      if (response.data && response.data.is_success) {
        const { user, token } = response.data.data;
        setUser(user);
        setToken(token);
        const avatarUrl = `http://localhost:3000${user.featured_image}`;
        setUserAvatarUrl(avatarUrl);
        // navigate("/Home");
        return response;
      } else {
        throw new Error(response.data.message || "Error en la autenticación");
      }
    } catch (err) {
      console.error(err);
      throw err;
      // alert("Error de autenticación.");
    }
  };

  const sendAuthRequest = async (endpoint, credentials) => {
    try {
      const response = await axios.post(`http://localhost:3000/${endpoint}`, {}, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": credentials ? `Basic ${credentials}` : "",
        },
      });
      return response;
    } catch (error) {
      console.error("Error en sendAuthRequest", error);
      throw error;
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
      setUserAvatarUrl(null);
      localStorage.removeItem("site");
      navigate("/Home");

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
    <AuthContext.Provider value={{ token, user, signUpAction, signInAction, logOut, error, setUserAvatarUrl, userAvatarUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
}