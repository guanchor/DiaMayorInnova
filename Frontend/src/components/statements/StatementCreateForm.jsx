import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatementForm from "./StatementForm";
import StatementList from "./StatementList";
import SolutionList from "../solution/SolutionList";
import EditSolutionModal from "../modal/EditSolutionModal";
import statementService from "../../services/statementService";
import "./StatementPage.css";

const StatementCreateForm = () => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(null);
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [solutionToDeleteIndex, setSolutionToDeleteIndex] = useState(null);
  const [message, setMessage] = useState(""); // Ajout d'un état pour les messages de feedback

  const handleSelectStatement = (statement) => {
    setSelectedStatement(statement);
    console.log("Enunciado seleccionado:", statement);
    if (statement && statement.solutions) {
      const initializedSolutions = statement.solutions.map(solution => ({
        ...solution,
        entries: solution.entries || [],
      }));
      setSolutions(initializedSolutions);
      console.log("Soluciones establecidas:", initializedSolutions);
    } else {
      setSolutions([]);
    }
  };

  const handleStatementCreated = (updatedStatement) => {
    console.log("Enunciado actualizado/creado:", updatedStatement);
    setSelectedStatement(updatedStatement);
    setSolutions(updatedStatement.solutions || []);
    setMessage("Enunciado guardado. Ahora puedes añadir soluciones directamente.");
    setTimeout(() => setMessage(""), 5000);
    navigate("/add-statements");
  };

  const handleAddSolution = async () => {
    const newSolution = {
      description: "",
      entries: [{
        entry_number: 1,
        entry_date: "",
        annotations: [{
          number: 1,
          credit: "",
          debit: "",
          account_number: 0,
        }],
      }],
    };

    if (selectedStatement?.id) {
      try {
        const response = await statementService.addSolution(selectedStatement.id, newSolution);
        setSolutions((prevSolutions) => [...prevSolutions, response.data]);
        setMessage("Solución añadida con éxito.");
        setTimeout(() => setMessage(""), 5000);
      } catch (error) {
        console.error("Error al añadir solución:", error);
        setMessage("Error al añadir la solución. Intenta de nuevo.");
        setTimeout(() => setMessage(""), 5000);
      }
    } else {
      setSolutions((prevSolutions) => [...prevSolutions, newSolution]);
      setMessage("Solución añadida localmente. Debes guardar el enunciado para persistirla.");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleEditSolution = (index) => {
    setSelectedSolutionIndex(index);
    setModalOpen(true);
  };

  const handleDeleteSolution = async (index) => {
    const solutionToDelete = solutions[index];
    if (solutionToDelete.id) {
      try {
        await statementService.deleteSolution(solutionToDelete.id);
        setSolutions((prevSolutions) => prevSolutions.filter((_, i) => i !== index));
        setMessage("Solución eliminada con éxito.");
        setTimeout(() => setMessage(""), 5000);
      } catch (error) {
        console.error("Error al eliminar solución:", error);
        setMessage("Error al eliminar la solución. Intenta de nuevo.");
        setTimeout(() => setMessage(""), 5000);
      }
    } else {
      setSolutions((prevSolutions) => prevSolutions.filter((_, i) => i !== index));
      setMessage("Solución eliminada localmente. Debes guardar el enunciado para confirmar.");
      setTimeout(() => setMessage(""), 5000);
    }
    setSolutionToDeleteIndex(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSolutionIndex(null);
  };

  const handleSaveSolution = async (updatedSolution) => {
    const updatedSolutions = [...solutions];
    updatedSolutions[selectedSolutionIndex] = {
      ...updatedSolution,
      entries: updatedSolution.entries || [],
    };

    if (updatedSolution.id) {
      try {
        await statementService.updateSolution(updatedSolution.id, updatedSolution);
        setSolutions(updatedSolutions);
        setMessage("Solución actualizada con éxito.");
        setTimeout(() => setMessage(""), 5000);
      } catch (error) {
        console.error("Error al actualizar solución:", error);
        setMessage("Error al actualizar la solución. Intenta de nuevo.");
        setTimeout(() => setMessage(""), 5000);
      }
    } else {
      setSolutions(updatedSolutions);
      setMessage("Solución actualizada localmente. Debes guardar el enunciado para persistirla.");
      setTimeout(() => setMessage(""), 5000);
    }
    handleCloseModal();
  };

  return (
    <main className="statement-page">
      <header className="statement-page__header--header">
        <button className="btn light" onClick={() => navigate("/home")}>
          <i className="fi fi-rr-arrow-small-left"></i>
        </button>
        <h1 className="statement-title">Creación de Enunciado</h1>
      </header>

      {message && (
        <div className={message.includes("Error") ? "error-message" : "success-message"}>
          {message}
        </div>
      )}

      <section className="statement-page__form">
        <StatementForm
          onStatementCreated={handleStatementCreated}
          onAddSolution={handleAddSolution}
          solutions={solutions}
          setSolutions={setSolutions}
          onSaveSolution={handleSaveSolution}
          statement={selectedStatement}
          onDeleteSolution={handleDeleteSolution}
        />
      </section>

      <aside className="statement-page__solutions">
        <SolutionList
          solutions={solutions}
          onEditSolution={handleEditSolution}
          onDeleteSolution={handleDeleteSolution}
          solutionToDeleteIndex={solutionToDeleteIndex}
        />
        {isModalOpen && selectedSolutionIndex !== null && (
          <EditSolutionModal
            solution={solutions[selectedSolutionIndex]}
            solutionIndex={selectedSolutionIndex}
            solutions={solutions}
            setSolutions={setSolutions}
            onClose={handleCloseModal}
            onSave={handleSaveSolution}
          />
        )}
      </aside>

      <section className="statement-page__selection">
        <StatementList onSelectStatement={handleSelectStatement} />
      </section>
    </main>
  );
};

export default StatementCreateForm;