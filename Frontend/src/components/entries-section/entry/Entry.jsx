import React, { useState } from 'react'
import "./Entry.css"
import EntryForm from './entry-form/EntryForm'

const Entry = ({ number }) => {

  const [entryStatus, setEntryStatus] = useState(false);



  const changeStatus = () => {
    setEntryStatus(!entryStatus)
  }

  const [annotationsItems, setAnnotationsItems] = useState([1]);

  const addAnnotationItem = () => {
    setAnnotationsItems([...annotationsItems, annotationsItems.length + 1])
  }


  return (
    <div className='entry_wrapper'>
      <div className="entry_head" onClick={changeStatus}>
        <div className="head_tittle">
          <p>Asiento {number}</p>
          <i className={entryStatus ? 'fi fi-rr-angle-small-up' : 'fi fi-rr-angle-small-down'}></i>
        </div>
        <div className="head_data">
          <p>Fecha: <span>00/00/0000</span></p>
          <p>Total: <span>000</span></p>
        </div>
      </div>
      {entryStatus ? <button className='btn entry_add_annotation' onClick={addAnnotationItem}><i className='fi fi-rr-plus'></i> Apunte</button> : null}

      {
        entryStatus && (
          <div className="entry_body">
            <div className="entry_body_tittle">
              <p>Apt</p>
              <p>Numero Cuenta</p>
              <p>Nombre Cuenta</p>
              <p>Debe</p>
              <p>Haber</p>
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
      {entryStatus ? <button className='btn'><i className='fi fi-rr-disk'></i> Guardar Apunte</button> : null}
    </div >
  )
}

export default Entry
