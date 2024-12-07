import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import taskService from "../../services/taskService";
import TaskCreateForm from "./TaskCreateForm";
import { useAuth } from "../../context/AuthContext";
import TaskModal from "../modal/TaskModal";
import TaskDetails from "./TaskDetails";
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
      fetchTasks();
    } else {
      //console.log("Usuario no autenticado o ID faltante.");
      setLoading(false);
      setTasks([]);
    }
  }, [user, location.state]);

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

  const handleTaskCreated = (newTask) => {
    if (newTask?.title) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } else {
      const fetchTasks = async () => {
        try {
          const response = await taskService.getAllTasks();
          setTasks(response.data);
        } catch (err) {
          setError("Error al cargar las tareas.");
          console.error("Error fetching tasks:", err);
        }
      };
      fetchTasks();
    }
    setIsCreatingTask(false);
    navigate("/Home");
  };

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
      ) : (
        <>
          <section className="task-list">
            <h4 className="task-list__title">Tareas Activa</h4>
            <ul className="task-list__items">
              {tasks.map((task) => (
                <li key={`${task.id}-${task.created_at}`} className="task-list__item">
                  <div className="task-list__item-content">
                    <div className="task-list__square">
                      <i className="fi fi-rr-pencil pencil"></i>
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

          <TaskModal show={modalVisible} onClose={handleCloseModal}>
            <TaskDetails
              selectedTask={selectedTask}
              onDeleteStatement={handleDeleteStatement}
              onEditTask={() => setIsEditingTask(true)}
            />
          </TaskModal>
        </>
      )}
    </>
  );
};

export default TaskListAndDetails;
