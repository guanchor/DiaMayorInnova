import http from "../http-common";

const getAllStatements = () => http.get("/statements"); // Obtiene todos los enunciados
const getStatementsByTask = (taskId) => http.get(`/tasks/${taskId}/statements`); // Obtiene todos los enunciados de una tarea concreta
const getStatement = (statementId) => http.get(`/statements/${statementId}`); // Obtiene un enunciado concreto
const createStatement = (statementData) => http.post("/statements", { statement: statementData }); // Crea enunciados
const updateStatement = (id, data) => http.put(`/statements/${id}`, data); // Modifica enunciado
const deleteStatement = (id) => http.delete(`/statements/${id}`);  // Borra enunciado
const getSolutions = (statementId) => http.get(`/statements/${statementId}/solutions`); // Obtiene las soluciones para un enunciado

export default {
  getAllStatements,
  getStatementsByTask,
  createStatement,
  updateStatement,
  deleteStatement,
  getStatement,
  getSolutions,
};