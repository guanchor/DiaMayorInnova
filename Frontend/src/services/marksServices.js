import http from "../http-common";


const getAll = (id) => {
  try {
    console.log("servicio de mark", id)
    const marks = http.get(`/marks?exercise_id=${id}`)
    console.log("marks getall", marks)
    return marks;
  } catch (error) {
    console.log("Error en la petición getAll: ", error);
    return null;
  }
};

const create = async (data) => {
  try {
    const response = await http.post("/marks", { mark: data });
    return response;
  } catch (error) {
    console.error("Error en la creación:", error);
    return null;
  }
};

const update = async (id, data) => {
  try {
    const response = await http.put(`/mark/${id}`, { mark: data });
    return response;
  } catch (error) {
    console.error("Error en la actualización:", error);
    return null;
  }
};

const remove = async (id) => {
  try {
    const response = await http.delete(`/mark/${id}`);
    return response;
  } catch (error) {
    console.error("Error en la eliminación:", error);
    return null;
  }
};



export default {
  getAll,
  create,
};