import React, { useState, useEffect } from "react";
import statementService from "../../services/statementService";
import taskService from "../../services/taskService";

const TaskCreateForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [statements, setStatements] = useState([]);
  const [selectedStatements, setSelectedStatements] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  // Fetch all statements of the user
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

  // Toggle statement selection
  const handleStatementSelection = (statement) => {
    if (selectedStatements.includes(statement.id)) {
      setSelectedStatements((prev) => prev.filter((id) => id !== statement.id));
    } else {
      setSelectedStatements((prev) => [...prev, statement.id]);
    }
  };

  // Submit the task
  const handleSubmit = async () => {
    const taskData = {
      title,
      opening_date: openingDate,
      closing_date: closingDate,
      statement_ids: selectedStatements,
    };

    try {
      const newTask = await taskService.createTask(taskData);
      alert("Tarea creada con éxito");
      onTaskCreated(newTask); // Notificar al componente padre
    } catch (error) {
      console.error("Error creando la tarea:", error);
    }
  };

  return (
    <div>
      {showPreview ? (
        // Preview Section
        <div>
          <h2>Previsualización</h2>
          <p>
            <strong>Título:</strong> {title}
          </p>
          <p>
            <strong>Fecha de apertura:</strong>{" "}
            {new Date(openingDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Fecha de cierre:</strong>{" "}
            {new Date(closingDate).toLocaleString()}
          </p>
          <h3>Enunciados seleccionados:</h3>
          {selectedStatements.length > 0 ? (
            <ul>
              {statements
                .filter((s) => selectedStatements.includes(s.id))
                .map((statement) => (
                  <li key={statement.id}>
                    <strong>Definición:</strong> {statement.definition}
                    <br />
                    <strong>Explicación:</strong> {statement.explanation}
                  </li>
                ))}
            </ul>
          ) : (
            <p>No se han seleccionado enunciados.</p>
          )}
          <button onClick={() => setShowPreview(false)}>Volver al formulario</button>
          <button onClick={handleSubmit}>Finalizar</button>
        </div>
      ) : (
        // Form Section
        <form>
          <h2>Crear Tarea</h2>
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
              value={closingDate}
              onChange={(e) => setClosingDate(e.target.value)}
            />
          </div>
          <div>
            <h3>Seleccionar Enunciados</h3>
            <ul>
              {statements.map((statement) => (
                <li key={statement.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedStatements.includes(statement.id)}
                      onChange={() => handleStatementSelection(statement)}
                    />
                    {statement.definition}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={() => setShowPreview(true)}>
            Previsualizar
          </button>
        </form>
      )}
    </div>
  );
};

export default TaskCreateForm;
