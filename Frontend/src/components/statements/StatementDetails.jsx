import React, { useState, useEffect } from "react";
import statementService from "../../services/statementService";

const StatementDetails = ({ statementId }) => {
  const [statement, setStatement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatement = async () => {
      try {
        setLoading(true);
        const response = await statementService.getStatement(statementId);
        setStatement(response.data); // Aquí almacenas los detalles del enunciado, incluidas las soluciones
      } catch (error) {
        console.error("Error obteniendo el enunciado:", error.response || error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatement();
  }, [statementId]);

  if (loading) {
    return <p>Cargando detalles del enunciado...</p>;
  }

  if (!statement) {
    return <p>No se encontró el enunciado.</p>;
  }

  return (
    <div>
      <h3>{statement.definition}</h3>
      <p>{statement.explanation}</p>
      <p><strong>Visibilidad:</strong> {statement.is_public ? "Público" : "Privado"}</p>

      <h4>Soluciones:</h4>
      <ul>
        {statement.solutions && statement.solutions.length > 0 ? (
          statement.solutions.map((solution) => (
            <li key={solution.id}>
              <p>{solution.content}</p>
            </li>
          ))
        ) : (
          <p>No hay soluciones disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default StatementDetails;