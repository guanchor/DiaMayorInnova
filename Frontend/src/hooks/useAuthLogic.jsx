import { useState } from "react";
import authService from "../services/authService";
import { API_BASE_URL } from "../config";

const useAuthLogic = (navigate) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [userAvatarUrl, setUserAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkTokenValidity = async (requiredRoles = []) => {
    if (!token) {
      setLoading(false);
      navigate("/sign_in");
      return;
    }

    try {
      console.log("Token a validar:", token);
      const response = await authService.validateToken(token);
      //console.log("Respuesta del servidor:", response);

      if (response.data.is_success) {
        const userData = response.data.data.user;
        const roles = response.data.data.roles;
        const newToken = response.data.data.user.authentication_token;
        //console.log("USER:", userData);
        //console.log("ROLES:", roles);
        //console.log("TOKEN:", newToken);
        if (userData && roles) {
          setUser(userData);
          setRoles(roles);
          console.log("desde la validacion !!!!!!!!!!!!!!!!!!!!!!", roles)
          localStorage.setItem("site", newToken);
          setUserAvatarUrl(
            userData.featured_image ? `${API_BASE_URL}${userData.featured_image}` : null
          );

          const hasAccess = requiredRoles.every((role) => roles.includes(role));
          if (!hasAccess) {
            setError("No tienes permiso para acceder a esta ruta.");
            navigate("/sign_in"); // Redirige a una página de error o a otra ruta
          }
        } else {
          setError("Información de usuario incompleta.");
        }
      } else {
        logOut();
        setError("Token inválido.");
      }
    } catch (err) {
      logOut();
      setError("Error de autenticación.");
      console.error("Error en validación de token:", err);
    } finally {
      setLoading(false);
    }
  };

  const signUpAction = async (encodedCredentials, formData) => {
    try {
      const response = await authService.signUp(formData, encodedCredentials);

      if (response.data.is_success) {
        navigate("/Home");
      } else {
        throw new Error(response.data.message || "Error al registrar.");
      }
    } catch (err) {
      console.error("Error al registrar:", err);
      throw err;
    }
  };

  const signInAction = async (email, password) => {
    try {
      const credentials = btoa(`${email}:${password}`);
      //console.log("Credenciales codificadas:", credentials);

      const response = await authService.signIn(credentials);
      //console.log("Respuesta del servidor completa:", response);

      if (response.data.is_success) {
        const { user, token, roles } = response.data.data;
        setUser(user);
        setToken(token);
        setRoles(roles);
        setUserAvatarUrl(
          user.featured_image ? `${API_BASE_URL}${user.featured_image}` : null
        );
        navigate("/Home");
      } else {
        throw new Error(response.data.message || "Error al autenticar.");
      }
    } catch (err) {
      console.error("Error en login:", err);
      if (err.response) {
        // Si el error viene de la respuesta del servidor
        console.error("Error en respuesta del servidor:", err.response.data);
        alert(`Error: ${err.response.data.message || 'Problema al autenticar.'}`);
      } else {
        console.error("Error desconocido:", err);
        alert("Hubo un error durante el inicio de sesión, por favor verifica tus credenciales.");
      }
    }
  };

  const logOut = async () => {
    try {
      await authService.logOut(token);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    } finally {
      setUser(null);
      setToken(null);
      setRoles([]);
      setUserAvatarUrl(null);
      localStorage.removeItem("site");
      navigate("/sign_in");
    }
  };

  return {
    user,
    token,
    roles,
    error,
    userAvatarUrl,
    loading,
    setRoles,
    setUserAvatarUrl,
    checkTokenValidity,
    signUpAction,
    signInAction,
    logOut,
    setError,
  };
};

export default useAuthLogic;
