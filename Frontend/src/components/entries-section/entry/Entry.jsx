import React, { useState } from 'react'
import "./Entry.css"
import EntryForm from './entry-form/EntryForm'
import marksServices from '../../../services/marksServices';
import studentEntriesServices from '../../../services/studentEntriesServices';
import { useEntries } from '../../../context/entries-page/EntriesContext';

const Entry = ({ number }) => {
  const { annotationsItems, addAnnotationItem } = useEntries();

  const [entryStatus, setEntryStatus] = useState(false);
  const [date, setDate] = useState("2000-10-16");
  const [total, setTotal] = useState(0);

  const defaultEntry = {
    entry_number: number,
    entry_date: date,
    mark_id: 0,
  }

  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString("es-ES");

  const [entry, setEntry] = useState(defaultEntry)

  const mark = {
    mark: 5
  };

  const changeStatus = () => {
    setEntryStatus(!entryStatus)
  }

  const saveEntry = (e) => {
    /*     e.preventDefault();
        console.log("create entry")
        marksServices.create(mark)
          .then(({ data }) => {
            setEntry({ ...defaultEntry, mark_id: data.id })
          })
        studentEntriesServices.create(entry)
          .then((response) => {
            console.log(response)
          }) */
  }

  const handleChangeDate = (e) => {
    setDate(e.target.value)
  }


  return (
    <div className='entry_wrapper'>
      <div className="entry_head" >
        <div className="head_tittle" onClick={changeStatus} >
          <p>Asiento {number}</p>
          <i className={entryStatus ? 'fi fi-rr-angle-small-up' : 'fi fi-rr-angle-small-down'}></i>
        </div>
        <div className="head_data">
          {entryStatus ? <input type='date' className='date_input' value={date} onChange={handleChangeDate}></input> : <p>Fecha: <span>{formattedDate}</span></p>}
          <p>Total: <span>{total}</span></p>
        </div>
      </div>
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
              {entryStatus ? <button className='btn entry_add_annotation' onClick={addAnnotationItem}><i className='fi fi-rr-plus'></i> Apunte</button> : null}
            </div>

            <div className="entry_item_container">
              {annotationsItems.map((index) => (
                <EntryForm key={index} aptNumber={index} setTotal={setTotal} total={total} />
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
