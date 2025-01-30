import http from "../http-common";

const getAllUsers = () => http.get('/users');
const create = (userData) => http.post('/users', userData);
const updateUser = (userId, userData) => http.put(`/users/${userId}`, userData);
const deleteUser = (userId) => http.delete(`/users/${userId}`);
const findByName = (userName) => http.get(`/users?name=${userName}`);
export default {
  getAllUsers,
  create,
  updateUser,
  deleteUser,
  findByName,
};