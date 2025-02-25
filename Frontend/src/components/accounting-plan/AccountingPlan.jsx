import React, { useState, useEffect } from "react";
import AccountingPlanDataService from "../../services/AccountingPlanService";
import "./AccountingPlan.css";

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
    <div >
      <h2 className="accountingPlan__header--h2">Detalles del PGC</h2>
      <form>
        <label>Nombre</label>
        <input className="accountingPlan__input" name="name" value={currentAccountingPlan.name} onChange={handleInputChange} />

        <label>Descripción</label>
        <textarea name="description" value={currentAccountingPlan.description} onChange={handleInputChange} />

        <label>Acrónimo</label>
        <input name="acronym" value={currentAccountingPlan.acronym} onChange={handleInputChange} />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="button" onClick={updateAccountingPlan}>Guardar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AccountingPlan;
