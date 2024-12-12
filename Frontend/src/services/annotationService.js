import http from "../http-common";

const addAnnotation = (entryId, annotationData) => http.post(`/entries/${entryId}/annotations`, annotationData);

const updateAnnotation = (annotationId, annotationData) => http.put(`/annotations/${annotationId}`, annotationData);

export default {
  addAnnotation,
  updateAnnotation
};
