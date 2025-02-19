import http from "../http-common";

const getAll = async () => {
  const response = await http.get(`/student_exercises`);
  console.log("all exercise info of user ", response)
  return response;
};

const getById = async (exerciseId) => {
  try {
    const response = await http.get(`/student_exercises/${exerciseId}`);
    console.log("Response data:", response.data);
    return response;
  } catch (error) {
    console.error("Error obteniendo el ejercicio:", error);
    return null;
  }
};

const create = async (exerciseData) => {
  console.log(exerciseData)
  try {
    const response = await http.post("/student_exercises", exerciseData);
    return response;
  } catch (error) {
    console.error("Error en la creación de la tarea del usuario:", error);
    return null;
  }
};

const start = async (exerciseId) => {
  try {
    const response = await http.post(`/student_exercises/${exerciseId}/start`);
    return response;
  } catch (error) {
    console.error("Error al iniciar el examen:", error);
    return null; // podemos lanzar un throw error y manejarlo en el componente...
  }
};

const finish = async (exerciseId) => {
  try {
    const response = await http.post(`/student_exercises/${exerciseId}/finish`);
    return response;
  } catch (error) {
    console.error("Error al finalizar el examen:", error);
    return null;
  }
};

const update = async (exerciseId, data) => {
  try {
    const response = await http.put(`/student_exercises/${exerciseId}`, data);
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
  getById,
  create,
  update,
  start,
  finish,
};