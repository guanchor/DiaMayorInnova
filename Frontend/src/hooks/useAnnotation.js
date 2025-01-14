import { useState } from "react";

const useAnnotation = () => {

  const [annotations, setAnnotations] = useState([]);
  const generateUid = () => `id-${Math.random().toString(36).substr(2, 9)}`;

  const addAnnotation = (entryId) => {
    const entryAnnotations = annotations.filter(annotation => annotation.student_entry_id === entryId);
    const nextAnnotationNumber = entryAnnotations.length + 1;

    const initialAnnotation = {
      uid: generateUid(),
      student_entry_id: entryId,
      account_id: 1,
      number: nextAnnotationNumber,
      account_number: "",
      debit: "",
      credit: "",
    };
    setAnnotations(prevAnnotations => [...prevAnnotations, initialAnnotation]);
  };

  const updateAnnotation = (annotationUid, updatedAnnotation) => {
    const newAnnotations = annotations.map(annotation =>
      annotation.uid === annotationUid ? { ...annotation, ...updatedAnnotation } : annotation
    );
    setAnnotations(newAnnotations);
  };

  const deleteAnnotation = (annotationUid) => {
    setAnnotations(annotations.filter(annotation => annotation.uid !== annotationUid));
  };

  return {
    addAnnotation,
    deleteAnnotation,
    updateAnnotation,
    annotations,
  }
}

export default useAnnotation
