import React, { useEffect, useState } from 'react'
import EntryHeader from './entry-header/EntryHeader'
import Entry from './entry/Entry'
import "./EntriesSection.css"
import studentEntriesServices from '../../services/studentEntriesServices'

const EntriesSection = () => {

  const [entries, setEntries] = useState([]); // Inicializar como un array vacío

  useEffect(() => {
    studentEntriesServices.getAll()
      .then(response => {
        setEntries(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    <div className='entry_container'>
      <EntryHeader />
      {
        entries.map((entry) => (
          <Entry key={entry.id} number={entry.entry_number} />
        ))}

    </div>
  )
}

export default EntriesSection
