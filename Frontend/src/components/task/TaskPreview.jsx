import React from "react";

const TaskPreview = ({ title, openingDate, closingDate, statements, selectedStatements }) => {
  return (
    <div>
      <h2>Previsualización</h2>
      <p>
        <strong>Título:</strong> {title}
      </p>
      <p>
        <strong>Fecha de apertura:</strong>{" "}
        {new Date(openingDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Fecha de cierre:</strong>{" "}
        {new Date(closingDate).toLocaleString()}
      </p>
      <h3>Enunciados seleccionados:</h3>
      {selectedStatements.length > 0 ? (
        <ul>
          {statements
            .filter((s) => selectedStatements.includes(s.id))
            .map((statement) => (
              <li key={statement.id}>
                <strong>Definición:</strong> {statement.definition}
                <br />
                <strong>Explicación:</strong> {statement.explanation}
              </li>
            ))}
        </ul>
      ) : (
        <p>No se han seleccionado enunciados.</p>
      )}
    </div>
  );
};

export default TaskPreview;
