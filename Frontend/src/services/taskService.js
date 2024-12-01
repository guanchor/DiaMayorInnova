import http from "../http-common";

const getAllTasks = () => http.get('/tasks');

const getTaskWithStatements = (id) => http.get(`/tasks/${id}`);

const createTask = (taskData) => http.post("/tasks", taskData);

const deleteStatementFromTask = (taskId, statementId) => http.delete(`/tasks/${taskId}/statements/${statementId}`);

const updateTask = (taskId, updatedTaskData) => http.put(`/tasks/${taskId}`, updatedTaskData);

export default {
  getAllTasks,
  getTaskWithStatements,
  createTask,
  deleteStatementFromTask,
  updateTask,
};