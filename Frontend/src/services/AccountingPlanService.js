import http from "../http-common";

const getAll = async () => {
    try {
        const response = http.get("/accounting_plans"); // "Backend/config/routes.rb"
        return response;
    } catch (error) {
        console.error("Error en la petición getAll: ", error);
        return null;
    }
};

const get = async (id) => {
    try {
        const response = await http.get(`/accounting_plans/${id}`);
        return response;
    } catch (error) {
        console.error("Error en la petición get:", error);
        return null;
    }
};

  
const create = async (data) => {
    try {
        const response = await http.post("/accounting_plans", data);
        return response;
    } catch (error) {
        console.error("Error en la creación:", error);
        return null;
    }
};

const update = async (id, data) => {
    try {
        const response = await http.put(`/accounting_plans/${id}`, data);
        return response;
    } catch (error) {
        console.error("Error en la actualización:", error);
        return null;
    }
};

const remove = async (id) => {
    try {
        const response = await http.delete(`/accounting_plans/${id}`)
        return response;
    } catch (error) {
        console.error("Error en la eliminación:", error);
        return null;
    }
};

const removeAll = async () => {
    try {
        const response = await http.delete("/accounting_plans");
        return response;
    } catch (error) {
        console.error("Error en la eliminación de todos:", error);
        return null;
    }
};

const findByName = async (name) => {
    try {
        const response = await http.get(`/accounting_plans?name=${name}`);
        return response;
    } catch (error) {
        console.error("Error en la búsqueda por módulo:", error);
        return null;
    }
};


const getAccountsByPGC = (id) => {
    return http.get(`/accounting_plans/${id}/accounts_by_PGC`);
  };

const exportCSV = (id) => {
    try {
        const response = http.get(`/accounting_plans/${id}/export_csv`, { 
            responseType: "blob" 
        }); //Binary Large Object for csv files, pdf, etc...
        return response;
    } catch (error) {
        console.error("Error al exportar CSV:", error);
        return null;
    }
}

const AccountingPlanService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName,
    exportCSV,
    getAccountsByPGC
};


export default AccountingPlanService;
