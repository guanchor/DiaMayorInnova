import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import taskService from "../../services/taskService";
import TaskCreateForm from "./TaskCreateForm";
import TaskEditForm from "./TaskEditForm";
import { useAuth } from "../../context/AuthContext";
import TaskModal from "../modal/TaskModal";
import "./TaskPage.css";

const TaskListAndDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Obtener todas las tareas al cargar el componente
  useEffect(() => {
    if (location.state?.createTask) {
      setIsCreatingTask(true);
    }
    const fetchTasks = async () => {
      setLoading(true);
      try {
        //console.log("Solicitando tareas al servicio...");
        const response = await taskService.getAllTasks();
        //console.log("Tareas recibidas:", response.data);
        const filteredTasks = response.data.filter((task) => task.created_by === user.id);
        setTasks(filteredTasks);
      } catch (err) {
        setError("Error al cargar las tareas.");
        console.error("Error fetching tasks:", err);
      } finally {
        //console.log("Finalizando la carga de tareas.");
        setLoading(false);
      }
    };
    //console.log("Usuario actual:", user);
    if (user?.id) {
      //console.log("Cargando tareas para el usuario:", user.id);
      fetchTasks(); // Solo intenta cargar si el usuario está autenticado
    } else {
      //console.log("Usuario no autenticado o ID faltante.");
      setLoading(false);
      setTasks([]);
    }
  }, [user, location.state]);

  // Obtener los detalles de la tarea seleccionada
  const fetchTaskDetails = async (taskId) => {
    setLoading(true);
    try {
      const response = await taskService.getTaskWithStatements(taskId);
      setSelectedTask(response.data);
      setModalVisible(true);
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
    navigate("/Home");
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

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  if (!user) return <p>Cargando usuario...</p>;
  if (loading) return <p>Cargando enunciados... Por favor espera.</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {isCreatingTask ? (
        <TaskCreateForm onTaskCreated={handleTaskCreated} />
      ) : isEditingTask ? (
        <TaskEditForm selectedTask={selectedTask} onTaskUpdated={handleTaskUpdated} />
      ) : (
        <>
          <section className="task-list">
            <h4 className="task-list__title">Tareas Activa</h4>
            <ul className="task-list__items">
              {tasks.map((task) => (
                <li key={`${task.id}-${task.created_at}`} className="task-list__item">
                  <div className="task-list__item-content">
                    <div className="task-list__square">
                      <i className="fi fi-rr-pencil pencil"></i> {/* Icono centrado en el cuadrado */}
                    </div>
                    <div className="task-list__info">
                      <p className="task-list__item-title">Tarea: {task.title}</p>
                      <p className="task-list__closing-date">
                        <strong>Cierre:</strong> {new Date(task.closing_date).toLocaleString()}
                      </p>
                      <button onClick={() => fetchTaskDetails(task.id)}
                        className="task-list__button">
                        Ver Información
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Detalles de la tarea seleccionada */}
          <TaskModal show={modalVisible} onClose={handleCloseModal}>
            {selectedTask ? (
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
                    <strong> Fecha de cierre:{" "}</strong>
                    {new Date(selectedTask.closing_date).toLocaleString()}
                  </p>
                </section>
                <section>
                  <h3 className="task-details__statements-title">Enunciados</h3>
                  {Array.isArray(selectedTask.statements) && selectedTask.statements.length > 0 ? (
                    <ul className="task-details__statements">
                      {selectedTask.statements.map((statement) => (
                        <li key={`${statement.id}-${statement.created_at}`} className="task-details__statement-item">
                          <strong>Definición:</strong> {statement.definition}
                          <button
                            onClick={() =>
                              handleDeleteStatement(selectedTask.id, statement.id)
                            }
                            className="task-details__delete-btn">
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
                  <button onClick={() => setIsEditingTask(true)} className="task-details__edit-btn">
                    Editar tarea
                  </button>
                </footer>
              </article>
            ) : (
              <p>Cargando detalles...</p>
            )}
          </TaskModal>
        </>
      )}
    </>
  );
};

export default TaskListAndDetails;
