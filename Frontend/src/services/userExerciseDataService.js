import http from "../http-common";

const getAll = async (id) => {
  const response = await http.get(`/student_exercises/show_user_data?user_id=${id}`);
  console.log("all exercise info of user ", response)
  return response;
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
};