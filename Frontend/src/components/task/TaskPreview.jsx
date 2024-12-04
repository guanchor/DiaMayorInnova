import React from "react";
import "./TaskPage.css";

const TaskPreview = ({ title, openingDate, closingDate, statements, selectedStatements, handleRemoveStatement }) => {
  return (
    <section className="task-page__preview">
      <div className="task-page__preview--content">
        <h2 className="task-page__header">Título: {title}</h2>
        <div className="task-page__dates-container">
          <p>
            <strong>Fecha de apertura:</strong>{" "}
            {new Date(openingDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Fecha de cierre:</strong>{" "}
            {new Date(closingDate).toLocaleString()}
          </p>
        </div>
        {selectedStatements.length > 0 ? (
          <ul className="task-page__list">
            {selectedStatements.map((statementId) => {
              const statement = statements.find((s) => s.id === statementId);
              return (
                <li className="task-page__list-item" key={statement.id}>
                  <span>{statement.definition}</span>
                  <button
                    type="button"
                    className="task-page__button--remove"
                    onClick={() => handleRemoveStatement(statement.id)}
                  >
                    <i className="fi fi-rr-trash trash"></i>
                    <span className="task-page__button-text">Borrar</span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <span>No se han seleccionado enunciados.</span>
        )}
      </div>
    </section>
  );
};

export default TaskPreview;
