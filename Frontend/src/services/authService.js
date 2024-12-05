import http from "../http-common";
import axios from "axios";
import { API_BASE_URL } from "../config";

const authService = {
  validateToken: (token) =>
    http.post(`${API_BASE_URL}/validate_token`, {}, {
      headers: { "AUTH-TOKEN": token },
    }).then((response) => {
      console.log("Respuesta de validación de token:", response);
      return response;
    })
      .catch((error) => {
        console.error("Error al validar token:", error);
        throw error;
      }),

  signUp: (formData) =>
    http.post(`${API_BASE_URL}/users`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  signIn: (credentials, token = "") => {
    if (!credentials && !token) {
      throw new Error("Se requiere credentials o token para autenticarse.");
    }
    // Aquí dejé axios porque si añado http se intentará añadir un token que si no has iniciado sesión aun no existe.
    console.log("Las credenciales en AuthService.js", credentials);
    return axios.post(`${API_BASE_URL}/sign_in`, {}, {
      headers: {
        "Authorization": credentials ? `Basic ${credentials}` : token,
      }
    });
  },

  logOut: (token) =>
    http.delete(`${API_BASE_URL}/log_out`, {
      headers: {
        "Content-Type": "application/json",
        "AUTH-TOKEN": token,
      },
    }),
};

export default authService;
