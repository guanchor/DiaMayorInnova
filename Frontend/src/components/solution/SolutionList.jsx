import React from "react";
import SolutionForm from "./SolutionForm.jsx";

const SolutionList = ({ solutions, setSolutions }) => {
  const addSolution = () => {
    const newSolution = {
      description: "",
      entries: [{
        entry_number: 1,
        entry_date: "",
        annotations: [{ number: 1, credit: 0, debit: 0 }],
      }],
    };
    setSolutions([...solutions, newSolution]);
  };

  return (
    <div>
      {solutions.map((solution, solutionIndex) => (
        <SolutionForm
          key={solutionIndex}
          solution={solution}
          solutionIndex={solutionIndex}
          solutions={solutions}
          setSolutions={setSolutions}
        />
      ))}
      <button type="button" onClick={addSolution}>
        Agregar Solución
      </button>
    </div>
  );
};

export default SolutionList;
