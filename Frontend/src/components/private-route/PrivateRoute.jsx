import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { token, role, loading, setError } = useAuth();

  useEffect(() => {
    if (!token) {
      setError("No hay token.");
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      setError("No tienes permiso para acceder a esta ruta.");
    }
  }, [allowedRoles, role, token, setError]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!token || (allowedRoles.length > 0 && !allowedRoles.includes(role))) {
    return <Navigate to="/sign_in" />;
  }

  return <Outlet />;
};

export default PrivateRoute;