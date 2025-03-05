import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import SchoolsServices from "../../services/SchoolsServices";

const ClassGroupForm = ({ formData, handleInputChange, handleSubmit, errors, successMessage, onCancelEdit }) => {
  const { user } = useAuth();
  const [schoolCenters, setSchoolCenters] = useState([]);

  useEffect(() => {
    if (user.role === "admin") {
      SchoolsServices.getAll()
        .then((response) => {
          if (response && response.data) {
            setSchoolCenters(response.data);
          }
        })
        .catch((error) =>
          console.error("Error al obtener centros escolares:", error)
        );
    }
  }, [user.role]);

  return (
    <section className="class-group-page__form">
      <header className="class-group-page__form--header">
        <h2 className="class-group-page__header">{formData.id ? "Editar Grupo de Clase" : "Crear Grupo de Clase"}</h2>
      </header>
      <form className="class-group-page__form--form" onSubmit={handleSubmit}>
      <div className="class-group-page__form--row">
        <div>
          <label className="class-group-page__label" htmlFor="course">Curso</label>
          <input
            type="number"
            id="course"
            className="class-group-page__input input-small"
            required
            value={formData.course}
            onChange={handleInputChange}
            name="course"
          />
          {errors.course && <p className="error-message">{errors.course}</p>}
        </div>

        <div>
          <label className="class-group-page__label" htmlFor="module">Módulo</label>
          <input
            type="text"
            id="module"
            className="class-group-page__input input-medium"
            required
            value={formData.module}
            onChange={handleInputChange}
            name="module"
          />
        </div>

        <div>
          <label className="class-group-page__label" htmlFor="modality">Modalidad</label>
          <input
            type="text"
            id="modality"
            className="class-group-page__input input-medium"
            required
            value={formData.modality}
            onChange={handleInputChange}
            name="modality"
          />
          {errors.module && <p className="error-message">{errors.module}</p>}
        </div>
        <div>
          <label className="class-group-page__label" htmlFor="location">Aula</label>
          <input
            type="text"
            id="location"
            className="class-group-page__input input-medium"
            required
            value={formData.location}
            onChange={handleInputChange}
            name="location"
          />
        </div>
        </div>
        <div className="class-group-page__form--row">
        <div>
          <label className="class-group-page__label" htmlFor="number_students">Nº Estudiantes</label>
          <input
            type="number"
            id="number_students"
            className="class-group-page__input input-small"
            required
            value={formData.number_students}
            onChange={handleInputChange}
            name="number_students"
          />
        </div>

        <div>
          <label className="class-group-page__label" htmlFor="max_students">Máx. estudiantes</label>
          <input
            type="number"
            id="max_students"
            className="class-group-page__input input-small"
            required
            value={formData.max_students}
            onChange={handleInputChange}
            name="max_students"
          />
        </div>

        <div>
          <label className="class-group-page__label" htmlFor="weekly_hours">Hrs/semana</label>
          <input
            type="number"
            id="weekly_hours"
            className="class-group-page__input input-small"
            required
            value={formData.weekly_hours}
            onChange={handleInputChange}
            name="weekly_hours"
          />
        </div>
        {user.role === "admin" ? (
          <div className="class-group-page__form--row">
          <div>
            <label
              className="class-group-page__label"
              htmlFor="school_center_id"
            >
              Centro Escolar
            </label>
            <select
              id="school_center_id"
              name="school_center_id"
              className="class-group-page__input"
              value={formData.school_center_id || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un centro</option>
              {schoolCenters.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.school_name}
                </option>
              ))}
            </select>
          </div>
          </div>
        ) : (
          <input
            type="hidden"
            name="school_center_id"
            value={user.school_center_id || ""}
          />
        )}
        </div>
        <div className="class-group-page__form--button-container">
          <button type="submit" className="btn"><i className='fi fi-rr-plus'></i>
            {formData.id ? "Actualizar" : "Crear"}
          </button>
          {formData.id && <button type="button" className="btn light" onClick={onCancelEdit}>Cancelar</button>}
          {successMessage && <p role="alert" style={{ color: "green" }}>{successMessage}</p>}
        </div>
      </form>
    </section>
  );
};

export default ClassGroupForm;