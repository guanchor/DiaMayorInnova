import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import AccountDataService from '../../services/AccountService';
import { Link } from 'react-router-dom';

const Account = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialAccountState = {
    id: null,
    accountNumber: 0,
    description: "",
    accounting_plan: 0,
    name: ""
  };

  const [currentAccount, setCurrentAccount] = useState(initialAccountState);

  const [message, setMessage] = useState("");

  const getAccount = (id) => {
    AccountDataService.get(id)
    .then((response) => {
      setCurrentAccount(response.data);
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
  };

  useEffect(() => {
    if (id) getAccount(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentAccount({ ...currentAccount, [name]: value});
  };

  const updateAccount = () => {
    AccountDataService.update(currentAccount.id, currentAccount)
    .then(response => {
      console.log(response.data);
      setMessage("Account updated succesfully");
    })
    .catch(e => {
      console.log(e);
    });
  };

  const deleteAccount = () => {
    AccountDataService.remove(currentAccount.id)
    .then((response) => {
      console.log(response.data);
      navigate("/accounts/");
    })
    .catch((e) => {
      console.log(e)
    });
  };
  
  return (
    <>
      <Link to={"/accounts/"}>
        Volver
      </Link>

      {currentAccount ? (
        <div>
          <h4>Accounts</h4>
          <form>
            <div>
              <label htmlFor="accountNumber">Número de cuenta</label>
              <input 
                id="accountNumber"
                name="accountNumber"
                type="text"
                value={currentAccount.accountNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="description">Descripción</label>
              <input
                id="description"
                name="description"
                type="text"
                value={currentAccount.description}
                onChange={handleInputChange}
                required>
              </input>
            </div>

            <div>
              <label htmlFor="accountPlan">Plan de cuentas</label>
              <input 
                id="accountPlan"
                name="accountPlan"
                type="number"
                value={currentAccount.accounting_plan}
                onChange={handleInputChange}
                required>
                </input>
            </div>

            <div>
              <label htmlFor="name">Nombre de cuenta</label>
              <input 
                id="name"
                name="name"
                type="text"
                value={currentAccount.name}
                onChange={handleInputChange}
                required>
              </input>
            </div>
          </form>

          <button onClick={updateAccount}>Editar</button>

          <button onClick={deleteAccount}>Eliminar</button>
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