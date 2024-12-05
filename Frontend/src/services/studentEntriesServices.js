import http from "../http-common";

const getStudentEntry = () => http.get(`/student_entries`);
const addStudentEntry = (solutionId, entryData) => http.post(`/solutions/${solutionId}/entries`, entryData);
const updateStudentEntry = (entryId, entryData) => http.put(`/entries/${entryId}`, entryData);


const getAll = async () => {
  try {
    const response = await http.get("/student_entries");
    return response;
  } catch (error) {
    console.error("Error en la petición:", error);
    return null;
  }
};

const create = async (data) => {
  try {
    const response = await http.post("/student_entries", data);
    return response;
  } catch (error) {
    console.error("Error en la creación:", error);
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
  getStudentEntry,
  addStudentEntry,
  updateStudentEntry,
};