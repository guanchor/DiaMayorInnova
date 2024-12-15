import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AccountService from '../../services/AccountService';
import "./Account.css";

const AccountsList = ({newAcc}) => {
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

  const deleteAccount = (id) => {
    AccountService.remove(id)
      .then((response) => {
        console.log(response.data);
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
          <table className='account__tbody'>
            <tbody>
              {accounts && accounts.map((account, index) => (
                <tr className='account__accList--item' key={index} onClick={() => setActiveAccount(account, index)}>
                  <td>{account.name}</td>
                  <td>{account.accountNumber}</td>
                  <td>{account.description}</td>
                  <td>{account.accounting_plan_id}</td>
                  <td className='account__form--actions'>
                    <button className='account__button--link inter'>
                      <Link to={"/help-examples"}>
                        <i className='fi-rr-interrogation'/>
                      </Link>
                    </button>
                    <button className='account__button--link pencil'>
                      <Link to={"/accounts/" + account.id}>
                        <i className='fi-rr-pencil'/> Editar
                      </Link>
                    </button>
                    <button className='account__button--remove trash'
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteAccount(account.id);}}>
                      <i className='fi-rr-trash'/>
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