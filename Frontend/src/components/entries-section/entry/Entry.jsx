import React, { useState } from 'react'
import "./Entry.css"

const Entry = () => {

  const entryNumber = 1;

  const [entryStatus, setEntryStatus] = useState(false);

  const changeStatus = () => {
    setEntryStatus(!entryStatus)
  }

  return (
    <div className='entry_wrapper'>
      <div className="entry_head" onClick={changeStatus}>
        <div className="head_tittle">
          <p>Asiento {entryNumber}</p>
          <i className='fi fi-rr-angle-small-up'></i>
        </div>
        <div className="head_data">
          <p>Fecha: <span>00/00/0000</span></p>
          <p>Total: <span>000</span></p>
        </div>
      </div>

      {
        entryStatus && (
          <div className="entry_body">
            <div className="entry_body_tittle">
              <p>Apt</p>
              <p>Nombre Cuenta</p>
              <p>Debe</p>
              <p>Haber</p>
            </div>
            <div className="entry_item_container">
            </div>
          </div>
        )
      }
      {entryStatus ? <button className='btn'><i className='fi fi-rr-plus'></i> Apunte</button> : null}
    </div>
  )
}

export default Entry
