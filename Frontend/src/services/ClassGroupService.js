import http from "../http-common";

const getAll = async () => {
    try {
        const response = await http.get("/class_groups");
        return response;
    } catch (error) {
        console.error("Error en la petición:", error);
        return null;
    }
};

const get = async (id) => {
    try {
        const response = await http.get(`/class_groups/${id}`);
        return response;
    } catch (error) {
        console.error("Error en la petición:", error);
        return null;
    }
};

const create = async (data) => {
    try {
        const response = await http.post("/class_groups", data);
        return response;
    } catch (error) {
        console.error("Error en la creación:", error);
        return null;
    }
};

const update = async (id, data) => {
    try {
        const response = await http.put(`/class_groups/${id}`, data);
        return response;
    } catch (error) {
        console.error("Error en la actualización:", error);
        return null;
    }
};

const remove = async (id) => {
    try {
        const response = await http.delete(`/class_groups/${id}`);
        return response;
    } catch (error) {
        console.error("Error en la eliminación:", error);
        return null;
    }
};

const removeAll = async () => {
    try {
        const response = await http.delete(`/class_groups`);
        return response;
    } catch (error) {
        console.error("Error en la eliminación de todos:", error);
        return null;
    }
};

const findByModule = async (module) => {
    try {
        const response = await http.get(`/class_groups?module=${module}`);
        return response;
    } catch (error) {
        console.error("Error en la búsqueda por módulo:", error);
        return null;
    }
};

const ClassGroupService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByModule
};

export default ClassGroupService;