import React from "react";
import EntryForm from "../entry/EntryForm.jsx";

const SolutionForm = ({ solution, solutionIndex, solutions, setSolutions }) => {
  const handleSolutionChange = (event) => {
    const updatedSolutions = [...solutions];
    updatedSolutions[solutionIndex].description = event.target.value;
    setSolutions(updatedSolutions);
  };

  const addEntry = () => {
    const updatedSolutions = [...solutions];
    updatedSolutions[solutionIndex].entries.push({
      entry_number: updatedSolutions[solutionIndex].entries.length + 1,
      entry_date: "",
      annotations: [{ number: 1, account_number: 0, credit: 0, debit: 0 }],
    });
    setSolutions(updatedSolutions);
  };

  const removeSolution = () => {
    const updatedSolutions = solutions.filter((_, index) => index !== solutionIndex);
    setSolutions(updatedSolutions);
  };

  return (
    <div>
      <div>
        <label>Solución {solutionIndex + 1}:</label>
        <textarea
          value={solution.description}
          onChange={handleSolutionChange}
        />
        <button type="button" onClick={removeSolution}>Eliminar Solución</button>
      </div>

      {solution.entries.map((entry, entryIndex) => (
        <EntryForm
          key={entryIndex}
          solutionIndex={solutionIndex}
          entry={entry}
          entryIndex={entryIndex}
          solutions={solutions}
          setSolutions={setSolutions}
        />
      ))}

      <button type="button" onClick={addEntry}>Agregar Asiento</button>
    </div>
  );
};

export default SolutionForm;