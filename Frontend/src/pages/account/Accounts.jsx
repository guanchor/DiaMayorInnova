import { useNavigate } from "react-router-dom";
import AddAccount from "../../components/account/AddAccount";
import AccountsList from "../../components/account/ListAccount";
import "./Account.css"


import React, { useState } from 'react'

const Accounts = () => {

  const [newAcc, setNewAcc] = useState(false);
  const navigate = useNavigate();

  return (
    <>

      <section className="account__page">
        
          <button className="account__btnHome" onClick={() => navigate("/home")}>
            <i className="fi-rr-arrow-small-left"/> Volver
          </button>
          <h1 className="account__page--title">Crear Cuenta</h1>
        
          <section className="account__addAcc" >
            <AddAccount setNewAcc={setNewAcc}/>
          </section>
          <section className="account__listAcc" >
            <AccountsList newAcc={newAcc}/>
          </section>
      </section>
      
    </>
  )
}

export default Accounts