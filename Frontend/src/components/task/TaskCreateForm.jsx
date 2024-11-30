import React, { useState, useEffect } from "react";
import taskService from "../../services/taskService";
import statementService from "../../services/statementService";

const TaskCreateForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [availableStatements, setAvailableStatements] = useState([]);
  const [selectedStatements, setSelectedStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const response = await statementService.getAllStatements();
        setAvailableStatements(response.data);
      } catch (err) {
        setError("Error al cargar los enunciados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatements();
  }, []);

  // Manejar la selección de enunciados
  const handleStatementChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedStatements((prev) => [...prev, value]);
    } else {
      setSelectedStatements((prev) => prev.filter((id) => id !== value));
    }
  };

  // Enviar el formulario para crear la tarea
  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      opening_date: openingDate,
      closing_date: closingDate,
      statement_ids: selectedStatements, // Enunciados seleccionados
    };

    try {
      await taskService.createTask(taskData);
      console.log("Tarea creada con éxito"); // Notificar al componente padre
    } catch (err) {
      setError("Error al crear la tarea.");
      console.error(err);
    }
  };

  if (loading) return <p>Cargando enunciados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre de la tarea:</label>
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
          value={closingDate}
          onChange={(e) => setClosingDate(e.target.value)}
        />
      </div>

      <div>
        <h3>Selecciona los enunciados para esta tarea:</h3>
        <ul>
          {availableStatements.map((statement) => (
            <li key={statement.id}>
              <label>
                <input
                  type="checkbox"
                  value={statement.id}
                  onChange={handleStatementChange}
                />
                {statement.definition}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button type="submit">Crear Tarea</button>
    </form>
  );
};

export default TaskCreateForm;