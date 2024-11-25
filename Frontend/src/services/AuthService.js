import axios from "axios";

export const sendAuthRequest = async (endpoint, credentials) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/${endpoint}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: credentials ? `Basic ${credentials}` : "",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error en sendAuthRequest:", error);
    throw error;
  }
};

/* esto esta mal e incompleto */