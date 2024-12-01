import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import taskService from "../../services/taskService";
import TaskCreateForm from "./TaskCreateForm";
import TaskEditForm from "./TaskEditForm"; // Importamos TaskEditForm
import { useAuth } from "../../context/AuthContext";

const TaskListAndDetails = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]); // Lista de tareas
  const [selectedTask, setSelectedTask] = useState(null); // Tarea seleccionada
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(null); // Manejo de errores
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false); // Controlador para cambiar a modo de edición

  // Obtener todas las tareas al cargar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        console.log("Solicitando tareas al servicio...");
        const response = await taskService.getAllTasks();
        console.log("Tareas recibidas:", response.data);
        const filteredTasks = response.data.filter((task) => task.created_by === user.id);
        setTasks(filteredTasks);
      } catch (err) {
        setError("Error al cargar las tareas.");
        console.error("Error fetching tasks:", err);
      } finally {
        console.log("Finalizando la carga de tareas.");
        setLoading(false);
      }
    };
    console.log("Usuario actual:", user);
    if (user?.id){
      console.log("Cargando tareas para el usuario:", user.id);
      fetchTasks(); // Solo intenta cargar si el usuario está autenticado
    }else {
      console.log("Usuario no autenticado o ID faltante.");
      setLoading(false);
      setTasks([]);
    }
  }, [user]);

  // Obtener los detalles de la tarea seleccionada
  const fetchTaskDetails = async (taskId) => {
    setLoading(true);
    try {
      const response = await taskService.getTaskWithStatements(taskId);
      setSelectedTask(response.data);
    } catch (err) {
      setError("Error al cargar los detalles de la tarea.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la creación de una nueva tarea
  const handleTaskCreated = (newTask) => {
    if (newTask?.title) {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    } else {
      // Si la tarea creada no tiene el título, recargamos la lista completa
    const fetchTasks = async () => {
      try {
        const response = await taskService.getAllTasks();
        setTasks(response.data); // Recarga la lista
      } catch (err) {
        setError("Error al cargar las tareas.");
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }
    setIsCreatingTask(false); // Volver a la vista de lista de tareas
  };

  // Función para manejar la actualización de la tarea
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSelectedTask(updatedTask); // Actualizar la tarea seleccionada
    setIsEditingTask(false); // Volver a los detalles
  };

  // Función para manejar la eliminación de un enunciado
  const handleDeleteStatement = async (taskId, statementId) => {
    try {
      await taskService.deleteStatementFromTask(taskId, statementId);
      // Actualizar los enunciados de la tarea después de la eliminación
      const updatedTask = await taskService.getTaskWithStatements(taskId);
      setSelectedTask(updatedTask.data);
    } catch (error) {
      console.error("Error al eliminar el enunciado:", error);
    }
  };

  if (!user) return <p>Cargando usuario...</p>;
  if (loading) return <p>Cargando tareas... Por favor espera.</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {isCreatingTask ? (
        <TaskCreateForm onTaskCreated={handleTaskCreated} />
      ) : isEditingTask ? (
        <TaskEditForm selectedTask={selectedTask} onTaskUpdated={handleTaskUpdated} />
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Lista de tareas */}
          <div>
            <h2>Lista de Tareas</h2>
            <ul>
              {tasks.map((task) => (
                <li key={`${task.id}-${task.created_at}`}>
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
                <p>
                  Fecha de apertura:{" "}
                  {new Date(selectedTask.opening_date).toLocaleDateString()}
                </p>
                <p>
                  Fecha de cierre:{" "}
                  {new Date(selectedTask.closing_date).toLocaleString()}
                </p>

                <h3>Enunciados</h3>
                {Array.isArray(selectedTask.statements) && selectedTask.statements.length > 0 ? (
                  <ul>
                    {selectedTask.statements.map((statement) => (
                      <li key={`${statement.id}-${statement.created_at}`}>
                        <strong>Definición:</strong> {statement.definition}
                        <br />
                        <strong>Explicación:</strong> {statement.explanation}
                        <button
                          onClick={() =>
                            handleDeleteStatement(selectedTask.id, statement.id)
                          }
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay enunciados para esta tarea.</p>
                )}

                <button onClick={() => setIsEditingTask(true)}>
                  Editar tarea
                </button>
              </>
            ) : (
              <p>Selecciona una tarea para ver los detalles.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskListAndDetails;
