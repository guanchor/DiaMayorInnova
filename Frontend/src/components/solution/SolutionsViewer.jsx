import React from "react";

const SolutionsViewer = ({ solutions }) => {
  if (!solutions || solutions.length === 0) {
    return <p>No hay soluciones disponibles.</p>;
  }

  return (
    <div className="modal-solutionViewer__solution-content">
      {/* <h3 className="modal-solutionViewer__solution-title">Soluciones</h3> */}
      <ul className="modal-solutionViewer__solution-items">
        {solutions.map((solution, index) => (
          <li key={solution.id} className="modal-solutionViewer__solution-item">
            <h4 className="modal-solutionViewer__solution--subtitle">Solución {index + 1}:</h4>
            <span className="modal-solutionViewer__solution-item--description"><strong>Descripción:</strong> {solution.description}</span>
            {/* <h4 className="modal-solutionViewer__entry--subtitle">Entradas:</h4> */}
            <ul className="modal-solutionViewer__entry-items">
              {solution.entries.map((entry) => (
                <li key={entry.id} className="modal-solutionViewer__entry-item">
                  <div className="modal-solutionViewer__entry-item--info">
                    <span><strong>Asiento:</strong> {entry.entry_number}</span>
                    <span><strong>Fecha:</strong> {entry.entry_date}</span>
                  </div>
                  {/* <h5 className="modal-solutionViewer__annotation--subtitle">Anotaciones:</h5> */}
                  <ul className="modal-solutionViewer__annotation-items">
                    <div className="modal-solutionViewer__annotation-items-title">
                    <span className="annotation-items--header"><strong>Apunte</strong></span>
                    <span className="annotation-items--header"><strong>Nº de Cuenta</strong></span>
                    <span className="annotation-items--header"><strong>Debe</strong></span>
                    <span className="annotation-items--header"><strong>Haber</strong></span>
                    </div>
                    {entry.annotations.map((annotation) => (
                      <li key={annotation.id} className="modal-solutionViewer__annotation-item">
                        <span className="annotation-item--item">{annotation.number}</span> 
                        <span className="annotation-item--item">{annotation.account_number}</span> 
                        <span className="annotation-item--item">{annotation.debit}</span>
                        <span className="annotation-item--item">{annotation.credit}</span> 
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolutionsViewer;
