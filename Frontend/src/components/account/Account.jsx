import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import AccountDataService from '../../services/AccountService';
import "./Account.css";
import { Link } from 'react-router-dom';

const Account = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialAccountState = {
    id: null,
    accountNumber: 0,
    description: "",
    accounting_plan_id: 0,
    name: ""
  };

  const [currentAccount, setCurrentAccount] = useState(initialAccountState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) getAccount(id);
  }, [id]);

  const getAccount = (id) => {
    AccountDataService.get(id)
      .then((response) => {
        setCurrentAccount(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentAccount({ ...currentAccount, [name]: value });
  };

  const validateForm = () => {
    if (!account.name || !account.accountNumber || !account.description || !account.accounting_plan_id) {
      setError("Todos los campos son obligatorios y deben tener valores válidos.");
      return false;
    };
    setError("")
    return true;
  }

  const updateAccount = () => {
    if (validateForm()) {
      AccountDataService.update(currentAccount.id, currentAccount)
        .then(response => {
          setMessage("Account updated succesfully");
        })
        .catch(e => {
          console.error(e);
          setError("Hubo un problema al actualizar la cuenta.");
        });
    }
  };

  const deleteAccount = () => {
    AccountDataService.remove(currentAccount.id)
      .then((response) => {
        navigate("/accounts/");
      })
      .catch((e) => {
        console.error(e)
      });
  };

  return (
    <>

      {currentAccount ? (
        <div>
          <h4 className='account__header--h4'>Detalles de la cuenta</h4>
          <form className='account__form'>
            <div className='account__form--group'>
              <label htmlFor="accountNumber">Número de cuenta</label>
              <input
                className='account__input'
                id="accountNumber"
                name="accountNumber"
                type="text"
                value={currentAccount.accountNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='account__form--group'>
              <label htmlFor="description">Descripción</label>
              <input
                className='account__input'
                id="description"
                name="description"
                type="text"
                value={currentAccount.description}
                onChange={handleInputChange}
                required>
              </input>
            </div>

            <div className='account__form--group'>
              <label htmlFor="accountPlan">Plan de cuentas</label>
              <input
                className='account__input'
                id="accountPlan"
                name="accountPlan"
                type="number"
                value={currentAccount.accounting_plan}
                onChange={handleInputChange}
                required>
              </input>
            </div>

            <div className='account__form--group'>
              <label htmlFor="name">Nombre de cuenta</label>
              <input
                className='account__input'
                id="name"
                name="name"
                type="text"
                value={currentAccount.name}
                onChange={handleInputChange}
                required>
              </input>
            </div>
          </form>

          <div>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            <button className="accountingPlan__button--form" onClick={updateAccount}>Editar</button>
            <button className="accountingPlan__button--remove" onClick={deleteAccount}>Borrar</button>
            <p>{message}</p>
          </div>

        </div>
      ) : (
        <div>
          <p>No hay información</p>
        </div>
      )}
    </>
  )
}

export default Account