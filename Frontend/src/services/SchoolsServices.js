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
    return http.get(`/school_centers?name=${name}`);
}

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};
