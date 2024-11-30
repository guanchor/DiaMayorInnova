import React, { useState, useEffect } from "react";
import taskService from "../../services/taskService";
import TaskCreateForm from "./TaskCreateForm";

const TaskListAndDetails = () => {
  const [tasks, setTasks] = useState([]); // Lista de tareas
  const [selectedTask, setSelectedTask] = useState(null); // Tarea seleccionada
  const [statements, setStatements] = useState([]); // Enunciados de la tarea seleccionada
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState(null); // Manejo de errores
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  // Obtener todas las tareas al cargar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskService.getAllTasks();
        setTasks(response.data);
      } catch (err) {
        setError("Error al cargar las tareas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Obtener los enunciados al seleccionar una tarea
  const fetchTaskDetails = async (taskId) => {
    setLoading(true);
    try {
      const response = await taskService.getTaskWithStatements(taskId);
      setSelectedTask(response.data);
      setStatements(response.data.statements);
    } catch (err) {
      setError("Error al cargar los detalles de la tarea.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la creación de una nueva tarea
  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsCreatingTask(false); // Volver a la vista de lista de tareas
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Lista de tareas */}
      <div>
        <h2>Lista de Tareas</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <button onClick={() => fetchTaskDetails(task.id)}>
                {task.title}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => setIsCreatingTask(true)}>Crear Nueva Tarea</button>
      </div>

      {/* Detalles de la tarea seleccionada */}
      <div>
        {selectedTask ? (
          <>
            <h2>Detalles de la Tarea</h2>
            <h3>{selectedTask.title}</h3>
            <p>Fecha de apertura: {new Date(selectedTask.opening_date).toLocaleDateString()}</p>
            <p>Fecha de cierre: {new Date(selectedTask.closing_date).toLocaleString()}</p>

            <h3>Enunciados</h3>
            {statements.length > 0 ? (
              <ul>
                {statements.map((statement) => (
                  <li key={statement.id}>
                    <strong>Definición:</strong> {statement.definition}
                    <br />
                    <strong>Explicación:</strong> {statement.explanation}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay enunciados para esta tarea.</p>
            )}
          </>
        ) : (
          <p>Selecciona una tarea para ver los detalles.</p>
        )}
      </div>
      {isCreatingTask && <TaskCreateForm onTaskCreated={handleTaskCreated} />}
    </div>
  );
};

export default TaskListAndDetails;