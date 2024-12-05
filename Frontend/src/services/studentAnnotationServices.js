import http from "../http-common";

const getAll = async () => {
  try {
    const response = await http.get("/student_annotations");
    return response;
  } catch (error) {
    console.error("Error en la petición:", error);
    return null;
  }
};

const create = async (data) => {

  try {
    const response = await http.post("/student_annotations", data);
    return response;
  } catch (error) {
    console.error("Error en la creación:", error);
    return null;
  }
};

const update = async (id, data) => {
  try {
    const response = await http.put(`/student_annotations/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error en la actualización:", error);
    return null;
  }
};

const remove = async (id) => {
  try {
    const response = await http.delete(`/student_annotations/${id}`);
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