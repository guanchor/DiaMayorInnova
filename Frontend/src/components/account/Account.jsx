import React, { useState, useEffect } from 'react'
import AccountDataService from '../../services/AccountService';

const Account = ({id, onSaveSuccess, onCloseModal}) => {

  const initialAccountState = {
    id: null,
    account_number: 0,
    description: "",
    accounting_plan_id: 0,
    name: ""
  };

  const [currentAccount, setCurrentAccount] = useState(initialAccountState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMessage("");
    setError("");

    if (id) {
      AccountDataService.get(id)
        .then(response => {
          console.log("DAME LA CUENTAAAAAAAAA", response)
          setCurrentAccount(response.data);
          setError("");
        })
        .catch(e => {
          console.log(e)
          setError("Error al cargar cuenta");
        });
    }

    return () => {
      setMessage("");
      setError("");
    };
  }, [id, onCloseModal]);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setCurrentAccount({...currentAccount, [name]: value});
  };

  const updateAccount = async (e) => {
    e.preventDefault();

    setError("");

    if (!currentAccount.name || !currentAccount.account_number || !currentAccount.description || !currentAccount.accounting_plan_id) {
      setMessage("");
      setError("Todos los campos son oblgatorios");
      return;
    }

    try {
      await AccountDataService.update(currentAccount.id, currentAccount);
      setMessage("Actualizado correctamente");
      setError("");
      onSaveSuccess();
    } catch (error) {
      setError("Error al actualizar");
      setMessage("");
    }
  };

  // useEffect(() => {
  //   if (id) getAccount(id);
  // }, [id]);

  // const getAccount = (id) => {
  //   AccountDataService.get(id)
  //     .then((response) => {
  //       setCurrentAccount(response.data);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setCurrentAccount({ ...currentAccount, [name]: value });
  // };

  // const validateForm = () => {
  //   if (!currentAccount.name || !currentAccount.account_number || !currentAccount.description || !currentAccount.accounting_plan_id) {
  //     setError("Todos los campos son obligatorios y deben tener valores válidos.");
  //     return false;
  //   };
  //   setError("")
  //   return true;
  // }

  // const updateAccount = () => {
  //   if (validateForm()) {
  //     AccountDataService.update(currentAccount.id, currentAccount)
  //       .then(response => {
  //         setMessage("Account updated succesfully");
  //       })
  //       .catch(e => {
  //         console.error(e);
  //         setError("Hubo un problema al actualizar la cuenta.");
  //       });
  //   }
  // };

  // const deleteAccount = () => {
  //   AccountDataService.remove(currentAccount.id)
  //   .then((response) => {
  //     console.log(response.data);
  //     navigate("/accounts/");
  //   })
  //   .catch((e) => {
  //     console.log(e)
  //   });
  // };
  
  return (
    <>
      <div className='editForm__container'>
        <form onSubmit={updateAccount}>
          <div className='editForm__form--row'>
            <div className='editForm__form--group'>
              <label> Nombre
                <input
                  className='editForm__input'
                  name='name' value={currentAccount.name}
                  onChange={handleInputChange}/>
              </label>
            </div>

            <div className='editForm__form--group'>
              <label> Nº Cuenta
                <input
                  className='editForm__input'
                  name='account_number' value={currentAccount.account_number}
                  onChange={handleInputChange}/>
              </label>
            </div>

            <div className='editForm__form--group'>
              <label> PGC
                <input
                  className='editForm__input'
                  name='accounting_plan_id' value={currentAccount.accounting_plan_id}
                  onChange={handleInputChange}
                  />
              </label>
            </div>
          </div>

          <div className='editForm__form--row'>
            <div className='editForm__form--group'>
              <label> Descripción
                <input
                  className='editForm__input'
                  name='description' value={currentAccount.description}
                  onChange={handleInputChange}/>
              </label>
            </div>
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          {message && <p style={{ color: 'green', textAlign: 'center'}}>{message}</p>}

          <button className="editForm__form--save" type="submit">Guardar</button>
      
        </form>
      </div>

      
    </>
  )
}

export default Account