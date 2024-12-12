import React from 'react'
import "./EntryHeader.css"

const EntryHeader = ({ addEntry }) => {
  return (
    <div className='entry_header'>
      <p>Asientos Contables</p>
      <div className="entry_buttons">
        <select name="entry_selector" id="entry_selector" aria-placeholder='selector'>
          <option value="">Asiento 1</option>
        </select>
        <button className='btn' onClick={addEntry}><i className='fi fi-rr-plus'></i>Asiento</button>
      </div>
    </div>
  )
}

export default EntryHeader
