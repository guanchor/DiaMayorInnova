import http from "../http-common";
import axios from "axios";

const getAllUsers = () => http.get('/users');

const createUser = (formData) => http.post('/users', formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const updateUser = async (id, formData) => {
  const response = await http.put(`/users/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const deleteUser = (userId) => http.delete(`/users/${userId}`);

const findByName = (userName) => http.get(`/users?name=${userName}`);

export default {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  findByName,
};