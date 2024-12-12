import React, { useEffect, useState } from 'react'
import HelpExampleService from '../../services/HelpExampleService'
import AccountService from '../../services/AccountService';
import "./AuxSectionOne.css"



const AuxSectionOne = () => {
  const [example, setExample] = useState({});
  const [account, setAccount] = useState({});

  useEffect(() => {
    AccountService.get(1)
      .then(({ data }) => {
        setAccount(data)
        HelpExampleService.get(1)
          .then(({ data }) => {
            setExample(data)
            console.log(data)
          })
        console.log(data)
      })

  }, [])

  return (
    <section className='help_secction__container'>
      <h2 className='help_secction_tittle'>Ayuda</h2>
      <input type="search" placeholder='cuenta numero 1234' />
      <div className="account_info">
        <h3 >Cuenta : {account.name}</h3>
        <p>{account.description}</p>
        <h3>Descripción</h3>
        <p>{example.description}</p>
      </div>
      <h2>Movimientos</h2>
      <div className="moves_info">
        <h3>Debe</h3>
        <p>{example.debitMoves}</p>
        <h3>Haber</h3>
        <p>{example.creditMoves}</p>
      </div>
    </section>
  )
}

export default AuxSectionOne
