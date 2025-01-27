import http from "../http-common";

const getAll = async () => {
  const response = await http.get(`/student_exercises`);
  console.log("all exercise info of user ", response)
  return response;
};


const getByTaskId = async (id) => {
  try {
    const response = await http.get(`/student_exercises/find_by_task_id?task_id=${id}`);
    return response;
  } catch (error) {
    return null;
  }
};


const create = async (data) => {
  console.log(data)
  try {
    const response = await http.post("/exercises", data);
    return response;
  } catch (error) {
    console.error("Error en la creación de la tarea del usuario:", error);
    return null;
  }
};

const update = async (id, data) => {
  try {
    const response = await http.put(`/student_entries/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error en la actualización:", error);
    return null;
  }
};

const remove = async (id) => {
  try {
    const response = await http.delete(`/student_entries/${id}`);
    return response;
  } catch (error) {
    console.error("Error en la eliminación:", error);
    return null;
  }
};


export default {
  getAll,
  create,
  getByTaskId,
};