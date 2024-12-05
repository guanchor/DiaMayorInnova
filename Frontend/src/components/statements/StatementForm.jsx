import React, { useState } from "react";
import statementService from "../../services/statementService";
import SolutionList from "../solution/SolutionList";


const StatementForm = ({ onStatementCreated }) => {
  const [definition, setDefinition] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  // Estado para manejar las soluciones, entradas y anotaciones
  const [solutions, setSolutions] = useState([{
    description: "",
    entries: [{
      entry_number: 1,
      entry_date: "",
      annotations: [{ number: 1, credit: 0, debit: 0 }],
    }],
  }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const statementData = {
      definition,
      explanation,
      is_public: isPublic,
      solutions_attributes: solutions.map((solution) => ({
        description: solution.description,
        entries_attributes: solution.entries.map((entry) => ({
          entry_number: entry.entry_number,
          entry_date: entry.entry_date,
          annotations_attributes: entry.annotations.map((annotation) => ({
            number: annotation.number,
            account_number: annotation.account_number,
            credit: annotation.credit,
            debit: annotation.debit,
          })),
        })),
      })),
    };

    try {
      const response = await statementService.createStatement(statementData);
      console.log("Respuesta del servidor:", response);
      if (onStatementCreated) { // Asegúrate de que onStatementCreated es una función
        onStatementCreated(response.data); // Llama a la función del padre
      }
      setDefinition("");
      setExplanation("");
      setIsPublic(false);
      setSolutions([{
        description: "",
        entries: [{
          entry_number: 1,
          entry_date: "",
          annotations: [{ number: 1, credit: 0, debit: 0 }],
        }],
      }]);
    } catch (error) {
      console.error("Error creando el enunciado:", error.response || error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Definición:</label>
        <textarea value={definition} onChange={(e) => setDefinition(e.target.value)} />
      </div>
      <div>
        <label>Explicación:</label>
        <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} />
      </div>
      <div>
        <label>
          Público:
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </label>
      </div>

      <SolutionList solutions={solutions} setSolutions={setSolutions} />
      <button type="submit">Crear Enunciado</button>
    </form>
  );
};

export default StatementForm;