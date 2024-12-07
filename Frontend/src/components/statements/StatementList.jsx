import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import statementService from "../../services/statementService";
import StatementForm from "./StatementForm";
import StatementDetails from "./StatementDetails";

const StatementsList = () => {
  const { user, loading: authLoading } = useAuth();
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedStatementId, setSelectedStatementId] = useState(null);


  useEffect(() => {
    const fetchStatements = async () => {
      try {
        setLoading(true);
        const response = await statementService.getAllStatements();;
        if (Array.isArray(response.data)) {
          const filteredStatements = response.data.filter(
            (statement) => statement.is_public || statement.user_id === user?.id
          );
          setStatements(filteredStatements);
        } else {
          console.log("RESPUESTA DEL SERVER", response.data);
          console.error("Error: La respuesta no es un arreglo válido.");
        }
      } catch (error) {
        console.error("Error al cargar los enunciados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatements();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await statementService.deleteStatement(id);
      setStatements((prevStatements) =>
        prevStatements.filter((statement) => statement.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el enunciado:", error);
    }
  };

  const toggleVisibility = async (id, currentVisibility) => {
    try {
      const updatedVisibility = !currentVisibility;
      await statementService.updateVisibility(id, updatedVisibility);
      setStatements((prevStatements) =>
        prevStatements.map((statement) =>
          statement.id === id
            ? { ...statement, is_public: updatedVisibility }
            : statement
        )
      );
    } catch (error) {
      console.error("Error al cambiar visibilidad:", error);
    }
  };

  const handleEditSolution = (id) => {
    console.log("Editar solución para el enunciado:", id);
    // Aquí puedes redirigir al formulario de edición de la solución
  };

  if (authLoading || !user) {
    return <p>Cargando usuario...</p>;
  }

  if (loading) {
    return <p>Cargando enunciados...</p>;
  }

  if (!statements.length) {
    return <p>No hay enunciados disponibles.</p>;
  }

  // Función para manejar la creación de un enunciado
  const handleStatementCreated = (newStatement) => {
    console.log("Nuevo enunciado creado:", newStatement);
    // Aquí agregas el nuevo enunciado al estado de la lista de enunciados
    setStatements((prevStatements) => [...prevStatements, newStatement]);
    setFormVisible(false);
  };

  console.log("Lista de enunciados:", statements);
  return (
    <div className="statement-page__selection--content">
      <h3 className="statement-page__header">Enunciados</h3>
      <ul className="statement-page__list">
        {statements.map((statement) => (
          <li className="statement-page__list-item" key={statement.id}>
            <div className="statement-page__statement-container">
              <span className="statement-page__definition">{statement.definition}</span>
              <div className="statement-page__actions">
                  <button onClick={() => handleDelete(statement.id)}>
                    <span className="statement-page__button-text">Borrar Enunciado</span>
                  </button>
                <button onClick={() => handleEditSolution(statement.id)}>
                  <span className="statement-page__button-text">Editar Solución</span>
                </button>
                <button
                  onClick={() => toggleVisibility(statement.id, statement.is_public)}
                  style={{
                    backgroundColor: statement.is_public ? "#d3d3d3" : "#fff",
                    color: statement.is_public ? "#000" : "#333",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  <span className="statement-page__button-text">{statement.is_public ? "Público" : "Privado"}</span>
                </button>
              </div>
            </div>
            {/* <button onClick={() => setSelectedStatementId(statement.id)}>
              Ver detalles
            </button> */}
          </li>
        ))}
      </ul>
      {/*       <button onClick={() => setFormVisible(true)}>Crear Nuevo Enunciado</button>
      {isFormVisible && <StatementForm onStatementCreated={handleStatementCreated} />}

      {selectedStatementId && <StatementDetails statementId={selectedStatementId} />} */}
    </div>
  );
};

export default StatementsList;
