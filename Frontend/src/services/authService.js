import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const authService = {
  validateToken: (token) =>
    axios.post(`${API_BASE_URL}/validate_token`, {}, {
      headers: { "AUTH-TOKEN": token },
    }),

  signUp: (formData, encodedCredentials) =>
    axios.post(`${API_BASE_URL}/sign_up`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Basic ${encodedCredentials}`,
      },
    }),

  signIn: (credentials, token = "") => {
    if (!credentials && !token) {
      throw new Error("Se requiere credentials o token para autenticarse.");
    }
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
