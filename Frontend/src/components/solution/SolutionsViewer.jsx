import React from "react";

const SolutionsViewer = ({ solutions }) => {
  console.log("Soluciones recibidas en SolutionsViewer:", solutions);
  if (!solutions || solutions.length === 0) {
    return <p>No hay soluciones disponibles.</p>;
  }

  return (
    <div>
      <h3>Soluciones</h3>
      <ul>
        {solutions.map((solution) => (
          <li key={solution.id}>
            <p><strong>Descripción:</strong> {solution.description}</p>
            <h4>Entradas:</h4>
            <ul>
              {solution.entries.map((entry) => (
                <li key={entry.id}>
                  <p>
                    <strong>Fecha:</strong> {entry.entry_date} <br />
                    <strong>Número de entrada:</strong> {entry.entry_number}
                  </p>
                  <h5>Anotaciones:</h5>
                  <ul>
                    {entry.annotations.map((annotation) => (
                      <li key={annotation.id}>
                        <p>
                          Número: {annotation.number}, Número de Cuenta: {annotation.account_number}, Crédito: {annotation.credit}, Débito: {annotation.debit}
                        </p>
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
