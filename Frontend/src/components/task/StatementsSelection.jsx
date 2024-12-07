import React, { useState } from "react";
import SolutionsViewer from "../solution/SolutionsViewer";
import statementService from "../../services/statementService";
import "./TaskPage.css";

const StatementsSelection = ({
  statements,
  selectedStatements,
  handleStatementSelection,
  handleEditSolutions,
  solutions,
  editMode,
  showCheckboxes = true,
}) => {
  const [currentSolutions, setCurrentSolutions] = useState([]);
  const [showSolutions, setShowSolutions] = useState(false);
  const [loading, setLoading] = useState(false);

  const viewSolutions = (statementId) => {
    console.log("ID del enunciado:", statementId);
    if (solutions[statementId]) {
      console.log("Soluciones ya cargadas:", solutions[statementId]);
      setCurrentSolutions(solutions[statementId]);
      setShowSolutions(true);
    } else {
      console.log("Soluciones no cargadas. Realizando solicitud...");
      setLoading(true);
      // Realizar la solicitud para obtener las soluciones usando la función getSolutions
      statementService.getSolutions(statementId)
        .then(response => {
          console.log("Soluciones cargadas:", response.data);
          setCurrentSolutions(response.data);  // Asumimos que las soluciones vienen en `response.data`
          setShowSolutions(true);
        })
        .catch(error => {
          console.error("Error al cargar soluciones:", error);
          // Puedes mostrar un mensaje de error si lo deseas
        })
        .finally(() => {
          setLoading(false);  // Desactivar el estado de carga cuando termine la solicitud
        });
    }
  };

  const hideSolutions = () => {
    setShowSolutions(false);
    setCurrentSolutions([]);
  };

  if (!Array.isArray(statements)) {
    return <div>Error: No se recibieron enunciados válidos</div>;
  }

  return (
    <section className="task-page__selection">
      <div className="task-page__selection--content">
        <h3 className="task-page__header">Enunciados</h3>
        <ul className="task-page__list">
          {statements.map((statement) => (
            <li className="task-page__list-item" key={statement.id}>
              <div className="task-page__statement-container">
                <span className="task-page__statement">{statement.definition}</span>
                <div className="task-page__actions">
                {showCheckboxes && (
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedStatements.includes(statement.id)}
                      onChange={() => handleStatementSelection(statement)}
                    />
                    <span className="task-page__button-text">Añadir</span>
                  </label>
                )}
                  <button className="task-page__button--edit" type="button" onClick={() => viewSolutions(statement.id)}>
                    <i className="fi fi-rr-interrogation interrogation"></i>
                    <span className="task-page__button-text">Ver Soluciones</span>
                  </button>
                  <button className="task-page__button--edit" type="button" onClick={() => handleEditSolutions(statement.id)}>
                    <i className="fi fi-rr-pencil pencil"></i>
                    {editMode === statement.id ? "Cancelar Edición" : "Editar Soluciones"}
                  </button>
                </div>
              </div>
              {solutions[statement.id] && !editMode === statement.id && (
                <ul>
                  {solutions[statement.id].map((solution) => (
                    <li key={solution.id}>{solution.description}</li>
                  ))}
                </ul>
              )}
              {editMode === statement.id && (
                <div>
                  <span className="task-page__button-text">Editar Soluciones</span>
                  {/* Formulario para editar las soluciones */}
                  <button type="button">Guardar Cambios</button>
                </div>
              )}
            </li>
          ))}
        </ul>
        {showSolutions && (
          <div className="task-page__solutions-viewer">
            <button className="task-page__button" onClick={hideSolutions}>Cerrar Soluciones</button>
            <SolutionsViewer solutions={currentSolutions} />
          </div>
        )}
      </div>
    </section>
  );
};

export default StatementsSelection;
