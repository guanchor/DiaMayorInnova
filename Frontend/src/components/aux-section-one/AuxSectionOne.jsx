import { useState } from 'react'
import Spinner from '../spinners/Spinner';
import useSearchAccountNum from '../../hooks/useSearchAccountNum';
import "./AuxSectionOne.css"

const AuxSectionOne = () => {
  const [searchNumber, setSearchNumber] = useState("");
  const { example, isLoading, isError, account, setIsError } = useSearchAccountNum(searchNumber);

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
        <p className='text-error-feedback'>Cuenta no encontrada intente otro numero</p>
        <button className='btn' onClick={() => setIsError(false)}><i className='fi fi-rr-arrow-small-left'></i> Buscar de nuevo</button>
      </section>
    )
  }

  return (
    <section className='help_secction__container'>
      <h2 className='help_secction_tittle'>Ayuda</h2>
      <search className="search-bar">
        <input
          className='search-bar_search'
          type="search" placeholder='cuenta numero 1234'
          value={searchNumber}
          onChange={handleSearch}
        />
        <i className='fi fi-rr-search'></i>
      </search>

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
      ) :
        <section className="section-one_loader">
          <Spinner />
        </section>}

    </section>
  )
}

export default AuxSectionOne
