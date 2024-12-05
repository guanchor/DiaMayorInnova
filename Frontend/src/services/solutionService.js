import http from "../http-common";

const addSolution = (statementId, solutionData) => {
  http.post(`/statements/${statementId}/add_solution`, solutionData);
};

export default {
  addSolution,
};