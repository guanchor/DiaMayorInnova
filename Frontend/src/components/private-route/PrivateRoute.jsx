import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { token, roles } = useAuth();

  if (roles === undefined) {
    return <div>Loading...</div>;  // O un componente de carga
  }

  const userRoles = Array.isArray(roles) ? roles : [];
  
  if (!token) return <Navigate to="/sign_in" />;

  if (allowedRoles.length > 0 && !allowedRoles.some(role => roles.includes(role))){
    return <Navigate to="/sign_in" />;
  }

  return <Outlet />;
};

export default PrivateRoute;