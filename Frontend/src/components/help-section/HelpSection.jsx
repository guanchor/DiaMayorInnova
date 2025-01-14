import useSearchAccountData from '../../hooks/useSearchAccountData';
import Spinner from '../spinners/Spinner';
import { useState } from 'react'
import "./HelpSection.css"

const HelpSection = () => {
  const [searchNumber, setSearchNumber] = useState("");
  const { example, account, isLoading, isError, isData } = useSearchAccountData(searchNumber);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchNumber(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <section className='help_secction__container'>
      <h2 className='help_secction_tittle'>Ayuda</h2>

      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          className='search-bar_search'
          type="search" placeholder='cuenta numero 1234'
          value={searchNumber}
          onChange={handleSearch}
        />
        <i className='fi fi-rr-search'></i>
      </form>

      {isError &&
        <p className='text-error-feedback'>Error al buscar la cuenta, intente otra</p>
      }

      {isLoading &&
        <section className="section-one_loader">
          <Spinner />
        </section>
      }

      {!isLoading && isData &&
        (
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
        )
      }
    </section>
  )
}

export default HelpSection
