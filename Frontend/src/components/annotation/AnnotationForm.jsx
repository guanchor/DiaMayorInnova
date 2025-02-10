import React from "react";

const AnnotationForm = ({ solutionIndex, entryIndex, annotationIndex, solutions, setSolutions }) => {
  const annotation = solutions[solutionIndex].entries[entryIndex].annotations[annotationIndex];
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
    <div className="statement-page__annotation-row">
      {/* <label>Apunte {annotationIndex + 1}:</label> */}
      <input
        type="number"
        name="number"
        value={annotation.number}
        onChange={handleAnnotationChange}
        className="statement-page__input"
        placeholder="Apunte"
      />
      <input
        type="number"
        name="account_number"
        value={annotation.account_number || ""}
        onChange={handleAnnotationChange}
        className="statement-page__input"
        placeholder="Nº Cuenta"
      />
      <input
        type="text"
        name="account_name"
        value={annotation.account_name || ""}
        readOnly
        className="statement-page__input"
        placeholder="Nombre Cuenta"
      />
      <input
        type="number"
        name="debit"
        value={annotation.debit}
        disabled={!!annotation.credit && annotation.credit !== "" && annotation.credit !== 0}
        onChange={handleAnnotationChange}
        className="statement-page__input"
        placeholder="Debe"
      />
      <input
        type="number"
        name="credit"
        value={annotation.credit}
        disabled={!!annotation.debit && annotation.debit !== "" && annotation.debit !== 0}
        onChange={handleAnnotationChange}
        className="statement-page__input"
        placeholder="Haber"
      />
      <button
        type="button"
        onClick={removeAnnotation}
        className="statement-page__button statement-page__button-delete"
      >
        <i className="fi fi-rr-trash"></i>
      </button>
    </div>
  );
};

export default AnnotationForm;
