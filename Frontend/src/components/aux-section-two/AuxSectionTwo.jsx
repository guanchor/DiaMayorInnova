import { useState } from "react";
import "./AuxSectionTwo.css"

const AuxSectionTwo = ({ statements, examStarted, onSelectStatement }) => {
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [visitedStatements, setVisitedStatements] = useState([]);

  const handleStatementClick = (statement) => {
    if (!visitedStatements.includes(statement.id)) {
      setVisitedStatements([...visitedStatements, statement.id]);
    }
    setSelectedStatement(statement);
    onSelectStatement(statement);
  };

  return (
    <div className='aux-section_two__container'>
      <h2 className='help_secction_tittle'>Enunciados</h2>

      {examStarted && (
        <section>
          <div className="statement-grid">
            {statements.map((statement, index) => {
              let buttonClass = "statement-button";
              if (selectedStatement?.id === statement.id) {
                buttonClass += " selected";
              } else if (visitedStatements.includes(statement.id)) {
                buttonClass += " visited";
              }
              return (
                <button
                  key={statement.id}
                  className={buttonClass}
                  onClick={() => handleStatementClick(statement)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          {selectedStatement && (
            <div className="statement-detail">
              <h3 className="statement-detail__title">Enunciado {statements.indexOf(selectedStatement) + 1}</h3>
              <div className="statement-detail__content">
                <p><strong>Definición:</strong> {selectedStatement.definition}</p>
                <p><strong>Explicación:</strong> {selectedStatement.explanation || "Sin explicación."}</p>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default AuxSectionTwo;
