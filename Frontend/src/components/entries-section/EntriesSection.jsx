import React, { useEffect, useState } from 'react'
import EntryHeader from './entry-header/EntryHeader'
import Entry from './entry/Entry'
import "./EntriesSection.css"
import { useAuth } from '../../context/AuthContext'
import { useEntries } from '../../context/entries-page/EntriesContext'


const EntriesSection = () => {
  const { entries } = useEntries();
  const [id, setId] = useState(0);
  const { user } = useAuth();

  /* 
  useEffect(() => {

    userExercise.getAll(user.id)
      .then((response) => {
        console.log(response)
      })
    console.log("hola", user.id)

        studentEntriesServices.getAll()
          .then(response => {
            setEntries(response.data)
          })
          .catch(e => {
            console.log(e)
          }) 
  }, [])
*/

  return (
    <div className='entry_container'>
      <EntryHeader />
      {
        entries.map((entry) => (
          <Entry key={user.name + entry} number={entry} />
        ))
      }
    </div >
  )
}

export default EntriesSection
