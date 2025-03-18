import React, { useState, useEffect } from "react";
import AccountingPlanDataService from "../../services/AccountingPlanService"
import { useNavigate } from "react-router-dom";
import "./AccountingPlan.css";
import AccountsModal from "../modal/AccountModal";


// PGC LIST
const AccountingPlansList = ({ newPGC }) => {
  const [accountingPlans, setAccountingPlans] = useState([]);
  const [currentAccountingPlan, setCurrentAccountingPlan] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchAccPlan, setSearchAccPlan] = useState("");
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("ascending") //Sort control state
  const [accounts, setAccounts] = useState([]); // Stocker les comptes récupérés
  const [isModalOpen, setIsModalOpen] = useState(false); // Gérer l'affichage de la modale




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

  const fetchAccountsByPGC = (pgcId) => {
    AccountingPlanDataService.getAccountsByPGC(pgcId)
      .then(response => {
        setAccounts(response.data);
        setIsModalOpen(true); // Ouvrir la modale après récupération des comptes
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des comptes :", error);
      });
  };

  const handleDownloadXLSX = async (pgcId, pgcAcronym) => {
    try {
        const response = await AccountingPlanDataService.exportXLSXByPGC(pgcId);

        if (!response || response.status !== 200) {
            throw new Error("Échec du téléchargement du fichier.");
        }

        // 📥 Télécharger le fichier
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `comptes_${pgcAcronym}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error("❌ Erreur lors du téléchargement :", error);
        alert("⛔ Impossible de télécharger le fichier.");
    }
};


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
                   
                    <button className="accountingPlan__button--link eye" onClick={() => fetchAccountsByPGC(accountingPlan.id)}>
                      <i className="fi-rr-eye" /> Ver cuentas
                    </button>

                    <button className="accountingPlan__button--download"onClick={() => handleDownloadXLSX(accountingPlan.id, accountingPlan.acronym)}>
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
      <AccountsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} accounts={accounts} />

    </>
  );
};

export default AccountingPlansList;