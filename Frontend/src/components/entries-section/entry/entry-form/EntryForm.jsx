import React, { useEffect, useRef, useState } from "react";
import Modal from "../../../modal/Modal";
import AccountService from "../../../../services/AccountService";
import PaginationMenu from "../../../pagination-menu/PaginationMenu";
import "./EntryForm.css";

const EntryForm = ({ aptNumber, annotation, updateAnnotation, onDelete, exercise }) => {
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const accountNumberInputRef = useRef(null);
  const modalRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    console.log("useEffect déclenché - searchQuery:", searchQuery, "currentPage:", currentPage); // Log 1
    const loadAccounts = async () => {
      try {
        const isNumber = /^\d+$/.test(searchQuery);
        console.log("loadAccounts - Appel à AccountService.getAll avec:", { currentPage, limit: 5, name: isNumber ? "" : searchQuery, account_number: isNumber ? searchQuery : "" }); // Log 2
        const response = await AccountService.getAll(currentPage, 5, isNumber ? "" : searchQuery, isNumber ? searchQuery : "");
        console.log("loadAccounts - Réponse:", response); // Log 3
        setAccounts(response.accounts || []);
        setTotalPages(response.meta?.total_pages || 1);
      } catch (error) {
        console.error("Error loading accounts:", error);
      }
    };
    loadAccounts();
  }, [searchQuery, currentPage]);

  const openAccountModal = () => {
    console.log("openAccountModal appelé"); // Log 4
    setSearchQuery("");
    setCurrentPage(1);
    modalRef.current?.showModal();
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
    console.log("handleAccountSelect - Compte sélectionné:", account); // Log 5
    const updated = {
      ...annotation,
      number: aptNumber,
      account_number: account.account_number,
      account_name: account.name,
      account_id: account.id,
    };
    updateAnnotation(updated);
    modalRef.current?.close();
  };

  const searchAccount = async (accountNumber) => {
    try {
      console.log("searchAccount - Appel à AccountService.findByNumber avec:", accountNumber); // Log 6
      const response = await AccountService.findByNumber(accountNumber);
      console.log("searchAccount - Réponse:", response); // Log 7
      if (response.data) {
        setAccounts(prevAccounts => {
          const exists = prevAccounts.some(acc =>
            acc.account_number === response.data.account_number &&
            acc.id === response.data.id
          );
          if (!exists) {
            return [...prevAccounts, response.data];
          }
          return prevAccounts;
        });
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Error al buscar la cuenta:", error);
      return null;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("handleChange - name:", name, "value:", value); // Log 8
    let processedValue = value;

    if (name === "debit" || name === "credit") {
      processedValue = value.replace(",", ".");
      const parts = processedValue.split(".");
      if (parts.length > 2) {
        processedValue = parts[0] + "." + parts.slice(1).join("");
      }
    }

    const updatedAnnotation = { ...annotation, [name]: processedValue };

    if (name === "account_number") {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      updateAnnotation(updatedAnnotation);

      if (!value) {
        updateAnnotation({ ...updatedAnnotation, account_id: "", account_name: "" });
        return;
      }

      const foundAccount = accounts.find(acc => acc.account_number === value);
      if (foundAccount) {
        console.log("Compte trouvé localement:", foundAccount); // Log 9
        updateAnnotation({
          ...updatedAnnotation,
          account_id: foundAccount.id,
          account_name: foundAccount.name
        });
        return;
      }

      debounceTimeout.current = setTimeout(async () => {
        console.log("handleChange - Déclenchement différé pour account_number:", value); // Log 10
        const account = await searchAccount(value);
        if (account) {
          updateAnnotation({
            ...updatedAnnotation,
            account_id: account.id,
            account_name: account.name || ""
          });
        } else {
          updateAnnotation({
            ...updatedAnnotation,
            account_id: "",
            account_name: "",
            account_number: value
          });
        }
      }, 500);
    } else if (name === "debit" && processedValue) {
      updatedAnnotation.credit = "";
      updateAnnotation(updatedAnnotation);
    } else if (name === "credit" && processedValue) {
      updatedAnnotation.debit = "";
      updateAnnotation(updatedAnnotation);
    } else {
      updateAnnotation(updatedAnnotation);
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("handleDelete appelé"); // Log 11
    onDelete();
  };

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    console.log("changePage - Nouvelle page:", newPage); // Log 12
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    console.log("handleSearchChange - Nouvelle recherche:", event.target.value); // Log 13
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, []);

  return (
    <div className="entry_form_wrapper">
      <p className="entry_apt">{aptNumber}</p>
      <form className="entry_form">
        <div className="entry_form_inputs__wrapper">
          <div className="form_group">
            <input
              type="number"
              name="account_number"
              placeholder="477"
              onChange={handleChange}
              value={annotation.account_number || ""}
              min={0}
              ref={accountNumberInputRef}
              disabled={exercise?.finished}
            />
          </div>
          <div className="form_group tittle_account-name--no-visible">
            <input
              type="text"
              name="account_name"
              placeholder="Hacienda Pública, IGIC soportado"
              onChange={handleChange}
              value={annotation.account_name || ""}
              disabled={exercise?.finished}
              readOnly
            />
          </div>
          <div className="form_group">
            <input
              type="text"
              name="debit"
              placeholder="1000.00"
              onChange={handleChange}
              value={annotation.debit || ""}
              disabled={annotation.credit || exercise?.finished}
              pattern="[0-9]*[.,]?[0-9]*"
              inputMode="decimal"
            />
          </div>
          <div className="form_group">
            <input
              type="text"
              name="credit"
              placeholder="1000.00"
              onChange={handleChange}
              value={annotation.credit || ""}
              disabled={annotation.debit || exercise?.finished}
              pattern="[0-9]*[.,]?[0-9]*"
              inputMode="decimal"
            />
          </div>
        </div>
        <button
          className="btn-trash"
          onClick={handleDelete}
          disabled={exercise?.finished}
        >
          <i className="fi fi-rr-trash"></i>
        </button>
      </form>

      <Modal ref={modalRef} modalTitle="Seleccionar Cuenta" showButton={false}>
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by number or name..."
            className="search-input"
          />
        </div>
        <div className="account-list">
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <div
                key={`${account.account_number}-${account.id}`}
                className="account-item"
                onClick={() => handleAccountSelect(account)}
              >
                <span className="account-item_account">{account.account_number}</span>
                <span className="account-item_account">{account.name}</span>
              </div>
            ))
          ) : (
            <p>No accounts found.</p>
          )}
        </div>

        {!searchQuery && (
          <PaginationMenu
            currentPage={currentPage}
            setCurrentPage={changePage}
            totalPages={totalPages}
          />
        )}
      </Modal>
    </div>
  );
};

export default EntryForm;