import axios from "axios";
import { API_BASE_URL } from "../config";

const authService = {
  validateToken: (token) =>
    axios.post(`${API_BASE_URL}/validate_token`, {}, {
      headers: { "AUTH-TOKEN": token },
    }).then((response) => {
      console.log("Respuesta de validación de token:", response);
      return response;
    })
      .catch((error) => {
        console.error("Error al validar token:", error);
        throw error;
      }),

  signUp: (formData, encodedCredentials) =>
    axios.post(`${API_BASE_URL}/users`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Basic ${encodedCredentials}`,
      },
    }),

  signIn: (credentials, token = "") => {
    if (!credentials && !token) {
      throw new Error("Se requiere credentials o token para autenticarse.");
    }

    console.log("Las credenciales en AuthService.js", credentials);
    return axios.post(`${API_BASE_URL}/sign_in`, {}, {
      headers: {
        "Authorization": credentials ? `Basic ${credentials}` : token,
      }
    });
  },

  logOut: (token) =>
    axios.delete(`${API_BASE_URL}/log_out`, {
      headers: {
        "Content-Type": "application/json",
        "AUTH-TOKEN": token,
      },
    }),
};

export default authService;
