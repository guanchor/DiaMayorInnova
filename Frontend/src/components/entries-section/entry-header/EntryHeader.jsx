import React, { useRef } from 'react';
import Modal from "../../modal/Modal";
import "./EntryHeader.css"

const EntryHeader = ({ addEntry, selectedStatement, examStarted }) => {

  const modalRef = useRef(null);
  
  return (
    <div className='entry_header'>
      <h2>Asientos Contables</h2>
      <section className="entry_buttons">
        <label className="entry_selector__label" htmlFor="entry_selector">Selector de asiento contable
          <select className="entry_selector" name="entry_selector" id="entry_selector" >
            <option value="">Seleccione un asiento</option>
          </select>
        </label>
        <button className='btn' disabled={!examStarted} onClick={() => {
          if (selectedStatement) {
            addEntry(selectedStatement.id);
          } else {
            modalRef.current?.showModal();
          }
        }}><i className='fi fi-rr-plus'></i>Asiento</button>
      </section>

      <Modal
        ref={modalRef}
        modalTitle="Atención"
        showButton={false}
      >
        <p>Por favor, selecciona un enunciado antes de agregar un asiento.</p>
      </Modal>
    </div>
  )
}

export default EntryHeader
