import React, { useState, useEffect } from "react";
import AccountingPlanDataService from "../../services/AccountingPlanService";
import "./EditFormModal.css";

const AccountingPlan = ({ id }) => {
  const initialAccountingPlanState = {
    id: null,
    name: "",
    description: "",
    acronym: ""
  };

  const [currentAccountingPlan, setCurrentAccountingPlan] = useState(initialAccountingPlanState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) getAccountingPlan(id);
  }, [id]);

  const getAccountingPlan = (id) => {
    AccountingPlanDataService.get(id)
      .then((response) => {
        setCurrentAccountingPlan(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentAccountingPlan({ ...currentAccountingPlan, [name]: value });
  };

  const updateAccountingPlan = () => {
    if (!currentAccountingPlan.name || !currentAccountingPlan.description || !currentAccountingPlan.acronym) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    AccountingPlanDataService.update(currentAccountingPlan.id, currentAccountingPlan)
      .then(() => setMessage("Actualizado correctamente."))
      .catch(() => setError("Error al actualizar."));
  };

  return (
    <div className="editForm__container">
      <form>
        <div className="editForm__form--row">
          <div className="editForm__form--group">
            <label>Nombre
            <input
              className="editForm__input" 
              name="name" value={currentAccountingPlan.name} 
              onChange={handleInputChange} /></label>
          </div>

          <div className="editForm__form--group">
            <label>Acrónimo
            <input 
              className="editForm__input" 
              name="acronym" 
              value={currentAccountingPlan.acronym} 
              onChange={handleInputChange} /></label>
          </div>
        </div>

        <div className="editForm__form--row">
          <div className="editForm__form--group full-width">
            <label>Descripción
            <input name="description"
              className="editForm__input"
              value={currentAccountingPlan.description} 
              onChange={handleInputChange} /></label>
          </div>
        </div>


        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className="editForm__form--save" onClick={updateAccountingPlan}>Guardar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AccountingPlan;
