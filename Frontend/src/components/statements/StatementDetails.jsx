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
        setStatement(response.data); // Incluye las soluciones, entradas y anotaciones
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
      <h5>{statement.definition}</h5>
      <p>{statement.explanation}</p>
      <p><strong>Visibilidad:</strong> {statement.is_public ? "Público" : "Privado"}</p>

      <h5>Soluciones:</h5>
      {statement.solutions && statement.solutions.length > 0 ? (
        statement.solutions.map((solution) => (
          <div key={solution.id} style={{ marginBottom: "1.5rem" }}>
            <h5>{solution.description}</h5>
            <h6>Entradas:</h6>
            {solution.entries && solution.entries.length > 0 ? (
              solution.entries.map((entry) => (
                <div key={entry.id} style={{ marginBottom: "1rem", paddingLeft: "1rem" }}>
                  <p>
                    <strong>Entrada #{entry.entry_number}</strong> - Fecha: {entry.entry_date}
                  </p>
                  <ul>
                    {entry.annotations && entry.annotations.length > 0 ? (
                      entry.annotations.map((annotation) => (
                        <li key={annotation.id}>
                          Número: {annotation.number}, Número de cuenta: {annotation.account_number}, Crédito: {annotation.credit}, Débito: {annotation.debit}
                        </li>
                      ))
                    ) : (
                      <li>No hay anotaciones para esta entrada.</li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p>No hay entradas para esta solución.</p>
            )}
          </div>
        ))
      ) : (
        <p>No hay soluciones disponibles.</p>
      )}
    </div>
  );
};

export default StatementDetails;