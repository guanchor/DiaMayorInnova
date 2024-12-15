import http from "../http-common";

const getAll = async () => {
  try {
    const response = http.get("/accounts");
    return response;
  } catch (error) {
    console.error("Error en la petición getAll: ", error);
    return null;
  }
};

const get = async (id) => {
  try {
    const response = await http.get(`/accounts/${id}`);
    return response;
  } catch (error) {
    console.log("Error en la petición get: ", error);
    return null;
  }
};

const create = async (data) => {
  try {
    const response = await http.post("/accounts", data);
    return response;
  } catch (error) {
    console.error("Error en la creación:", error);
    return null;
  }
};

const update = async (id, data) => {
  try {
    const response = await http.put(`/accounts/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error en la actualización:", error);
    return null;
  }
};

const remove = async (id) => {
  try {
    const response = await http.delete(`/accounts/${id}`)
    return response;
  } catch (error) {
    console.error("Error en la eliminación:", error);
    return null;
  }
};

const removeAll = async () => {
  try {
    const response = await http.delete("/accounts");
    return response;
  } catch (error) {
    console.error("Error en la eliminación de todos:", error);
    return null;
  }
};

const findByNumber = async (number) => {
  const response = await http.get(`/accounts?accountNumber=${number}`);
  return response;

};

const AccountService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByNumber
};

export default AccountService;
// # A