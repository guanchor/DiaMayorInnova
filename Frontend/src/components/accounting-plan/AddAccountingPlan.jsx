import React, { useState } from "react";
import AccountingPlanDataService from "../../services/AccountingPlanService";
import { Link } from "react-router-dom";

const AddAccountingPlan = () => {
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
          setSubmitted(true);
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
          <button onClick={newAccountingPlan}>Añadir otro Plan</button>
          <Link to={"/accounting-plans"}>Atrás</Link>
        </div>
      ) : (
        <div>
          <h4>Añadir plan de cuentas</h4>
          <div>
            <label>Name</label>
            <input
              type="text"
              id="name"
              required
              value={accountingPlan.name}
              onChange={handleInputChange}
              name="name">
            </input>
          </div>

          <div>
            <label>Description</label>
            <input
              type="text"
              id="description"
              required
              value={accountingPlan.description}
              onChange={handleInputChange}
              name="description">
            </input>
          </div>

          <div>
            <label>Acronym</label>
            <input
              type="text"
              id="acronym"
              required
              value={accountingPlan.acronym}
              onChange={handleInputChange}
              name="acronym">
            </input>
          </div>

          <button onClick={saveAccountingPlan}>Submit</button>
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </div>
      )}
    </>
  );
};

export default AddAccountingPlan;