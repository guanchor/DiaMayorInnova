import { useState, useEffect } from "react";
import statementService from "../services/statementService";

const useStatements = () => {
  const [statements, setStatements] = useState([]);
  const [solutions, setSolutions] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const response = await statementService.getAllStatements();
        setStatements(response.data || []);
      } catch (error) {
        console.error("Error al cargar los enunciados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatements();
  }, []);

  const handleEditSolutions = (statementId) => {
    if (editMode === statementId) {
      setEditMode(null);
    } else {
      setEditMode(statementId);
    }
  };

  return {
    statements,
    solutions,
    editMode,
    loading,
    handleEditSolutions,
  };
};

export default useStatements;
