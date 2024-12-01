import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import taskService from "../../services/taskService";
import statementService from "../../services/statementService";
import formatDateForInput from "../../utils/dateTimeFormat";

const TaskEditForm = ({ selectedTask, onTaskUpdated }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(selectedTask?.title || "");
  const [openingDate, setOpeningDate] = useState(selectedTask?.opening_date || "");
  const [closingDate, setClosingDate] = useState(selectedTask?.closing_date || "");
  const [statements, setStatements] = useState(selectedTask?.statements || []);
  const [selectedStatements, setSelectedStatements] = useState(
    selectedTask?.statements?.map((statement) => statement.id) || []
  );

  // Guarda los valores iniciales de la tarea para la comparación
  const initialTask = {
    title: selectedTask?.title || "",
    openingDate: selectedTask?.opening_date || "",
    closingDate: selectedTask?.closing_date || "",
    statementIds: selectedTask?.statements?.map((statement) => statement.id) || []
  };

  // Actualiza los estados cuando seleccionamos una tarea
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title || "");
      setOpeningDate(selectedTask.opening_date || "");
      setClosingDate(selectedTask.closing_date || "");
      setSelectedStatements(selectedTask.statements?.map((statement) => statement.id) || []);
    }
    // Obtener todos los enunciados disponibles
    const fetchStatements = async () => {
      try {
        const response = await statementService.getAllStatements();
        setStatements(response.data); // Almacenamos todos los enunciados disponibles
      } catch (error) {
        console.error("Error al obtener los enunciados:", error);
      }
    };

    fetchStatements();
  }, [selectedTask]);

  const hasChanges = () => {
    return (
      title !== initialTask.title ||
      openingDate !== initialTask.openingDate ||
      closingDate !== initialTask.closingDate ||
      !selectedStatements.every((id, index) => id === initialTask.statementIds[index])
    );
  };

  // Handle statement selection
  const handleStatementSelection = (statementId) => {
    if (selectedStatements.includes(statementId)) {
      setSelectedStatements((prev) =>
        prev.filter((id) => id !== statementId)
      );
    } else {
      setSelectedStatements((prev) => [...prev, statementId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasChanges()) {
      console.log("No se han realizado cambios, no se envía nada.");
      navigate("/tasks");
      return;
    }

    // Crear el objeto con los datos actualizados
    const updatedTask = {
      title,
      opening_date: openingDate,
      closing_date: closingDate,
      statement_ids: selectedStatements.lenght > 0 ? selectedStatements : []
    };

    try {
      const response = await taskService.updateTask(selectedTask.id, updatedTask);
      onTaskUpdated(response.data);  // Notificar a TaskListAndDetails para que actualice la tarea
      navigate("/tasks");
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  return (
    <div>
      <h2>Editar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de apertura:</label>
          <input
            type="date"
            value={openingDate}
            onChange={(e) => setOpeningDate(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de cierre:</label>
          <input
            type="datetime-local"
            value={formatDateForInput(closingDate)}
            onChange={(e) => setClosingDate(e.target.value)}
          />
        </div>
        <div>
          <h3>Enunciados Disponibles</h3>
          <ul>
            {statements.length > 0 ? (statements.map((statement) => (
              <li key={statement.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedStatements.includes(statement.id)}
                    onChange={() => handleStatementSelection(statement.id)}
                  />
                  {statement.definition}
                </label>
              </li>
            ))
            ) : (
              <p>No hay enunciados asociados a esta tarea.</p>
            )}
          </ul>
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default TaskEditForm;
