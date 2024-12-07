import React, { useState } from 'react'
import "./Entry.css"
import EntryForm from './entry-form/EntryForm'
import marksServices from '../../../services/marksServices';
import studentEntriesServices from '../../../services/studentEntriesServices';

const Entry = ({ number }) => {

  const [entryStatus, setEntryStatus] = useState(false);
  const date = '2000-10-16' // year, month , day

  const defaultEntry = {
    entry_number: number,
    entry_date: date,
    mark_id: 0,
  }

  const [entry, setEntry] = useState(defaultEntry)

  const mark = {
    mark: 5
  };

  const changeStatus = () => {
    setEntryStatus(!entryStatus)
  }

  const [annotationsItems, setAnnotationsItems] = useState([1]);

  const addAnnotationItem = () => {
    setAnnotationsItems([...annotationsItems, annotationsItems.length + 1])
  }

  const saveEntry = (e) => {
    e.preventDefault();
    console.log("create entry")
    marksServices.create(mark)
      .then(({ data }) => {
        setEntry({ ...defaultEntry, mark_id: data.id })
      })
    studentEntriesServices.create(entry)
      .then((response) => {
        console.log(response)
      })
  }


  return (
    <div className='entry_wrapper'>
      <div className="entry_head" onClick={changeStatus}>
        <div className="head_tittle">
          <p>Asiento {number}</p>
          <i className={entryStatus ? 'fi fi-rr-angle-small-up' : 'fi fi-rr-angle-small-down'}></i>
        </div>
        <div className="head_data">
          <p>Fecha: <span>{date}</span></p>
          <p>Total: <span>000</span></p>
        </div>
      </div>
      {
        entryStatus && (
          <div className="entry_body">
            <div className="entry_body_tittle">
              <div className="tittles_container">
                <p className='tittle_apt'>Apt</p>
                <p className='tittle_account-number'>Nº Cuenta</p>
                <p className='tittle_account-name'>Nombre Cuenta</p>
                <p className='tittle_debit'>Debe</p>
                <p className='tittle_credit'>Haber</p>
              </div>
              {entryStatus ? <button className='btn entry_add_annotation' onClick={addAnnotationItem}><i className='fi fi-rr-plus'></i> Apunte</button> : null}
            </div>

            <div className="entry_item_container">
              {annotationsItems.map((index) => (
                <EntryForm key={index} aptNumber={index} />
              ))
              }
            </div>
          </div>
        )
      }
      {entryStatus ? <button className='btn' onClick={saveEntry}><i className='fi fi-rr-disk' ></i> Guardar Asiento</button> : null}
    </div >
  )
}

export default Entry
