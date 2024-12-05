import React, { useState } from "react";
import SolutionsViewer from "../solution/SolutionsViewer";
import statementService from "../../services/statementService";

const StatementsSelection = ({
  statements,
  selectedStatements,
  handleStatementSelection,
  handleEditSolutions,
  solutions,
  editMode
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
    <div>
      <h3>Seleccionar Enunciados</h3>
      <ul>
        {statements.map((statement) => (
          <li key={statement.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedStatements.includes(statement.id)}
                onChange={() => handleStatementSelection(statement)}
              />
              {statement.definition}
            </label>
            <button type="button" onClick={() => viewSolutions(statement.id)}>
              Ver Soluciones
            </button>
            <button type="button" onClick={() => handleEditSolutions(statement.id)}>
              {editMode === statement.id ? "Cancelar Edición" : "Editar Soluciones"}
            </button>
            {solutions[statement.id] && !editMode === statement.id && (
              <ul>
                {solutions[statement.id].map((solution) => (
                  <li key={solution.id}>{solution.description}</li>
                ))}
              </ul>

            )}
            {editMode === statement.id && (
              <div>
                <h4>Editar Soluciones</h4>
                {/* Formulario para editar las soluciones */}
                <button type="button">Guardar Cambios</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {showSolutions && (
        <div>
          <button onClick={hideSolutions}>Cerrar Soluciones</button>
          <SolutionsViewer solutions={currentSolutions} />
        </div>
      )}
    </div>
  );
};

export default StatementsSelection;
