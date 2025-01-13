import http from "../http-common";

const getAll = (id) => {
  try {
    console.log(id)
    const response = http.get(`/student_annotations?student_entry_id=${id}`);
    console.log(response, "repsuesta annota")
    return response;
  } catch (error) {
    console.error("Error en la petición:", error);
    return null;
  }
};
const create = async (data) => {
  try {
    const response = await http.post(`/student_annotations`, { student_annotation: data });
    return response || {};
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