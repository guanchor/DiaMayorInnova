import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthLogic from "../hooks/useAuthLogic";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const auth = useAuthLogic(navigate);

  useEffect(() => {
    auth.checkTokenValidity();
  }, [auth.token]);

  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("site", auth.token);
    } else {
      localStorage.removeItem("site");
    }
  }, [auth.token]);

  if (auth.loading || !auth.roles) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);