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
        <button><Link to={"/home"}>Volver</Link></button>
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