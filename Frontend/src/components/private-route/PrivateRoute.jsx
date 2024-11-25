import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute = () => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/sign_in" />;
  return <Outlet />;
};

export default PrivateRoute;