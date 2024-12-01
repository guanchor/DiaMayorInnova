import http from "../http-common";

const getAllTasks = () => http.get('/tasks');

const getTaskWithStatements = (taskId) => http.get(`/tasks/${taskId}`);

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