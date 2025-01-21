import React from "react";
import SolutionForm from "./SolutionForm.jsx";

const SolutionList = ({ solutions, onEditSolution, onDeleteSolution }) => {

  return (
    <div className="statement-page__solutions">
      <h3 className="statement-page__solutions-header">Soluciones del Enunciado</h3>
      <ul className="statement-page__list">
        {solutions.map((solution, index) => (
          <li key={index} className="statement-page__list-item">
            <div className="statement-page__statement-container">
              <p className="statement-page__definition-solution">{`Solución ${index + 1}`}</p>
            </div>
            <div className="statement-page__actions">
              <button onClick={() => onEditSolution(index)} className="statement-page__button-text">Editar</button>
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
