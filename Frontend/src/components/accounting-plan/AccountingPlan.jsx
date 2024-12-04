import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AccountingPlanDataService from "../../services/AccountingPlanService";
import { Link } from "react-router-dom";

const AccountingPlan = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialAccountingPlanState = {
    id:null,
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
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentAccountingPlan({ ...currentAccountingPlan, [name]: value });
  };

  const validateForm = () => {
    if (!currentAccountingPlan.name || !currentAccountingPlan.description || !currentAccountingPlan.acronym) {
      setError("Todos los campos son obligatorios y deben tener valores válidos.");
      return false;
    }
    setError("");
    return true;
  };

  const updateAccountingPlan = () => {
    if (validateForm()) {
    AccountingPlanDataService.update(currentAccountingPlan.id, currentAccountingPlan)
      .then(response => {
        console.log(response.data);
        setMessage("El plan de cuentas fue actualizado correctamente.");
      })
      .catch(e => {
        console.log(e);
        setError("Hubo un problema al actualizar el plan de cuentas.");
      });
  }
};

  const deleteAccountingPlan = () => {
    AccountingPlanDataService.remove(currentAccountingPlan.id)
      .then((response) => {
        console.log(response.data);
        navigate("/accounting-plans/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {currentAccountingPlan ? (
        <div>
          <h4>Accounting Plan</h4>
          <form className=".accounting-plan__form">
            <div>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                value={currentAccountingPlan.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Descripción</label>
              <input
                id="description"
                name="description"
                type="text"
                value={currentAccountingPlan.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="acronym">Acrónimo</label>
              <input
                id="acronym"
                name="acronym"
                type="text"
                value={currentAccountingPlan.acronym}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
          <button onClick={updateAccountingPlan}>Editar</button>
          <button onClick={deleteAccountingPlan}>Borrar</button>
          <p>{message}</p>
          <Link to={"/accounting-plans/"}>Volver</Link>
        </div>
      ) : (
        <div>
          <p>No hay información</p>
        </div>
      )}
    </>
  );
};

export default AccountingPlan;
