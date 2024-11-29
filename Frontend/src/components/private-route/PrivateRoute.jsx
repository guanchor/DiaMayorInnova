import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { token, roles, loading, setError } = useAuth();

  useEffect(() => {
    // Si no hay token
    if (!token) {
      setError("No hay token.");
    }

    // Si el usuario no tiene el rol adecuado
    if (allowedRoles.length > 0 && !allowedRoles.some(role => roles.includes(role))) {
      setError("No tienes permiso para acceder a esta ruta.");
    }
  }, [allowedRoles, roles, token, setError]);

  if (loading) {
    return <div>Cargando...</div>;  // O un componente de carga
  }

  if (!token || (allowedRoles.length > 0 && !allowedRoles.some(role => roles.includes(role)))) {
    return <Navigate to="/sign_in" />;
  }

  return <Outlet />;
};

export default PrivateRoute;