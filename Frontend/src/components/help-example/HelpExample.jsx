import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import HelpExampleDataService from '../../services/HelpExampleService';
import { Link } from 'react-router-dom';

const HelpExample = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialHelpExampleState = {
    id: null,
    creditMoves: "",
    debitMoves: "",
    account: null,
  };

  const [currentHelpExample, setCurrentHelpExample] = useState(initialHelpExampleState);

  const [message, setMessage] = useState("");

  const getHelpExample = (id) => {
    HelpExampleDataService.get(id)
    .then((response) => {
      setCurrentHelpExample(response.data);
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
  };

  useEffect(() => {
    if (id) getHelpExample(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentHelpExample({ ...currentHelpExample, [name]: value});
  };

  const updateHelpExample = () => {
    HelpExampleDataService.update(currentHelpExample.id, currentHelpExample)
    .then(response => {
      console.log(response.data);
      setMessage("Help example updated succesfully");
    })
    .catch(e => {
      console.log(e);
    });
  };

  const deleteHelpExample = () => {
    HelpExampleDataService.remove(currentHelpExample.id)
    .then((response) => {
      console.log(response.data);
      navigate("/help-examples/");
    })
    .catch((e) => {
      console.log(e)
    });
  };
  
  return (
    <>
      <Link to={"/help-examples/"}>
        Volver
      </Link>

      {currentHelpExample ? (
        <div>
          <h4>Ejemplo</h4>
          <form>
            <div>
              <label htmlFor="account">Cuenta</label>
              <input 
                id="account"
                name="account"
                type="text"
                value={currentHelpExample.account}
                onchange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="description">Movimientos Debe</label>
              <input 
                id="debitMoves"
                name="debitMoves"
                type="text"
                value={currentHelpExample.debitMoves}
                onchange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="accountPlan">Movimientos Haber</label>
              <input 
                id="creditMoves"
                name="creditMoves"
                type="text"
                value={currentHelpExample.creditMoves}
                onchange={handleInputChange}
                required
              />
            </div>
          </form>
        </div>
      ) : (
        <div>
          <p>No hay información</p>
        </div>
      )}
    </>
  )
}

export default HelpExample