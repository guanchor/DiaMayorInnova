import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatementForm from "./StatementForm";
import StatementList from "./StatementList";
import SolutionList from "../solution/SolutionList";
import EditSolutionModal from "../modal/EditSolutionModal";
import "./StatementPage.css";

const StatementCreateForm = () => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(null);

  const handleStatementCreated = (newStatement) => {
    console.log("Nuevo enunciado creado:", newStatement);
    navigate("/");
  };

  const handleAddSolution = () => {
    const newSolution = {
      description: "",
      entries: [{ entry_number: 1, entry_date: "", annotations: [{
        number: 1,
        credit: 0,
        debit: 0,
        account_number: 0, 
      },] }],
    };
    setSolutions((prevSolutions) => {
      const updatedSolutions = [...prevSolutions, newSolution];
      console.log("Soluciones actualizadas:", updatedSolutions);
      return updatedSolutions;
    });
  };

  const handleEditSolution = (index) => {
    setSelectedSolutionIndex(index);
    setModalOpen(true);
  };

  const handleDeleteSolution = (index) => {
    const updatedSolutions = solutions.filter((_, i) => i !== index);
    setSolutions(updatedSolutions);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSolutionIndex(null);
  };

  const handleSaveSolution = (updatedSolution) => {
    const updatedSolutions = [...solutions];
    updatedSolutions[selectedSolutionIndex] = {
      ...updatedSolution,
      entries: updatedSolution.entries.map(entry => ({
        ...entry,
        annotations: entry.annotations.map(annotation => ({
          ...annotation,
        })),
      })),
    };
    setSolutions(updatedSolutions);
    handleCloseModal();
  };

  return (
    <main className="statement-page">
      <header className="statement-page__header--header">
        <button className="back-button" onClick={() => navigate("/home")}>
          <i className="fi fi-rr-arrow-small-left"></i>
          Volver
        </button>
        <h4>Creación de Enunciado</h4>
      </header>

      <section className="statement-page__form">
        <StatementForm
          onStatementCreated={handleStatementCreated}
          onAddSolution={handleAddSolution}
          solutions={solutions}
        />
      </section>

      <aside className="statement-page__solutions">
        <h3>Soluciones del Enunciado</h3>
        <SolutionList
          solutions={solutions}
          onEditSolution={handleEditSolution}
          onDeleteSolution={handleDeleteSolution}
        />
        {isModalOpen && (
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
        <StatementList />
      </section>
    </main>
  );
};

export default StatementCreateForm;
