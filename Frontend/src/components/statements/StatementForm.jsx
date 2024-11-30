import React, { useState } from "react";
import statementService from "../../services/statementService";

const StatementForm = ({ onStatementCreated }) => {
  const [definition, setDefinition] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const statementData = { definition, explanation, is_public: isPublic };
    try {
      const response = await statementService.createStatement(statementData);
      console.log("Respuesta del servidor:", response);
      if (onStatementCreated) { // Asegúrate de que onStatementCreated es una función
        onStatementCreated(response.data); // Llama a la función del padre
      }
      setDefinition("");
      setExplanation("");
      setIsPublic(false);
    } catch (error) {
      console.error("Error creando el enunciado:", error.response || error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Definición:</label>
        <textarea value={definition} onChange={(e) => setDefinition(e.target.value)} />
      </div>
      <div>
        <label>Explicación:</label>
        <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} />
      </div>
      <div>
        <label>
          Público:
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </label>
      </div>
      <button type="submit">Crear Enunciado</button>
    </form>
  );
};

export default StatementForm;