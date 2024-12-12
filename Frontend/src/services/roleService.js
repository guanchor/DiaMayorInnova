import http from "../http-common";

const roleService = {
  getRoles: () => http.get("/roles").then((response) => response.data.roles),
};

export default roleService;