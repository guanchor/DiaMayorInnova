import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AccountService from '../../services/AccountService';
import "./Account.css";

const AccountsList = ({ newAcc }) => {
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchAccount, setSearchAccount] = useState("");

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
  };


  return (
    <>

      <section className='account_accList'>
        <h4 className='account__header--h4'>Todas las cuentas</h4>

        <div className='account__input--filter'>
          <input
            className='account__input'
            type='text'
            value={searchAccount}
            onChange={handleSearchChange}
            placeholder='Filtrar por nombre de cuenta'
          />
          <button className='btn account__button' onClick={findByName}>Buscar</button>
        </div>

        <div className='account__table'>
          <table>
            <tbody>
              {accounts && accounts.map((account, index) => (
                <tr className='account__accList--item' key={index} onClick={() => setActiveAccount(account, index)}>
                  <td>{account.name}</td>
                  <td>{account.accountNumber}</td>
                  <td>{account.description}</td>
                  <td>{account.accounting_plan_id}</td>
                  <td className='account__accList--actions'>
                    <button className='account__button--edit pencil'>
                      <Link to={"/accounts/" + account.id}>
                        <i className='fi-rr-pencil' /> Editar
                      </Link>
                    </button>
                    <button className='account__button--remove trash'
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
      {/* <section>
        <h2>Cuentas</h2>
        <Link to={"/home"}>
          Volver al Home
        </Link>

        <div>
          <input 
            type="text" 
            value={searchAccount}
            onChange={handleSearchChange}
            placeholder="Filtrar cuenta"
          />
          <button onClick={findByName}>Buscar</button>
        </div>

        <ul className='account_list'>
          {accounts && accounts.map((account, index) => (
            <li onClick={() => setActiveAccount(account, index)} key={index}>
              {account.name}
            </li>
          ))}
        </ul>

        <button><Link to={"/add-account"}>Añadir nueva cuenta</Link></button>
      </section>

      <section className='account_wrapper'>
        {currentAccount ? (
          <div className='currentAccount_detail'>
            <h3>Cuenta</h3>
            <div className='detail'>
              <label>{""}
                {currentAccount.name}
              </label>
            </div>
            <div className='detail'>
              <label>{""}
                {currentAccount.accountNumber}
              </label>
            </div>
            <div className='detail'>
              <label>{""}
                {currentAccount.description}
              </label>
            </div>
            <div className='detail'>
              <label>{""}
                {currentAccount.accounting_plan_plan}
              </label>
            </div>
            <Link to={"/accounts/" + currentAccount.id}>
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Haga click sobre una cuenta</p>
          </div>
        )}
      </section> */}
    </>
  );
};

export default AccountsList