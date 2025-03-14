import AddAccountingPlan from "../../components/accounting-plan/AddAccountingPlan";
import AccountingPlansList from "../../components/accounting-plan/ListAccountingPlan";
import "./AccountingPlans.css"
import { useNavigate } from "react-router-dom";

import React, { useState } from 'react'

const AccountingPlans = () => {

  const [newPGC, setNewPGC] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <main className="accountingPlan__page">
        <div className="accountingPlan__page--header">
          <button className="btn light accountingPlan__btnHome" onClick={() => navigate("/home")}>
            <i className="fi-rr-arrow-small-left" />
          </button>
          <h1 className="accountingPlan__page--title">Creación PGC</h1>
        </div>
        

<<<<<<< HEAD
        <section className="accountingPlan__addPGC">
=======
        <button className="accountingPlan__btnHome" onClick={() => navigate("/home")}>
          <i className="fi-rr-arrow-small-left" /> Volver
        </button>
        <h1 className="accountingPlan__page--title">Creación PGC</h1>

        <section className="accountingPlan__addPGC" >
>>>>>>> ef9116d (Correction suggestion and page for listing notes and the result of the grade.)
          <AddAccountingPlan setNewPGC={setNewPGC} />
        </section>
        <section className="accountingPlan__listPGC">
          <AccountingPlansList newPGC={newPGC} />
        </section>
      </main>
    </>
  );
}

export default AccountingPlans;
