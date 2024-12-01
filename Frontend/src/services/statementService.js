import http from "../http-common";

const getAllStatements = () => http.get("/statements");
const getStatementsByTask = (taskId) => http.get(`/tasks/${taskId}/statements`);
const getStatement = (statementId) => http.get(`/statements/${statementId}`);
const createStatement = (data) => http.post("/statements", data);
const updateStatement = (id, data) => http.put(`/statements/${id}`, data);
const deleteStatement = (id) => http.delete(`/statements/${id}`);

export default {
  getAllStatements,
  getStatementsByTask,
  createStatement,
  updateStatement,
  deleteStatement,
  getStatement,
};