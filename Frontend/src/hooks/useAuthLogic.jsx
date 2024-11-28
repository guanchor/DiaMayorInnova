import { useState } from "react";
import authService from "../services/authService";

const useAuthLogic = (navigate) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [userAvatarUrl, setUserAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkTokenValidity = async () => {
    if (!token) {
      setLoading(false);
      navigate("/sign_in");
      return;
    }

    try {
      const response = await authService.validateToken(token);

      if (response.data.is_success) {
        const userData = response.data.data.user;
        const rolesData = response.data.data.roles;
        setUser(userData);
        setRoles(rolesData);
        setUserAvatarUrl(
          userData.featured_image ? `${API_BASE_URL}${userData.featured_image}` : null
        );
      } else {
        logOut();
        setError("Token inválido.");
      }
    } catch (err) {
      logOut();
      setError("Error de autenticación.");
    } finally {
      setLoading(false);
    }
  };

  const signUpAction = async (encodedCredentials, formData) => {
    try {
      const response = await authService.signUp(formData, encodedCredentials);

      if (response.data.is_success) {
        const { user, token } = response.data.data;
        setUser(user);
        setToken(token);
        navigate("/Home");
      } else {
        throw new Error(response.data.message || "Error al registrar.");
      }
    } catch (err) {
      console.error("Error al registrar:", err);
      throw err;
    }
  };

  const signInAction = async (credentials) => {
    try {
      const response = await authService.signIn(credentials);

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
      throw err;
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
  };
};

export default useAuthLogic;
