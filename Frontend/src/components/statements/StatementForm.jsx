import React, { useState, useEffect } from "react";
import statementService from "../../services/statementService";


const StatementForm = ({ onStatementCreated, onAddSolution, solutions: propSolutions }) => {
  const [solutions, setSolutions] = useState(propSolutions || []);
  const [definition, setDefinition] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    setSolutions(propSolutions);
  }, [propSolutions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos de soluciones antes de enviar al BACKEND:", solutions);
    if (!solutions) {
      console.error("Error: solutions es undefined");
      return;
    }
    
    const hasEmptySolutions = solutions.some((solution) => 
      !solution.description || 
      solution.entries.some((entry) => 
        !entry.entry_date || 
        !entry.entry_number || 
        entry.annotations.some((annotation) => 
          annotation.credit === undefined || 
          annotation.debit === undefined
        )
      )
    );
  
    if (hasEmptySolutions) {
      console.error("Error: Hay campos vacíos en las soluciones.");
      alert("Por favor, complete todos los campos antes de enviar.");
      return;
    }
    
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
            credit: parseFloat(annotation.credit),
            debit: parseFloat(annotation.debit),
          })),
        })),
      })),
    };

    console.log("Datos COMPLETOS antes de enviar al backend:", statementData);
    try {
      const response = await statementService.createStatement(statementData);
      console.log("Respuesta del servidor:", response);
      if (onStatementCreated) {
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
          annotations: [{ number: 1, account_number: 0, credit: 0, debit: 0 }],
        }],
      }]);
    } catch (error) {
      console.error("Error creando el enunciado:", error.response || error);
      alert("Hubo un error al crear el enunciado. Por favor, intenta de nuevo.");
    }
  };

  return (
    <section className="statement-page__form">
      <form className="statement-page__form--form" onSubmit={handleSubmit}>
        <h2 className="task-page__header">Crear Enunciado</h2>
        <div>
          <label className="statement-page__label--definition">Definición:</label>
          <textarea
            className="statement-page__input"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          />
        </div>
        <div>
          <label className="statement-page__label--explanation">Explicación:</label>
          <textarea
            className="statement-page__input"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>
        <div className="statement-page__buttons-container">
          <label statement-page__label--visibility>
            Público:
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          </label>
        <button type="submit" className="statement-page__button--form">Finalizar</button>
        <button type="button" onClick={onAddSolution} className="statement-page__button--form">Añadir Solución</button>
        </div>

      </form>
    </section>
  );
};

export default StatementForm;