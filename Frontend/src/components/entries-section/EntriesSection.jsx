import React, { useEffect, useState } from 'react'
import EntryHeader from './entry-header/EntryHeader'
import Entry from './entry/Entry'
import "./EntriesSection.css"
import studentEntriesServices from '../../services/studentEntriesServices'
import userExercise from '../../services/userExerciseService'
import { useAuth } from '../../context/AuthContext'


const EntriesSection = () => {

  const [entries, setEntries] = useState([]);
  const [id, setId] = useState(0);
  const { user } = useAuth();

  const [entry, setEntry] = useState([1]);

  const addAnnotationItem = () => {
    setEntry([...entry, entry.length + 1])
  }
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
    <div className='entry_container' style={{ width: "100%", height: "100%" }}>
      <EntryHeader addAnnotationItem />
      <Entry />
      {/*       {
        entries.map((entry) => (
          <Entry key={entry.id} number={entry.entry_number} />
        ))
      } */}

    </div >
  )
}

export default EntriesSection
