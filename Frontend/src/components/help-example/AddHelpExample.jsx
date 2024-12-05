import React, { useState } from 'react'
import HelpExampleDataService from '../../services/HelpExampleService';
import { Link } from 'react-router-dom';

const AddHelpExample = () => {
  const initialHelpExampleState = {
    id: null,
    creditMoves: "",
    debitMoves: "",
    account: null,
  };
  const [helpExample, setHelpExample] = useState(initialHelpExampleState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setHelpExample({...helpExample, [name]:value});
  };

  const saveHelpExample = () => {
    var data = {
      creditMoves: helpExample.creditMoves,
      debitMoves: helpExample.debitMoves,
      account: helpExample.account,
    };

    HelpExampleDataService.create(data)
    .then(response => {
      setHelpExample({
        id: response.data.id,
        creditMoves: response.data.creditMoves,
        debitMoves: response.data.debitMoves,
        account: response.data.account,
      });
      setSubmitted(true);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const newHelpExample = () => {
    setHelpExample(initialHelpExampleState);
    setSubmitted(false);
  };

  return (
    <>
      <Link to={"/help-examples/"}>
        Atrás
      </Link>

      <div>
        {submitted ? (
          <div>
            <h4>You submitted succesfully</h4>
            <button onClick={newHelpExample}>Añadir ejemplo</button>
          </div>
        ) : (
          <div>
            <h4>Nuevo ejemplo</h4>
            <div>
              <label>Movimientos Debe</label>
              <input
                type="text"
                id='debitMoves'
                required
                value={helpExample.debitMoves}
                onChange={handleInputChange}
                name='debitMoves'
              />
            </div>

            <div>
              <label>Movimientos Haber</label>
              <input
                type="text"
                id='creditMoves'
                required
                value={helpExample.creditMoves}
                onChange={handleInputChange}
                name='creditMoves'
              />
            </div>

            <div>
              <label>Cuenta</label>
              <input
                type="text"
                id='account'
                required
                value={helpExample.account}
                onChange={handleInputChange}
                name='account'
              />
            </div>

            <button onClick={saveHelpExample}>Crear ejemplo</button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddHelpExample