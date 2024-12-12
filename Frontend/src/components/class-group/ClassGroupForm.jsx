import React from "react";

const ClassGroupForm = ({ classGroup, onChange, onSubmit, submitText }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...classGroup, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="course">Curso</label>
        <input
          type="number"
          id="course"
          required
          value={classGroup.course}
          onChange={handleInputChange}
          name="course"
        />
      </div>

      <div>
        <label htmlFor="module">Modulo</label>
        <input
          type="text"
          id="module"
          required
          value={classGroup.module}
          onChange={handleInputChange}
          name="module"
        />
      </div>

      <div>
        <label htmlFor="modality">Modalidad</label>
        <input
          type="text"
          id="modality"
          required
          value={classGroup.modality}
          onChange={handleInputChange}
          name="modality"
        />
      </div>

      <div>
        <label htmlFor="number_students">Número de estudiantes</label>
        <input
          type="number"
          id="number_students"
          required
          value={classGroup.number_students}
          onChange={handleInputChange}
          name="number_students"
        />
      </div>

      <div>
        <label htmlFor="max_students">Máximo número de estudiantes</label>
        <input
          type="number"
          id="max_students"
          required
          value={classGroup.max_students}
          onChange={handleInputChange}
          name="max_students"
        />
      </div>

      <div>
        <label htmlFor="location">Aula</label>
        <input
          type="text"
          id="location"
          required
          value={classGroup.location}
          onChange={handleInputChange}
          name="location"
        />
      </div>

      <div>
        <label htmlFor="weekly_hours">Horas semanales</label>
        <input
          type="number"
          id="weekly_hours"
          required
          value={classGroup.weekly_hours}
          onChange={handleInputChange}
          name="weekly_hours"
        />
      </div>

      <button type="submit">{submitText}</button>
    </form>
  );
};

export default ClassGroupForm;