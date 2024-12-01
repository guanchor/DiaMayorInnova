import React, { useState } from "react";
import solutionService from "../../services/solutionService.js"; // Asegúrate de crear este servicio.

const AddSolutionForm = ({ statementId, onSolutionCreated }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const solutionData = { content };

    try {
      const response = await solutionService.addSolution(statementId, solutionData);
      if (onSolutionCreated) {
        onSolutionCreated(response.data); // Llama a la función de actualización del componente padre
      }
      setContent(""); // Limpia el campo de entrada
    } catch (error) {
      console.error("Error creando la solución:", error.response || error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Contenido de la Solución:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button type="submit">Crear Solución</button>
    </form>
  );
};

export default AddSolutionForm;
