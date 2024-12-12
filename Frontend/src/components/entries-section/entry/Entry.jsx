import React, { useState } from 'react'
import "./Entry.css"
import EntryForm from './entry-form/EntryForm'

const Entry = ({ number, date = "2024-10-10", annotations, updateAnnotation, deleteAnnotation, addAnnotation, deleteEntry }) => {
  const [entryStatus, setEntryStatus] = useState(false);
  const [entrydate, setDate] = useState(date);
  const formattedDate = new Date(`${entrydate}T00:00:00`).toLocaleDateString("es-ES");

  const changeStatus = () => {
    setEntryStatus(!entryStatus)
  }

  const handleChangeDate = (e) => {
    setDate(e.target.value)
  }

  const handleDelete = (e) => {
    e.preventDefault();
    deleteEntry;
  }

  return (
    <div className='entry_wrapper'>
      <header className="entry_head" >
        <div className="head_tittle" onClick={changeStatus} >
          <p>Asiento {number}</p>
          <i className={entryStatus ? 'fi fi-rr-angle-small-up' : 'fi fi-rr-angle-small-down'}></i>
        </div>
        <div className="head_data">
          {entryStatus ?
            <input type='date' className='date_input' value={entrydate} onChange={handleChangeDate}></input>
            : <p>Fecha: <span>{formattedDate}</span></p>
          }
          <p>Total: <span>0000</span></p>
        </div>
        <button className='btn-trash' onClick={deleteEntry}><i className='fi fi-rr-trash'></i></button>
      </header>
      {
        entryStatus && (
          <div className="entry_body">
            <div className="entry_body_tittle">
              <div className="header_container">
                <p className='apt_number'>Apt</p>
                <div className="tittles_wrapper">
                  <p className='tittle_account-number'>Nº Cuenta</p>
                  <p className='tittle_account-name'>Nombre Cuenta</p>
                  <p className='tittle_debit'>Debe</p>
                  <p className='tittle_credit'>Haber</p>
                </div>
              </div>

            </div>

            <div className="entry_item_container">
              {annotations && annotations.map((annotation, index) => (
                <EntryForm
                  key={number + "annotation" + index}
                  aptNumber={index + 1}
                  annotation={annotation}
                  onDelete={() => deleteAnnotation(index)}
                  updateAnnotation={(updatedAnnotation) => updateAnnotation(index, updatedAnnotation)}
                />
              ))
              }
            </div>
            {entryStatus ? <button className='btn entry_add_annotation' onClick={addAnnotation}><i className='fi fi-rr-plus'></i> Apunte</button> : null}
          </div>
        )
      }
    </div >
  )
}

export default Entry
