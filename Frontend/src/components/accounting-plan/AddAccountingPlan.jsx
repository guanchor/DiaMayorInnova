import React, { useState } from "react";
import AccountingPlanDataService from "../../services/AccountingPlanService";
import { Link } from "react-router-dom";
import "./AccountingPlan.css";

const AddAccountingPlan = ({setNewPGC}) => {
  const initialAccountingPlanState = {
    id: null,
    name: "",
    description: "",
    acronym: ""
  };
  const [accountingPlan, setAccountingPlan] = useState(initialAccountingPlanState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = event => {
    const { name, value } = event.target;
    setAccountingPlan({ ...accountingPlan, [name]: value });
  };

  const validateForm = () => {
    if (!accountingPlan.name || !accountingPlan.description || !accountingPlan.acronym) {
      setError("Todos los campos son obligatorios y deben tener valores válidos.");
      return false;
    }
    setError("");
    return true;
  };

  const saveAccountingPlan = () => {
    if (validateForm()) {
      let data = {
        name: accountingPlan.name.trim(),
        description: accountingPlan.description.trim(),
        acronym: accountingPlan.acronym.trim()
      };

      AccountingPlanDataService.create(data)
        .then(response => {
          setAccountingPlan({
            id: parseInt(response.data.id),
            name: response.data.name.trim(),
            description: response.data.description.trim(),
            acronym: response.data.acronym.trim()
          });
          setNewPGC(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
          setError("Hubo un problema al guardar el plan de cuentas.");
        });
    };
  };

  const newAccountingPlan = () => {
    setAccountingPlan(initialAccountingPlanState);
    setSubmitted(false);
    setError("");
  };

  return (
    <>
      {submitted ? (
        <div>
          <h4>Se ha enviado correctamente</h4>
          <button className="accountingPlan__button" onClick={newAccountingPlan}>Añadir otro Plan</button>
          <button><Link to={"/accounting-plans"}>Atrás</Link></button>
        </div>
      ) : (
        <div className="accountingPlan__form">
          <h4 className="accountingPlan__header--h4">Añadir plan de cuentas</h4>
          <div className="accountingPlan__form--row">
            <div className="accountingPlan__form--group">
              <label>Nombre</label>
              <input
                className="accountingPlan__input"
                type="text"
                id="name"
                required
                value={accountingPlan.name}
                onChange={handleInputChange}
                name="name">
              </input>
            </div>
            
            <div className="accountingPlan__form--group">
              <label>Acrónimo</label>
              <input
                className="accountingPlan__input"
                type="text"
                id="acronym"
                required
                value={accountingPlan.acronym}
                onChange={handleInputChange}
                name="acronym">
              </input>
            </div>
            
          </div>

          <div className="accountingPlan__form--row">
            <div className="accountingPlan__form--group full-width">
              <label>Descripción</label>
              <input
                className="accountingPlan__input"
                type="text"
                id="description"
                required
                value={accountingPlan.description}
                onChange={handleInputChange}
                name="description">
              </input>
            </div>
          </div>

          <div className="accountingPlan__form--actions">
            <button className="accountingPlan__button" onClick={saveAccountingPlan}>+ Añadir plan</button>
          </div>
          
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

        </div>
      )}
    </>
  );
};

export default AddAccountingPlan;