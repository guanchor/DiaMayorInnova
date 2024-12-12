import React, { useState } from 'react'
import AccountDataService from '../../services/AccountService';
import { Link } from 'react-router-dom';

const AddAccount = () => {
  const initialAccountState = {
    accountNumber: 0,
    description: "",
    accounting_plan_id: 0,
    name: "",
  };
  const [account, setAccount] = useState(initialAccountState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setAccount({...account, [name]:value});
  };

  const saveAccount = () => {
    var data = {
      accountNumber: account.accountNumber,
      description: account.description,
      accounting_plan_id: account.accounting_plan_id,
      name: account.name,
    };

    AccountDataService.create(data)
    .then(response => {
      setAccount({
        id: response.data.id,
        accountNumber: response.data.accountNumber,
        description: response.data.description,
        accounting_plan_id: response.data.accounting_plan_id,
        name: response.data.name,
      });
      setSubmitted(true);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const newAccount = () => {
    setAccount(initialAccountState);
    setSubmitted(false);
  };

  return (
    <>
      <Link to={"/accounts/"}>
        Atrás
      </Link>

      <div>
        {submitted ? (
          <div>
            <h4>You submitted succesfully</h4>
            <button onClick={newAccount}>Añadir cuenta</button>
          </div>
        ) : (
          <div>
            <h4>Nueva cuenta</h4>
            <div>
              <label>Número de cuenta</label>
              <input
                type="text"
                id='accountNumber'
                required
                value={account.accountNumber}
                onChange={handleInputChange}
                name='accountNumber'
              />
            </div>

            <div>
              <label>Nombre de cuenta</label>
              <input
                type="text"
                id='name'
                required
                value={account.name}
                onChange={handleInputChange}
                name='name'
              />
            </div>

            <div>
              <label>Descripción</label>
              <input
                type="text"
                id='description'
                required
                value={account.description}
                onChange={handleInputChange}
                name='description'
              />
            </div>

            <div>
              <label>Plan de cuentas</label>
              <input
                type="text"
                id='accounting_plan_id'
                required
                value={account.accounting_plan_id}
                onChange={handleInputChange}
                name='accounting_plan_id'
              />
            </div>

            <button onClick={saveAccount}>Crear cuenta</button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddAccount;