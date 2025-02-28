import React, { useState, useEffect, useRef } from "react";
import AccountingPlanDataService from "../../services/AccountingPlanService"
import { useNavigate } from "react-router-dom";
import "./AccountingPlan.css";
import AccountingPlan from "./AccountingPlan";
import Modal from "../modal/Modal";

const AccountingPlansList = ({ newPGC }) => {
  const [accountingPlans, setAccountingPlans] = useState([]);
  const [selectedAccountingPlanId, setSelectedAccountingPlanId] = useState(null); // ID del plan a editar
  const modalRef = useRef(null); // Referencia para la modal
  const navigate = useNavigate();
  const [currentAccountingPlan, setCurrentAccountingPlan] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchAccPlan, setSearchAccPlan] = useState("");
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
    setSearchAccPlan(e.target.value);
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

  const openEditModal = (id) => {
    setSelectedAccountingPlanId(id);
    modalRef.current?.showModal(); 
  };

  const closeEditModal = () => {
    setSelectedAccountingPlanId(null);
    modalRef.current?.close();
  };

  const handleSaveSuccess = () => {
    retrieveAccountingPlans();
  };
  
  // Download CSV

  return (
    <>
      <section className="accountingPlan__pgcList">
        <div className="accountingPlan__header">
          <h2 className="accountingPlan__header--h2">Todos los planes</h2>

          <form className="search-bar search-bar--pgc" onSubmit={findByName}>
            <input
              aria-label="Filtrar por nombre"
              className="search-bar_search" 
              type="text"
              value={searchAccPlan}
              onChange={handleSearchChange}
              placeholder="Filtrar por nombre"
            />
            <i className="fi fi-rr-search" onClick={findByName}></i>
          </form>
        </div>
        

        <div className="accountingPlan__table">
          {accountingPlans.length === 0 ? (
            <p>No hay PGCs disponibles</p>
          ) : (
            <table className="accountingPlan_tbody">
              <thead>
                <tr>
                  <th onClick={handleSortClick} style={{cursor: "pointer"}}>
                    Nombre PGC {sortOrder === "ascending" ? <i className="fi fi-rr-angle-small-down"/> : <i className="fi fi-rr-angle-small-up"/>}
                  </th>
                  <th>Acrónimo</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {accountingPlans.map((accountingPlan, index) => (
                  <tr key={index}>
                    <td>{accountingPlan.name}</td>
                    <td>{accountingPlan.acronym}</td>
                    <td>{accountingPlan.description}</td>
                    <td className="accountingPlan__form--actions">
                      <button className="accountingPlan__button--link eye" onClick={()=>navigate("/accounts")}>
                          <i className="fi-rr-eye" /> Ver cuentas
                      </button>
                      <button className="accountingPlan__button--link pencil" onClick={() => openEditModal(accountingPlan.id)}>
                        <i className="fi-rr-pencil" /> Editar
                      </button>
                      <button className="accountingPlan__button--link download" onClick={() => exportToCSV(accountingPlan.id)}>
                        <i className="fi-rr-download" /> CSV
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

      <Modal ref={modalRef} modalTitle="Editar PGC">
        {selectedAccountingPlanId && (
          <AccountingPlan 
            id={selectedAccountingPlanId} 
            onSaveSuccess={handleSaveSuccess}
            onCloseModal={closeEditModal}
          />
        )}
      </Modal>
    </>
  );
};

export default AccountingPlansList;