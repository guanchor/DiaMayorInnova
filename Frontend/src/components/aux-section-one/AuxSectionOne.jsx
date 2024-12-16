import React, { useEffect, useState } from 'react'
import HelpExampleService from '../../services/HelpExampleService'
import AccountService from '../../services/AccountService';
import "./AuxSectionOne.css"
import Spinner from '../spinners/Spinner';

const AuxSectionOne = () => {
  const [example, setExample] = useState({});
  const [account, setAccount] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchNumber, setSearchNumber] = useState("");
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (searchNumber.length >= 4) {
      setIsLoading(true);
      AccountService.findByNumber(searchNumber)
        .then(({ data }) => {
          setAccount(data);
          console.log(data);
          setIsLoading(false);
          HelpExampleService.findByAccount(account.id)
            .then(({ data }) => {
              console.log(data)
              setExample(data);
            })
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          console.error("Error fetching data:", error);
        });
    }
  }, [searchNumber]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchNumber(value);
  }

  if (isLoading) {
    return (
      <section className="section-one_loader">
        <Spinner />
      </section>
    )
  }

  if (isError) {
    return (
      <section className="help_secction__container error-feedback">
        <p className='text-error-feedback'>Error en la busqueda de la cuenta</p>
        <button className='btn' onClick={() => setIsError(false)}><i className='fi fi-rr-arrow-small-left'></i> Volver a la ayuda</button>
      </section>
    )
  }

  return (
    <section className='help_secction__container'>
      <h2 className='help_secction_tittle'>Ayuda</h2>
      <div className="search-bar">
        <input
          className='search-bar_search'
          type="search" placeholder='cuenta numero 1234'
          value={searchNumber}
          onChange={handleSearch}
        />
        <i className='fi fi-rr-search'></i>
      </div>
      {account && example ? (
        <>
          <div className="account_info">
            <h3>Cuenta : {account.account_number}</h3>
            <p>{account.description}</p>
            <h3>Descripción</h3>
            <p>{example ? example.description : "ejemplo de la descripcion"}</p>
          </div>
          <h2>Movimientos</h2>
          <div className="moves_info scroll-style">
            <h3>Debe</h3>
            <p>{example.debitMoves}</p>
            <h3>Haber</h3>
            <p>{example.creditMoves}</p>
          </div>
        </>
      ) : <section className="section-one_loader">
        <Spinner />
      </section>}


    </section>
  )
}

export default AuxSectionOne
