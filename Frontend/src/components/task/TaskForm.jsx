import React from "react";

const TaskForm = ({ title, setTitle, openingDate, setOpeningDate, closingDate, setClosingDate }) => {
  return (
    <form style={{ width: "45%" }}>
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
    </form>
  );
};

export default TaskForm;
