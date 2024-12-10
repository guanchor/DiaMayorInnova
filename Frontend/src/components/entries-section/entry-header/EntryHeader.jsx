import React from 'react'
import "./EntryHeader.css"
import { useEntries } from '../../../context/entries-page/EntriesContext';

const EntryHeader = () => {
  const { addEntryItem } = useEntries();
  return (
    <div className='entry_header'>
      <p>Asientos Contables</p>
      <div className="entry_buttons">
        <select name="entry_selector" id="entry_selector" aria-placeholder='selector'>
          <option value="">Asiento 1</option>
        </select>
        <button className='btn' onClick={addEntryItem}><i className='fi fi-rr-plus'></i>Asiento</button>
      </div>
    </div>
  )
}

export default EntryHeader
