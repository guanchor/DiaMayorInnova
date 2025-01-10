import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatementForm from "./StatementForm";
import StatementList from "./StatementList";
import SolutionList from "../solution/SolutionList";
import EditSolutionModal from "../modal/EditSolutionModal";
import "./StatementPage.css";

const StatementCreateForm = () => {
  const navigate = useNavigate();
  const [solutions, setPrevSolutions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(null);
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [statements, setStatements] = useState([]);

  function setSolutions(a, b, c) {
    console.log('ZZZZZZZZZZZZ', a, b);
    setPrevSolutions(a, b, c);
  }

  const handleSelectStatement = (statement) => {
    setSelectedStatement(statement);
    console.log("Enunciado seleccionado:", statement);
    if (statement && statement.solutions) {
      setSolutions(statement.solutions);
      console.log("Soluciones establecidas:", statement.solutions);
    } else {
      setSolutions([]); // Si no hay soluciones, aseg├║rate de que el estado est├® vac├¡o
    }
  };

  const handleStatementCreated = (updatedStatement) => {
    console.log("Enunciado actualizado/creado:", updatedStatement);
    if (updatedStatement.id === selectedStatement?.id) {
      setSelectedStatement(updatedStatement);
      navigate("/");
    } else {
      navigate("/");
    }
  };

  const handleAddSolution = () => {
    const newSolution = {
      description: "",
      entries: [{
        entry_number: 1, entry_date: "", annotations: [{
          number: 1,
          credit: 0,
          debit: 0,
          account_number: 0,
        },]
      }],
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

  const handleEditStatement = (statement) => {
    setSelectedStatement(statement);
    console.log("Enunciado seleccionado:", statement);
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
        <h1 className="statement-title">Creación de Enunciado</h1>
      </header>

      <section className="statement-page__form">
        <StatementForm
          onStatementCreated={handleStatementCreated}
          onAddSolution={handleAddSolution}
          solutions={solutions}
          setSolutions={setSolutions}
          onSaveSolution={handleSaveSolution}
          statement={selectedStatement}
        />
      </section>

      <aside className="statement-page__solutions">
        <SolutionList
          solutions={solutions}
          onEditSolution={handleEditSolution}
          onDeleteSolution={handleDeleteSolution}
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
