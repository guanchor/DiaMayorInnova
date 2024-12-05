import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AccountService from '../../services/AccountService';

const AccountsList = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchAccount, setSearchAccount] = useState("");

  useEffect(() => {
    retrieveAccounts();
  }, []);

  const retrieveAccounts = () => {
    AccountService.getAll()
      .then(response => {
        setAccounts(response.data);
        console.log(response.data);
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

  const handleSearchChange = (e) => {
    setSearchAccount(e.target.value);
  };

  return (
    <>
      <section>
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
      </section>
    </>
  );
};

export default AccountsList