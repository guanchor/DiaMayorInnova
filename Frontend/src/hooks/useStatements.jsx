import { useState, useEffect } from "react";
import statementService from "../services/statementService";

const useStatements = () => {
  const [statements, setStatements] = useState([]);
  const [solutions, setSolutions] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        setLoading(true);
        const response = await statementService.getAllStatements(currentPage, 10);
        setStatements(response.data.statements);
        setTotalPages(response.data?.meta?.total_pages || 1);
      } catch (error) {
        console.error("Error al cargar los enunciados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatements();
  }, [currentPage]);

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
    currentPage,
    totalPages,
    setCurrentPage,
    handleEditSolutions,
  };
};

export default useStatements;
