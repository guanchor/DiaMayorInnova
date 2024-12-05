import React, { useEffect, useState } from 'react'
import "./AuxSectionOne.css"
import StudentEntriesServices from '../../services/studentEntriesServices'



const AuxSectionOne = () => {

  const [entries, setEntries] = useState([])


  useEffect(() => {
    StudentEntriesServices.getAll()
      .then(response => {
        setEntries(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])


  return (
    <div className='aux-section_one__container'>
      <p>Lista entries</p>
      {
        entries.map((entry) => (
          <div key={entry.id} className='aux-section_one__entry'>
            <p>Id_Entry: {entry.id}</p>
            <p>Numero Asiento: {entry.entry_number}</p>
            <p>Nota id: {entry.mark_id}</p>
          </div>
        ))
      }
    </div>
  )
}

export default AuxSectionOne
