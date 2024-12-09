import React, { useEffect, useState } from 'react'
import EntryHeader from './entry-header/EntryHeader'
import Entry from './entry/Entry'
import "./EntriesSection.css"
import studentEntriesServices from '../../services/studentEntriesServices'
import userExercise from '../../services/userExerciseService'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const EntriesSection = () => {

  const [entries, setEntries] = useState([]); // Inicializar como un array vacío
  const [id, setId] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Retrocede una página en el historial
  };

  useEffect(() => {

    userExercise.getAll(user.id)
      .then((response) => {
        console.log(response)
      })
    console.log("hola", user.id)

    /*     studentEntriesServices.getAll()
          .then(response => {
            setEntries(response.data)
          })
          .catch(e => {
            console.log(e)
          }) */
  }, [])

  return (
    <div className='entry_container' style={{ width: "100%", height: "100%" }}>
      <button onClick={(handleGoBack)}>
        Volver atrás
      </button>
      <EntryHeader />
      {
        entries.map((entry) => (
          <Entry key={entry.id} number={entry.entry_number} />
        ))
      }

    </div >
  )
}

export default EntriesSection
