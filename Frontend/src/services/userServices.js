import http from "../http-common";

const getAllUser = () => http.get('/registrations');

export default {
  getAllUser,

};