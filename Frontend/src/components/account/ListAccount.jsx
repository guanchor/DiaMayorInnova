import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AccountService from '../../services/AccountService';
import "./Account.css";

const AccountsList = ({ newAcc }) => {
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchAccount, setSearchAccount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    retrieveAccounts();
  }, [newAcc]);

  const retrieveAccounts = () => {
    AccountService.getAll()
      .then(response => {
        setAccounts(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    if (searchAccount) {
      AccountService.findByName(searchAccount)
        .then(response => {
          setAccounts(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      retrieveAccounts();
    }
  };

  const setActiveAccount = (account, index) => {
    setCurrentAccount(account);
    setCurrentIndex(index);
  }

  const deleteAccount = (id) => {
    AccountService.remove(id)
      .then((response) => {
        retrieveAccounts();
        setCurrentAccount(null);
        setCurrentIndex(-1);
        navigate("/accounts/");
      })
      .catch((e) => {
        console.log(e)
      });
  }

  const handleSearchChange = (e) => {
    setSearchAccount(e.target.value);
    console.log(searchAccount)
  };


  return (
    <>

      <section className='account_accList'>
        <h2 className='account__header--h2'>Todas las cuentas</h2>

        <div className='account__input--filter'>
          <input
            aria-label='Filtrar por nombre de cuenta'
            className='account__input'
            type='text'
            value={searchAccount}
            onChange={handleSearchChange}
            placeholder='Filtrar por nombre de cuenta'
          />
          <button className='btn account__button' onClick={findByName}>Buscar</button>
        </div>

        <div className='account__table'>
          <table className='account__tbody'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Nº Cuenta</th>
                <th>Descripción</th>
                <th>PGC</th>
              </tr>
            </thead>
            <tbody>
              {accounts && accounts.map((account, index) => (
                <tr className='account__accList--item' key={index} onClick={() => setActiveAccount(account, index)}>
                  <td>{account.name}</td>
                  <td>{account.account_number}</td>
                  <td>{account.description}</td>
                  <td>{account.accounting_plan_id}</td>
                  <td className='account__form--actions'>
                    <button className='account__button--link inter' onClick={() => navigate("/help-examples")}>
                      <i className='fi-rr-interrogation'/> Ayuda
                    </button>
                    <button className='account__button--link pencil' onClick={() => navigate("/accounts/" + account.id)}>
                      <i className='fi-rr-pencil' /> Editar
                    </button>
                    <button aria-label="Eliminar cuenta" className='account__button--remove trash'
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAccount(account.id);
                      }}>
                      <i className='fi-rr-trash' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>
    </>
  );
};

export default AccountsList