import AddAccountingPlan from "../../components/accounting-plan/AddAccountingPlan";
import AccountingPlansList from "../../components/accounting-plan/ListAccountingPlan";
import "./AccountingPlans.css"
import { Link } from "react-router-dom";

import React, { useState } from 'react'

const AccountingPlans = () => {

  const [newPGC, setNewPGC] = useState(false);

  return (
    <>

      <section className="accountingPlan__page">
        
          <button className="accountingPlan__btnHome">
            <Link to={"/home"}>
              <i className="fi-rr-arrow-small-left"/> Volver
            </Link>
         </button>
         <p className="accountingPlan__page--title">Creación PGC</p>
        
        <section className="accountingPlan__addPGC" >
          <AddAccountingPlan setNewPGC={setNewPGC}/>
        </section>
        <section className="accountingPlan__listPGC" >
          <AccountingPlansList newPGC={newPGC}/>
        </section>
      </section>
      
    </>
  )
}

export default AccountingPlans