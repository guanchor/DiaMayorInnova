import React from "react";

const AnnotationForm = ({ solutionIndex, entryIndex, annotation, annotationIndex, solutions, setSolutions }) => {
  const handleAnnotationChange = (event) => {
    const updatedSolutions = [...solutions];
    updatedSolutions[solutionIndex].entries[entryIndex].annotations[annotationIndex][event.target.name] = event.target.value;
    if (event.target.name === "account_number") {
      updatedSolutions[solutionIndex].entries[entryIndex].annotations[annotationIndex].account_number = Number(event.target.value);
    }
    setSolutions(updatedSolutions);
  };

  const removeAnnotation = () => {
    const updatedSolutions = [...solutions];
    updatedSolutions[solutionIndex].entries[entryIndex].annotations = updatedSolutions[solutionIndex].entries[entryIndex].annotations.filter(
      (_, i) => i !== annotationIndex
    );
    setSolutions(updatedSolutions);
  };

  return (
    <div>
      <label>Apunte {annotationIndex + 1}:</label>
      <input
        type="number"
        name="number"
        value={annotation.number}
        onChange={handleAnnotationChange}
      />
      <input
        type="number"
        name="account_number"
        value={annotation.account_number || 0}
        onChange={handleAnnotationChange}
      />
      <input
        type="number"
        name="credit"
        value={annotation.credit}
        onChange={handleAnnotationChange}
      />
      <input
        type="number"
        name="debit"
        value={annotation.debit}
        onChange={handleAnnotationChange}
      />
      <button type="button" onClick={removeAnnotation}>Eliminar Apunte</button>
    </div>
  );
};

export default AnnotationForm;
