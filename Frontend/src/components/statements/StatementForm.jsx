import React, { useState, useEffect, useRef } from "react";
import statementService from "../../services/statementService";


const StatementForm = ({ onStatementCreated, onAddSolution, solutions: propSolutions, onSaveSolution, statement }) => {
  const [solutions, setSolutions] = useState(propSolutions || []);
  const [definition, setDefinition] = useState(statement?.definition || "");
  const [explanation, setExplanation] = useState(statement?.explanation || "");
  const [isPublic, setIsPublic] = useState(statement?.is_public || false);
  const [errorMessage, setErrorMessage] = useState("");

  const prevStatementRef = useRef();
  const prevSolutionsRef = useRef();

  useEffect(() => {
    const hasStatementChanged = JSON.stringify(prevStatementRef.current) !== JSON.stringify(statement);
    const hasSolutionsChanged = JSON.stringify(prevSolutionsRef.current) !== JSON.stringify(propSolutions);
    if (hasStatementChanged || hasSolutionsChanged) {
      console.log("Statement prop received:", statement);
      setDefinition(statement?.definition || "");
      setExplanation(statement?.explanation || "");
      setIsPublic(statement?.is_public || false);
      setSolutions(statement?.solutions_attributes || []);
    }

    prevStatementRef.current = statement;
    prevSolutionsRef.current = propSolutions;
  }, [propSolutions, statement]);

  const handleAddSolution = () => {
    const newSolution = {
      description: "",
      entries: [
        {
          entry_number: 1,
          entry_date: "",
          annotations: [
            {
              number: 1,
              account_number: 0,
              credit: 0,
              debit: 0
            }
          ]
        }
      ]
    };
    setSolutions((prevSolutions) => [...prevSolutions, newSolution]);
    if (onAddSolution) {
      onAddSolution(newSolution);
    }
  };

  const handleSaveSolution = (updatedSolution, index) => {
    const updatedSolutions = [...solutions];
    updatedSolutions[index] = updatedSolution;
    setSolutions(updatedSolutions);
    if (onSaveSolution) {
      onSaveSolution(updatedSolution);
    }
  };

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
      setErrorMessage("Por favor, complete todos los campos antes de enviar.");
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
      if (statement?.id) {
        // Actualizar enunciado existente
        const response = await statementService.updateStatement(statement.id, statementData);
        console.log("Respuesta del servidor (actualización):", response);
        if (onStatementCreated) {
          onStatementCreated(response.data); 
        }
      } else {
        const response = await statementService.createStatement(statementData);
        console.log("Respuesta del servidor:", response);
        if (onStatementCreated) {
          onStatementCreated(response.data);
        }
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
      setErrorMessage("Hubo un error al crear el enunciado. Por favor, inténtelo de nuevo.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <>
      <h2 className="statement-page__form--header">Crear Enunciado</h2>
      <form className="statement-page__form--form" onSubmit={handleSubmit}>
        <div className="statement-page__form--content">
          <label className="statement-page__label--definition">Definición:</label>
          <textarea
            className="statement-page__input"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          />
        </div>
        <div className="statement-page__form--content">
          <label className="statement-page__label--explanation">Explicación:</label>
          <textarea
            className="statement-page__input"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="statement-page__buttons-container">
          <div className="statement-page__visibility--container">
            <label className="statement-page__label--visibility">
              Público:
            </label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="statement-page__checkbox--visibility"
            />
          </div>
          <div className="statement-page__buttons--actions">
            <button type="submit" className="statement-page__button--form">{statement ? "Actualizar" : "Crear"}</button>
            <button type="button" onClick={handleAddSolution} className="statement-page__button--form">
              <i className="fi fi-rr-plus"></i>
              Añadir Solución
            </button>
          </div>
        </div>

      </form>
    </>
  );
};

export default StatementForm;