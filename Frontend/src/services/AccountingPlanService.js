import http from "../http-common";

const getAll = () => {
    return http.get("/accounting_plans"); // "Backend/config/routes.rb"
};

const get = id => {
    return http.get(`/accounting_plans/${id}`);
};

const create = data => {
    return http.post("/accounting_plans", data);
};

const update = (id, data) => {
    return http.put(`/accounting_plans/${id}`, data);
};

const remove = id => {
    return http.delete(`/accounting_plans/${id}`)
};

const removeAll = () => {
    return http.delete("/accounting_plans");
};

const findByName = name => {
    return http.get(`/accounting_plans?name=${name}`);
};

const AccountingPlanService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};

export default AccountingPlanService;
