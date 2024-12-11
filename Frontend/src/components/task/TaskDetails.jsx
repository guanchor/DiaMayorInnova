import React from "react";
import { useNavigate } from "react-router-dom";
import taskService from "../../services/taskService";
import "./TaskPage.css";

const TaskDetails = ({ selectedTask, onDeleteStatement, onDeleteTask, onCloseModal }) => {
  const navigate = useNavigate();

  if (!selectedTask) return <p>Cargando detalles...</p>;

  const handleEditTask = () => {
    navigate("/task-edit", { state: { task: selectedTask } });
  };

  const handleDeleteTask = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      try {
        await taskService.deleteTask(selectedTask.id);
        onDeleteTask(selectedTask.id); // Notificar al padre que la tarea ha sido eliminada
        onCloseModal();
      } catch (err) {
        console.error("Error al eliminar la tarea:", err);
      }
    }
  };

  return (
    <article className="task-details">
      <header>
        <h3 className="task-details__title">{selectedTask.title}</h3>
      </header>
      <section>
        <p className="task-details__date">
          <strong>Fecha de apertura:{" "}</strong>
          {new Date(selectedTask.opening_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Fecha de cierre:{" "}</strong>
          {new Date(selectedTask.closing_date).toLocaleString()}
        </p>
      </section>
      <section>
        <h3 className="task-details__statements-title">Enunciados</h3>
        {Array.isArray(selectedTask.statements) && selectedTask.statements.length > 0 ? (
          <ul className="task-details__statements">
            {selectedTask.statements.map((statement) => (
              <li
                key={`${statement.id}-${statement.created_at}`}
                className="task-details__statement-item"
              >
                <strong>Definición:</strong> {statement.definition}
                <button
                  onClick={() => onDeleteStatement(selectedTask.id, statement.id)}
                  className="task-details__delete-btn"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay enunciados para esta tarea.</p>
        )}
      </section>
      <footer>
        <button onClick={handleEditTask} className="task-details__edit-btn">
          Editar tarea
        </button>
        <button onClick={handleDeleteTask} className="task-details__delete-btn">
          Eliminar tarea
        </button>
      </footer>
    </article>
  );
};

export default TaskDetails;