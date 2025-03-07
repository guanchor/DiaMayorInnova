import http from "../http-common";
import axios from "axios";

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


  const exportToCSV = async (id) => {
    try {
        const token = localStorage.getItem("site"); // O la clave donde guardes el token
        if (!token) {
            console.error("No hay token disponible en localStorage");
            return;
        }

        const response = await axios.get(`/accounting_plans/${id}/export_csv`, {
            headers: { "AUTH-TOKEN": token }, // Asegurar que se envía el token
            responseType: "blob",
        });

        console.log("✅ Headers de respuesta:", response.headers);

        // Verifica si es un CSV
        if (response.headers["content-type"] !== "text/csv") {
            console.error("La respuesta no es un CSV. Revisar backend.");
            return;
        }

        const url = window.URL.createObjectURL(new Blob([response.data], { type: "text/csv" }));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `pgc_${id}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error("Error exportando CSV:", error);

        if (error.response) {
            console.error("Código de estado:", error.response.status);
            console.error("Headers:", error.response.headers);
            console.error("Cuerpo de la respuesta:", await error.response.data.text());
        }
    }
};


const AccountingPlanService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName,
    getAccountsByPGC,
    exportToCSV
};


export default AccountingPlanService;
