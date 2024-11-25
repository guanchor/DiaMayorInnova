import http from "../http-common";

const getAll = () => {
  return http.get("/school_centers");
};

const get = id => {
  return http.get(`/school_centers/${id}`);
}

const create = data => {
  return http.post("/school_centers", data);
}

const update = (id, data) => {
  return http.put(`/school_centers/${id}`, data);
}

const remove = id => {
  return http.delete(`/school_centers/${id}`);
}

const removeAll = () => {
  return http.delete(`/school_centers`);
}

const findByName = name => {
  return http.get(`/school_centers?school_name=${name}`);
}

const getSchools = async () => {
  const { data } = await http.get("/school_centers")
  console.log(data);
  return data;
}
const getAccounting = async () => {
  const { data } = await http.get("/accounting_plans")
  console.log(data);
  return data;
}

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
  getSchools,
  getAccounting,
};
