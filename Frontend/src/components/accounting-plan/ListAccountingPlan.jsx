import React, { useState, useEffect } from "react";
import AccountingPlanDataService from "../../services/AccountingPlanService"
import { Link } from "react-router-dom";
import "./AccountingPlan.css";

const AccountingPlansList = () => {
  const [accountingPlans, setAccountingPlans] = useState([]);
  const [currentAccountingPlan, setCurrentAccountingPlan] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchAccPlan, setSearchAccPlan] = useState("");

  useEffect(() => {
    retrieveAccountingPlans();
  }, []);

  const retrieveAccountingPlans = () => {
    AccountingPlanDataService.getAll()
      .then(response => {
        setAccountingPlans(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    if (searchAccPlan) {
      AccountingPlanDataService.findByName(searchAccPlan)
        .then(response => {
          setAccountingPlans(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      retrieveAccountingPlans();
    }
  };

  const setActiveAccountingPlan = (accountingPlan, index) => {
    setCurrentAccountingPlan(accountingPlan);
    setCurrentIndex(index);
  };

  const handleSearchChange = (e) => {
    setSearchAccPlan(e.target.value);
  };

  return (
    <>
      <section>
        <h2>Planes Generales de Contabilidad</h2>
        <Link to={"/home"}>
          Volver al home
        </Link>

        <div>
          <input
            type="text"
            value={searchAccPlan}
            onChange={handleSearchChange}
            placeholder="Filtrar por Plan de Cuenta"
          />
          <button onClick={findByName}>Buscar</button>
        </div>

        <ul className="accountingPlan_list">
          {accountingPlans && accountingPlans.map((accountingPlan, index) => (
            <li onClick={() => setActiveAccountingPlan(accountingPlan, index)} key={index}>
              {accountingPlan.name}
            </li>
          ))}
        </ul>

        <button><Link to={"/add-accounting-plan"}>Añadir nuevo plan</Link></button>
        {/* <button onClick={removeAllAccountingPlans}>Borrar todo</button> */}
      </section>

      <section className="accountingPlan_wrapper">
        {currentAccountingPlan ? (
          <div className="currentAccountingPlan_detail">
            <h3>Plan Contable</h3>
            <div className="detail">
              <label>
                <strong>Nombre: </strong>
              </label>{""}
              {currentAccountingPlan.name}
            </div>
            <div className="detail">
              <label>
                <strong>Descripción: </strong>
              </label>{""}
              {currentAccountingPlan.description}
            </div>
            <div className="detail">
              <label>
                <strong>Acrónimo: </strong>
              </label>{""}
              {currentAccountingPlan.acronym}
            </div>
            <Link to={"/accounting-plans/" + currentAccountingPlan.id}>
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Haga click sobre un plan de cuentas</p>
          </div>
        )}
      </section>
    </>
  );
};

export default AccountingPlansList;