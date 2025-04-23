import React from "react";
import SolutionForm from "./SolutionForm.jsx";
import solutionService from "../../services/solutionService"; // Ajoutez cette ligne

const SolutionList = ({ solutions, onEditSolution, onDeleteSolution, solutionToDeleteIndex }) => {
  // Ajoutez cette fonction
  const handleMarkAsExample = async (solutionId) => {
    try {
      await solutionService.markAsExample(solutionId, {
        creditMoves: "Exemple crédit",
        debitMoves: "Exemple débit",
        account_id: 1 
      });
      alert("Solution marquée comme exemple avec succès!");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors du marquage comme exemple");
    }
  };

  return (
    <div className="statement-page__solutions">
      <h3 className="statement-page__solutions-header">Soluciones del Enunciado</h3>
      <ul className="statement-page__list">
        {solutions.map((solution, index) => (
          <li key={index} className={`statement-page__list-item ${solutionToDeleteIndex === index ? 'statement-page__list-item--deleting' : ''}`}>
            <div className="statement-page__statement-container">
              <h4 className="statement-page__definition-solution">
                {`Solución ${index + 1}`}
                {solution.help_example && <span style={{color: 'green', marginLeft: '8px'}}>(Exemple)</span>}
              </h4>
            </div>
            <div className="statement-page__actions">
              <button onClick={() => onEditSolution(index)} className="statement-page__button-text">Editar</button>
              
              {/* Ajoutez ce nouveau bouton */}
              <button 
                onClick={() => handleMarkAsExample(solution.id)} 
                className="statement-page__button-text"
                disabled={solution.help_example}
                style={solution.help_example ? {opacity: 0.6, cursor: 'not-allowed'} : {}}
              >
                {solution.help_example ? "Este es un ejemplo" : "Marcar como ejemplo"}
              </button>

              <button onClick={() => onDeleteSolution(index)} className="statement-page__button-text--delete">
                <i className="fi fi-rr-trash"></i>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolutionList;