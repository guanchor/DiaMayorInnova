import React, { useState, useEffect } from "react";
import statementService from "../../services/statementService";
import taskService from "../../services/taskService";
import { useAuth } from "../../context/AuthContext";
import TaskForm from "./TaskForm.jsx";
import TaskPreview from "./TaskPreview.jsx";
import StatementsSelection from "./StatementsSelection.jsx";
import "./TaskPage.css";

const TaskCreateForm = ({ onTaskCreated }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [statements, setStatements] = useState([]);
  const [selectedStatements, setSelectedStatements] = useState([]);
  const [solutions, setSolutions] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const response = await statementService.getAllStatements();
        setStatements(response.data);
      } catch (error) {
        console.error("Error fetching statements:", error);
      }
    };

    fetchStatements();
  }, []);

  const handleStatementSelection = (statement) => {
    if (selectedStatements.includes(statement.id)) {
      setSelectedStatements((prevSelected) => prevSelected.filter((id) => id !== statement.id));
    } else {
      setSelectedStatements((prevSelected) => [...prevSelected, statement.id]);
    }
  };

  const handleViewSolutions = async (statementId) => {
    try {
      const response = await statementService.getSolutions(statementId);
      setSolutions((prev) => ({ ...prev, [statementId]: response.data }));
    } catch (error) {
      console.error("Error fetching solutions:", error);
    }
  };

  const handleEditSolutions = (statementId) => {
    setEditMode((prev) => (prev === statementId ? false : statementId));
  };

  const handleRemoveStatement = (statementId) => {
    setSelectedStatements((prev) => prev.filter((id) => id !== statementId));
  };

  const handleSubmit = async () => {
    const taskData = {
      title,
      opening_date: openingDate,
      closing_date: closingDate,
      statement_ids: selectedStatements,
      created_by: user.id,
    };

    try {
      const response = await taskService.createTask(taskData);
      const createdTask = await taskService.getTaskWithStatements(response.data.id);
      alert("Tarea creada con éxito");
      onTaskCreated(createdTask.data); // Notificar al componente padre
    } catch (error) {
      console.error("Error creando la tarea:", error);
    }
  };

  return (
    <>
      <TaskForm
        title={title}
        setTitle={setTitle}
        openingDate={openingDate}
        setOpeningDate={setOpeningDate}
        closingDate={closingDate}
        setClosingDate={setClosingDate}
        handleSubmit={handleSubmit}
      />
      <StatementsSelection
        statements={statements}
        selectedStatements={selectedStatements}
        handleStatementSelection={handleStatementSelection}
        handleViewSolutions={handleViewSolutions}
        handleEditSolutions={handleEditSolutions}
        solutions={solutions}
        editMode={editMode}
      />
      <TaskPreview
        title={title}
        openingDate={openingDate}
        closingDate={closingDate}
        statements={statements}
        selectedStatements={selectedStatements}
        handleRemoveStatement={handleRemoveStatement}
      />
    </>
  );
};

export default TaskCreateForm;
