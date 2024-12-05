import http from "../http-common";

const addEntry = (solutionId, entryData) => http.post(`/solutions/${solutionId}/entries`, entryData);
const updateEntry = (entryId, entryData) => http.put(`/entries/${entryId}`, entryData);

export default {
  addEntry,
  updateEntry
};