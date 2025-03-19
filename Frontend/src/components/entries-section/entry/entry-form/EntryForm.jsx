import React, { useEffect, useRef, useState } from "react";
import Modal from "../../../modal/Modal";
import http from "../../../../http-common";
import "./EntryForm.css"

const EntryForm = ({ aptNumber, annotation, updateAnnotation, onDelete }) => {
  const [accounts, setAccounts] = useState([]);
  const accountNumberInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const response = await http.get("/accounts");
        setAccounts(response.data);
      } catch (error) {
        console.error("Error al cargar las cuentas:", error);
      }
    };
    loadAccounts();
  }, []);

  const openAccountModal = async () => {
    try {
      const response = await http.get("/accounts");
      setAccounts(response.data);
      modalRef.current?.showModal();
    } catch (error) {
      console.error("Error al cargar las cuentas:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F1" && document.activeElement === accountNumberInputRef.current) {
        event.preventDefault();
        openAccountModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAccountSelect = (account) => {
    const updated = {
      ...annotation,
      account_number: account.account_number,
      account_name: account.name,
      account_id: account.id
    };
    updateAnnotation(updated);
    modalRef.current?.close();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedAnnotation = { ...annotation, [name]: value };

    if (name === 'account_number') {
      const foundAccount = accounts.find(
        acc => acc.account_number === value
      );
      if (foundAccount) {
        updatedAnnotation.account_id = foundAccount.id;
        updatedAnnotation.account_name = foundAccount.name;
      } else {
        updatedAnnotation.account_id = "";
        updatedAnnotation.account_name = "";
      }
    }
    if (name === 'debit' && value) {
      updatedAnnotation.credit = '';
    } else if (name === 'credit' && value) {
      updatedAnnotation.debit = '';
    }
    updateAnnotation(updatedAnnotation);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    onDelete();
  }

  return (
    <div className='entry_form_wrapper'>
      <p className='entry_apt'>{aptNumber}</p>
      <form action="" className='entry_form'>
        <div className="form_group">
          <input
            type="number"
            id='account_number'
            aria-labelledby="tittle_account-number"
            name='account_number'
            placeholder='12345'
            onChange={handleChange}
            value={annotation.account_number || ''}
            min={0}
            ref={accountNumberInputRef} />
        </div>
        <div className="form_group">
          <input
            type="text"
            id='account_name'
            aria-labelledby="tittle_account-name"
            placeholder='Cuenta carne'
            name='account_name'
            onChange={handleChange}
            value={annotation.account_name || ''}
            readOnly />
        </div>
        <div className="form_group">
          <input
            type="number"
            id='debit'
            aria-labelledby="tittle_debit"
            name='debit'
            placeholder='1000'
            onChange={handleChange}
            value={annotation.debit || ''}
            disabled={annotation.credit} />
        </div>
        <div className="form_group">
          <input
            type="number"
            id='credit'
            aria-labelledby="tittle_credit"
            name='credit'
            placeholder='1000'
            onChange={handleChange}
            value={annotation.credit || ''}
            disabled={annotation.debit} />
        </div>
        <button className='btn-trash' aria-label="Eliminar Apunte" onClick={handleDelete}><i className='fi fi-rr-trash'></i></button>
      </form>

      <Modal ref={modalRef} modalTitle="Seleccionar Cuenta" showButton={false}>
        <div className="account-list">
          {accounts.map((account) => (
            <div
              key={account.account_number}
              className="account-item"
              onClick={() => handleAccountSelect(account)}
            >
              <span className="account-item_account">{account.account_number}</span>
              <span className="account-item_account">{account.name}</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}

export default EntryForm
