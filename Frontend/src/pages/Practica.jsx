import Shortcut from '../components/shortcut/Shortcut'
import { useAccounting, useSchools } from '../hooks/useTanstack'
import SchoolCenters from '../components/schoolCenters/SchoolCenters';
import React, { useState, useEffect } from "react";
import AccountingPlanDataService from "../services/AccountingPlanService"
import { Link } from "react-router-dom";
import "../components/accounting-plan/AccountingPlan.css";

const AccountingPlansList = () => {
  const [accountingPlans, setAccountingPlans] = useState([]);
  const [currentAccountingPlan, setCurrentAccountingPlan] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchAccPlan, setSearchAccPlan] = useState("");

  const { acounting, isLoading, error } = useAccounting();

  useEffect(() => {
    retrieveAccountingPlans();
  }, []);

  const retrieveAccountingPlans = () => {
    /*     AccountingPlanDataService.getAll()
          .then(response => {
            setAccountingPlans(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          }); */
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
          {acounting && acounting.map((accountingPlan, index) => (
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



const Practica = () => {
  const { schools, isLoading, error } = useSchools();

  if (isLoading) {
    return <div>Espereeeee.....</div>;
  }

  if (error) {
    return <div>Error al cargar las escuelas: {error.message}</div>;
  }

  if (!schools || schools.length === 0) {
    return <div>No hay escuelas disponibles.</div>;
  }

  return (
    <>
      <div className='practica'>
        <button className='btn' disabled><i className='fi fi-rr-search'></i>hola</button>
        <button className='btn btn--l'><i className='fi fi-rr-search'></i>hola</button>
        <button className='btn btn--border' ><i className='fi fi-rr-search'></i>hola</button>
        <button className='btn btn--l btn--border' disabled><i className='fi fi-rr-search'></i>hola</button>
        <Shortcut />
      </div>

      <div className="practica">
        {
          schools.map(school => (
            <p>{school.address}</p>
          ))
        }
      </div>

      <SchoolCenters />
      <AccountingPlansList />

    </>
  )
}

export default Practica;