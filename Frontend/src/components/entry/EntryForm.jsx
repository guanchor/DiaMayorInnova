import React from "react";
import AnnotationForm from "../annotation/AnnotationForm.jsx";

const EntryForm = ({ solutionIndex, entry, entryIndex, solutions, setSolutions }) => {
  const handleEntryChange = (event) => {
    const updatedSolutions = [...solutions];
    updatedSolutions[solutionIndex].entries[entryIndex][event.target.name] = event.target.value;
    setSolutions(updatedSolutions);
  };

  const removeEntry = () => {
    const updatedSolutions = [...solutions];
    updatedSolutions[solutionIndex].entries = updatedSolutions[solutionIndex].entries.filter(
      (_, i) => i !== entryIndex
    );
    setSolutions(updatedSolutions);
  };

  const addAnnotation = () => {
    const updatedSolutions = [...solutions];
    updatedSolutions[solutionIndex].entries[entryIndex].annotations.push({
      number: updatedSolutions[solutionIndex].entries[entryIndex].annotations.length + 1,
      credit: 0,
      debit: 0,
    });
    setSolutions(updatedSolutions);
  };

  return (
    <div>
      <label>Entrada {entryIndex + 1}:</label>
      <input
        type="number"
        name="entry_number"
        value={entry.entry_number}
        onChange={handleEntryChange}
      />
      <input
        type="date"
        name="entry_date"
        value={entry.entry_date}
        onChange={handleEntryChange}
      />
      <button type="button" onClick={removeEntry}>Eliminar Entrada</button>

      {entry.annotations.map((annotation, annotationIndex) => (
        <AnnotationForm
          key={annotationIndex}
          solutionIndex={solutionIndex}
          entryIndex={entryIndex}
          annotation={annotation}
          annotationIndex={annotationIndex}
          solutions={solutions}
          setSolutions={setSolutions}
        />
      ))}

      <button type="button" onClick={addAnnotation}>Agregar Anotación</button>
    </div>
  );
};

export default EntryForm;
