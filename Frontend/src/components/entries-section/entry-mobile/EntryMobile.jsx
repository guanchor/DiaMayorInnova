import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./EntryMobile.css"
import MobileEntry from './MobileEntry';

const EntryMobile = () => {
  const navigate = useNavigate();

  const [entries, setEntries] = useState([]);

  const addEntry = () => {
    setEntries([...entries, entries.length + 1]);
  }


  return (

    <main className='entry-mobile_page'>
      <header className='entry-mobile_header'>
        <button className='btn' onClick={() => navigate(-1)}><i className='fi fi-rr-arrow-left'></i> Atras</button>
        <h1>Diario</h1>
      </header>

      <section className='entry-mobile_options'>
        <select name="entry_select" id="entry_select">
          <option value="1">ir a</option>
        </select>
        <div className="entry-buttons_container">
          <button> <i className='fi fi-rr-book-alt'></i></button>
          <button> <i className='fi fi-rr-chart-histogram'></i></button>
          <button> <i className='fi fi-rr-bulb'></i></button>
        </div>
      </section>

      <section className='mobile-entries_container'>
        {
          entries && entries.map((index) => (
            <MobileEntry number={index} />
          ))
        }
      </section>

      <section className='entry-btn_container'>
        <button className='mobile-entry_btn'><i className='fi fi-rr-exchange'></i></button>
        <button className='mobile-entry_btn' onClick={addEntry}><i className='fi fi-rr-plus'></i></button>
      </section>
    </main>
  )
}

export default EntryMobile
