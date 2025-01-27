import React, { useState, useEffect } from "react";
import statementService from "../../services/statementService";
import taskService from "../../services/taskService";
import { useAuth } from "../../context/AuthContext";
import TaskForm from "./TaskForm.jsx";
import TaskPreview from "./TaskPreview.jsx";
import StatementsSelection from "./StatementsSelection.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import "./TaskPage.css";

const TaskCreateForm = ({ onTaskCreated }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { task } = state || {};
  const { user } = useAuth();
  const [title, setTitle] = useState(task?.title || "");
  const [openingDate, setOpeningDate] = useState(task?.opening_date || "");
  const [closingDate, setClosingDate] = useState(task?.closing_date || "");
  const [statements, setStatements] = useState([]);
  const [selectedStatements, setSelectedStatements] = useState(task?.statements?.map(s => s.id) || []);
  const [solutions, setSolutions] = useState({});
  const [editMode, setEditMode] = useState(task ? true : false);
  const [errors, setErrors] = useState({
    title: "",
    openingDate: "",
    closingDate: ""
  });

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
    let valid = true;
    let errors = {};

    if (!title) {
      valid = false;
      errors.title = "El título es obligatorio.";
    }
    if (!openingDate) {
      valid = false;
      errors.openingDate = "La fecha de apertura es obligatoria.";
    }
    if (!closingDate) {
      valid = false;
      errors.closingDate = "La fecha de cierre es obligatoria.";
    }

    if (openingDate && closingDate) {
      const opening = new Date(openingDate);
      const closing = new Date(closingDate);

      if (opening >= closing) {
        valid = false;
        errors.title = "La fecha de apertura debe ser anterior a la fecha de cierre.";
      }
    }

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }

    if (!valid) return;

    const taskData = {
      title,
      opening_date: openingDate,
      closing_date: closingDate,
      statement_ids: selectedStatements,
      created_by: user.id,
    };

    try {
      if (task?.id) {
        await taskService.updateTask(task.id, taskData);
        //alert("Tarea actualizada con éxito");
        navigate("/");
      } else {
        const response = await taskService.createTask(taskData);
        const createdTask = await taskService.getTaskWithStatements(response.data.id);
        //alert("Tarea creada con éxito");
        onTaskCreated(createdTask.data);
      }
    } catch (error) {
      console.error("Error creando la tarea:", error);
    }
  };

  return (
    <main className="task-page">
      <header className="task-page__header--header">
        <button className="back-button" onClick={() => navigate("/home")}>
          <i className="fi fi-rr-arrow-small-left"></i>
          Volver
        </button>
        <div className="task-title">
          <h1>{editMode ? "Edición de Tarea" : "Creación de Tarea"}</h1>
        </div>
      </header>
      <TaskForm
        title={title}
        setTitle={setTitle}
        openingDate={openingDate}
        setOpeningDate={setOpeningDate}
        closingDate={closingDate}
        setClosingDate={setClosingDate}
        handleSubmit={handleSubmit}
        errors={errors}
        id={task && task.id}
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
    </main>
  );
};

export default TaskCreateForm;
