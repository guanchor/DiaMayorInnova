import http from "../http-common";

const getAllTasks = () => http.get('/tasks');

const getTaskWithStatements = (id) => http.get(`/tasks/${id}`);

const createTask = (taskData) => http.post("/tasks", taskData);

export default {
  getAllTasks,
  getTaskWithStatements,
  createTask,
};