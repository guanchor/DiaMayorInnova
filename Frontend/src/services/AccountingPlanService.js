import http from "../http-common";

// ✅ Ajout automatique du token dans toutes les requêtes protégées
const getAuthHeaders = () => {
    const token = localStorage.getItem("jwt_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Récupérer tous les PGCs
const getAll = async () => {
    try {
        const response = await http.get("/accounting_plans", {
            headers: getAuthHeaders()
        });
        return response;
    } catch (error) {
        console.error("Error en la petición getAll: ", error);
        return null;
    }
};

// ✅ Récupérer un seul PGC
const get = async (id) => {
    try {
        const response = await http.get(`/accounting_plans/${id}`, {
            headers: getAuthHeaders()
        });
        return response;
    } catch (error) {
        console.error("Error en la petición get:", error);
        return null;
    }
};

// ✅ Créer un PGC
const create = async (data) => {
    try {
        const response = await http.post("/accounting_plans", data, {
            headers: getAuthHeaders()
        });
        return response;
    } catch (error) {
        console.error("Error en la creación:", error);
        return null;
    }
};

// ✅ Mettre à jour un PGC
const update = async (id, data) => {
    try {
        const response = await http.put(`/accounting_plans/${id}`, data, {
            headers: getAuthHeaders()
        });
        return response;
    } catch (error) {
        console.error("Error en la actualización:", error);
        return null;
    }
};

// ✅ Supprimer un PGC
const remove = async (id) => {
    try {
        const response = await http.delete(`/accounting_plans/${id}`, {
            headers: getAuthHeaders()
        });
        return response;
    } catch (error) {
        console.error("Error en la eliminación:", error);
        return null;
    }
};

// ✅ Supprimer tous les PGCs
const removeAll = async () => {
    try {
        const response = await http.delete("/accounting_plans", {
            headers: getAuthHeaders()
        });
        return response;
    } catch (error) {
        console.error("Error en la eliminación de todos:", error);
        return null;
    }
};

// ✅ Chercher un PGC par son nom
const findByName = async (name) => {
    try {
        const response = await http.get(`/accounting_plans?name=${name}`, {
            headers: getAuthHeaders()
        });
        return response;
    } catch (error) {
        console.error("Error en la búsqueda por módulo:", error);
        return null;
    }
};

// ✅ Récupérer les comptes d'un PGC (avec Auth)
const getAccountsByPGC = (id) => {
    return http.get(`/accounting_plans/${id}/accounts_by_PGC`, {
        headers: getAuthHeaders()
    });
};

// ✅ Télécharger le fichier XLSX des comptes d’un PGC (avec Auth)
const exportXLSXByPGC = (id) => {
    return http.get(`/accounting_plans/${id}/export_xlsx_by_pgc`, {
        headers: getAuthHeaders(),
        responseType: "blob" // 🔥 Indique qu'on attend un fichier
    });
};

const importXLSX = async (formData) => {
    try {
        const response = await http.post("/accounting_plans/import_xlsx", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // En-tête correct pour les fichiers
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
        });

        if (response.status === 200) {
            console.log("Importation réussie :", response.data);
            return response.data;
        } else {
            console.error("Erreur lors de l'importation :", response.status, response.data);
            throw new Error("Une erreur est survenue lors de l'importation.");
        }
    } catch (error) {
        console.error("Erreur lors de l'importation :", error);
        throw new Error("Erreur lors de l'importation du fichier. Vérifiez le format et réessayez.");
    }
};

// ✅ Service exporté avec les nouvelles méthodes sécurisées
const AccountingPlanService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName,
    getAccountsByPGC,
    importXLSX, 
    exportXLSXByPGC // ✅ Ajout de la fonction d'exportation
};

export default AccountingPlanService;
