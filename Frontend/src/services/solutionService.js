import http from "../http-common";

const addSolution = (statementId, solutionData) => {
  http.post(`/statements/${statementId}/add_solution`, solutionData);
};

const markAsExample = (solutionId, data) => {
  return http.post(`/solutions/${solutionId}/mark_as_example`, data);
};

export default {
  addSolution,
  markAsExample,
};