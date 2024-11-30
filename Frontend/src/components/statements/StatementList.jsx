import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import statementService from "../../services/statementService";
import StatementForm from "./StatementForm";

const StatementsList = () => {
  const { user, loading: authLoading } = useAuth();
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        setLoading(true);
        const response = await statementService.getAllStatements();;
        const filteredStatements = response.data.filter(
          (statement) => statement.is_public || statement.user_id === user?.id
        );
        setStatements(filteredStatements);
      } catch (error) {
        console.error("Error al cargar los enunciados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatements();
  }, [user]);

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
    <div>
      <h3>Enunciados Disponibles</h3>
      <ul>
        {statements.map((statement) => (
          <li key={statement.id}>
            <p>{statement.definition}</p>
            <p>{statement.explanation}</p>
            <p>
              <strong>Propietario:</strong>{" "}
              {statement.user_id === user.id ? `${user.name}` : `Usuario ${statement.user_id}`}
            </p>
            <p>
              <strong>Visibilidad:</strong> {statement.is_public ? "Público" : "Privado"}
            </p>
          </li>
        ))}
      </ul>
      <button onClick={() => setFormVisible(true)}>Crear Nuevo Enunciado</button>
      {isFormVisible && <StatementForm onStatementCreated={handleStatementCreated} />}
    </div>
  );
};

export default StatementsList;
