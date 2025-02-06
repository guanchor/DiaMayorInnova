import React, { useEffect, useState } from "react";
import HelpExampleDataService from "../../services/HelpExampleService";
import AccountService from "../../services/AccountService";
import "./HelpExample.css";

const AddHelpExample = ({ setNewHelpExample }) => {
  const initialHelpExampleState = {
    id: null,
    creditMoves: "",
    debitMoves: "",
    account_id: 0,
    description: "",
  };

  const [helpExample, setHelpExample] = useState(initialHelpExampleState);
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    AccountService.getAll().then(({ data }) => {
      setAccounts(data);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHelpExample({
      ...helpExample,
      [name]: name === "account_id" ? parseInt(value) : value,
    });
  };

  const validateForm = () => {
    if (
      !helpExample.creditMoves ||
      !helpExample.debitMoves ||
      !helpExample.account_id ||
      !helpExample.description
    ) {
      setError("Todos los campos son obligatorios y deben tener valores válidos.");
      return false;
    }
    setError("");
    return true;
  };

  const saveHelpExample = () => {
    if (validateForm()) {
      HelpExampleDataService.create(helpExample)
        .then(() => {
          setNewHelpExample(false);
        })
        .catch(() => {
          setError("Problema al crear el ejemplo.");
        });
    }
  };

  return (
    <form className="helpExample__form">
      <h2 className="helpExample__form--title">Nuevo Ejemplo</h2>
      {error && <div className="helpExample__error">{error}</div>}
      <div className="helpExample__form--group">
        <label>Movimientos Debe</label>
        <input
          type="text"
          name="debitMoves"
          value={helpExample.debitMoves}
          onChange={handleInputChange}
        />
      </div>
      <div className="helpExample__form--group">
        <label>Movimientos Haber</label>
        <input
          type="text"
          name="creditMoves"
          value={helpExample.creditMoves}
          onChange={handleInputChange}
        />
      </div>
      <div className="helpExample__form--group">
        <label>Cuenta</label>
        <select
          name="account_id"
          value={helpExample.account_id}
          onChange={handleInputChange}
        >
          <option value={0}>-- Seleccionar Cuenta --</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
      </div>
      <div className="helpExample__form--group">
        <label>Descripción</label>
        <input
          type="text"
          name="description"
          value={helpExample.description}
          onChange={handleInputChange}
        />
      </div>
      <button type="button" className="helpExample__action--save" onClick={saveHelpExample}>
        Crear Ejemplo
      </button>
    </form>
  );
};

export default AddHelpExample;
