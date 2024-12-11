import React, { useState, useEffect } from "react";
import AccountingPlanDataService from "../../services/AccountingPlanService"
import { Link } from "react-router-dom";
import "./AccountingPlan.css";

// PGC LIST
const AccountingPlansList = ({newPGC}) => {
  const [accountingPlans, setAccountingPlans] = useState([]);
  const [currentAccountingPlan, setCurrentAccountingPlan] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchAccPlan, setSearchAccPlan] = useState("");



  useEffect(() => {
      retrieveAccountingPlans();
  }
    
  , [newPGC]);

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

  const deleteAccountingPlan = (id) => {
    AccountingPlanDataService.remove(id)
      .then((response) => {
        console.log(response.data);
        retrieveAccountingPlans(); //Refresh list after remove
        setCurrentAccountingPlan(null); //Clear state
        setCurrentIndex(-1); //Reset index
        navigate("/accounting-plans/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  

  const handleSearchChange = (e) => {
    setSearchAccPlan(e.target.value);
  };

  return (
    <>

      {/* PGC list */}
      <section className="accountingPlan__pgcList">
        <h4 className="accountingPlan__header--h4">Todos los planes</h4>

        <div className="accountingPlan__input--filter">
          <input
            className="accountingPlan__input"
            type="text"
            value={searchAccPlan}
            onChange={handleSearchChange}
            placeholder="Nombre PGC"
          />
          <button onClick={findByName}>Buscar</button>
        </div>

        <table className="accountingPlan__table">
          <tbody>
            {accountingPlans && accountingPlans.map((accountingPlan, index) => (
              <tr className="accountingPlan__pgcList-item" key={index} onClick={() => setActiveAccountingPlan(accountingPlan, index)}>
                <td>{accountingPlan.name}</td>
                <td>{accountingPlan.acronym}</td>
                <td>{accountingPlan.description}</td>
                <td>
                  <button className="accountingPlan__button--edit">
                    {/* <i></i> ICONO LÁPIZ */}
                    <Link to={"/accounting-plans/" + accountingPlan.id}>
                      Editar
                    </Link>
                  </button>
                  <button className="accountingPlan__button--remove" 
                          onClick={(e) => {
                            e.stopPropagation(); 
                            deleteAccountingPlan(accountingPlan.id);}}>
                    <i>Eliminar</i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        {/* <button><Link to={"/add-accounting-plan"}>Añadir nuevo plan</Link></button> */}
        {/* <button onClick={removeAllAccountingPlans}>Borrar todo</button> */}
      </section>

    </>
  );
};

export default AccountingPlansList;