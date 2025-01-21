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
          type="search" placeholder='Buscar cuenta'
          value={searchNumber}
          onChange={handleSearch}
          id='search-bar_search'
          aria-label='Buscador de las ayudas de la cuenta'
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
              <h3 className='help_section__subtittle'>Cuenta </h3>
              <h4 className='help_section__lead'>{account.account_number}</h4>
              <p>{account.description}</p>
              <h3 className='help_section__subtittle'>Descripción</h3>
              <p>{example ? example.description : "ejemplo de la descripcion"}</p>
            </div>
            <h3 className='help_section__subtittle' >Movimientos</h3>
            <div className="moves_info scroll-style">
              <h4 className='help_section__lead'>Debe</h4>
              <p>{example.debitMoves}</p>
              <h4 className='help_section__lead'>Haber</h4>
              <p>{example.creditMoves}</p>
            </div>
          </>
        )
      }
    </section>
  )
}

export default HelpSection
