import React, { useState, useEffect } from "react";
import AccountingPlanDataService from "../../services/AccountingPlanService"
import { useNavigate } from "react-router-dom";
import "./AccountingPlan.css";

// PGC LIST
const AccountingPlansList = ({ newPGC }) => {
  const [accountingPlans, setAccountingPlans] = useState([]);
  const [currentAccountingPlan, setCurrentAccountingPlan] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchAccPlan, setSearchAccPlan] = useState("");
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("ascending") //Sort control state



  useEffect(() => {
    retrieveAccountingPlans();
  }, [newPGC]);

  const retrieveAccountingPlans = () => {
    AccountingPlanDataService.getAll()
      .then(response => {
        setAccountingPlans(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = (e) => {
    e.preventDefault();
    if (searchAccPlan) {
      const searchTerm = searchAccPlan.toLowerCase(); //Convert search parameter to lowercase
      AccountingPlanDataService.getAll() //Get all plans
        .then(response => {
          const filteredPlans = response.data.filter(plan => 
            plan.name.toLowerCase().includes(searchTerm) //Compare pgc name and search parameters
          );
          setAccountingPlans(filteredPlans); //Get plans filter by search param
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
    const searchTerm = e.target.value.toLowerCase();
    setSearchAccPlan(searchTerm);
  
    if (!searchTerm) {
      retrieveAccountingPlans(); // Si le champ est vide, récupérer tous les PGC
      return;
    }
  
    // Filtrage dynamique des plans comptables
    setAccountingPlans((prevPlans) =>
      prevPlans.filter((plan) =>
        plan.name.toLowerCase().includes(searchTerm)
      )
    );
  };
  

  //PGC sorted by Name column
  const sortAccountinPlans = (order) => {
    const sortedPGC = [...accountingPlans].sort((a, b) => {
      if (order === "ascending") {
        return a.name.localeCompare(b.name);
      }
      else {
        return b.name.localeCompare(a.name);
      }
    });
    setAccountingPlans(sortedPGC);
  };

  //Change order
  const handleSortClick = () => {
    const newOrder = sortOrder === "ascending" ? "descending" : "ascending";
    setSortOrder(newOrder);
    sortAccountinPlans(newOrder);
  }

  return (
    <>

      <section className="accountingPlan__pgcList">
        <div className="accountingPlan__header">
          <h2 className="accountingPlan__header--h2">Todos los planes</h2>

          <form className="search-bar search-bar--pgc">
  <input
    className="search-bar_search"
    type="text"
    value={searchAccPlan}
    onChange={handleSearchChange}
    placeholder="Filtrer par nom"
  />
  <i className="fi fi-rr-search"></i> {/* Icône uniquement décorative */}
</form>

        </div>
        

        <div className="accountingPlan__table">
          {accountingPlans.length === 0 ? ( // Usability upgrade #3 -> Show message if there is no data
            <p>No hay PGCs disponibles</p>
          ) : (
            <table className="accountingPlan_tbody">
              <thead>
                <tr>
                  {/*Order table by Name column */}
                  <th onClick={handleSortClick} style={{cursor: "pointer"}}>
                    Nombre PGC {sortOrder === "ascending" ? <i className="fi fi-rr-angle-small-down"/> : <i className="fi fi-rr-angle-small-up"/>}
                  </th>
                  <th>Acrónimo</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {accountingPlans && accountingPlans.map((accountingPlan, index) => (
                  <tr className="accountingPlan__pgcList-item" key={index} onClick={() => setActiveAccountingPlan(accountingPlan, index)}>
                    <td>{accountingPlan.name}</td>
                    <td>{accountingPlan.acronym}</td>
                    <td>{accountingPlan.description}</td>
                    <td className="accountingPlan__form--actions">
                      <button className="accountingPlan__button--link eye" onClick={()=>navigate("/accounts")}>
                          <i className="fi-rr-eye" /> Ver cuentas
                      </button>
                      <button className="accountingPlan__button--link pencil" onClick={()=>navigate("/accounting-plans/" + accountingPlan.id)}>
                          <i className="fi-rr-pencil" /> Editar
                      </button>
                      <button aria-label="Eliminar PGC" className="accountingPlan__button--remove trash"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAccountingPlan(accountingPlan.id);
                        }}>
                        <i className="fi-rr-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </section>

    </>
  );
};

export default AccountingPlansList;