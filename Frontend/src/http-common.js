import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:3000", //Rails url
    headers: {
        "Content-Type": "application/json"
    }
});

http.interceptors.request.use(
    async (config) => {
        // Esperar hasta que el token esté disponible en localStorage
        const token = await getTokenFromLocalStorage();
        if (token) {
            config.headers["AUTH-TOKEN"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        return response; // Si la respuesta es correcta, simplemente la retornamos
    },
    (error) => {
        // Aquí puedes manejar los errores globalmente
        console.error("Error en la respuesta de la API:", error.response || error);
        return Promise.reject(error); // Retornar el error para que el servicio pueda manejarlo
    }
);

const getTokenFromLocalStorage = () => {
    return new Promise((resolve, reject) => {
        const checkToken = setInterval(() => {
            const token = localStorage.getItem("site");
            if (token) {
                clearInterval(checkToken);  // Detener la comprobación una vez que el token esté disponible
                resolve(token);
            }
        }, 100);  // Comprobar cada 100ms
    });
};

export default http;