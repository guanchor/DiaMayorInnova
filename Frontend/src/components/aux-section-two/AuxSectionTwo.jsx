import { useState } from "react";
import "./AuxSectionTwo.css"

const AuxSectionTwo = ({ statements, examStarted, onSelectStatement }) => {
  const [selectedStatement, setSelectedStatement] = useState(null);

  const handleStatementClick = (statement) => {
    setSelectedStatement(statement);
    onSelectStatement(statement);
  };

  return (
    <div className='aux-section_two__container'>
      <h2 className='help_secction_tittle'>Enunciados</h2>

      {examStarted && (
        <section>
          <div className="statement-grid">
            {statements.map((statement, index) => (
              <button
                key={statement.id}
                className={`statement-button ${selectedStatement?.id === statement.id ? "selected" : ""
                  }`}
                onClick={() => handleStatementClick(statement)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {selectedStatement && (
            <div className="statement-detail">
              <h3>Enunciado {statements.indexOf(selectedStatement) + 1}</h3>
              <p><strong>Definición:</strong> {selectedStatement.definition}</p>
              <p><strong>Explicación:</strong> {selectedStatement.explanation || "Sin explicación."}</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default AuxSectionTwo;
