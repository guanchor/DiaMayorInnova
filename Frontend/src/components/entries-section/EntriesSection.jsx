import React, { useEffect, useState } from 'react'
import EntryHeader from './entry-header/EntryHeader'
import Entry from './entry/Entry'
import "./EntriesSection.css"
import { useAuth } from '../../context/AuthContext'
import userExerciseDataService from '../../services/userExerciseDataService'

const EntriesSection = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [mark, setMark] = useState(null);
  const [annotations, setAnnotations] = useState([]);

  console.log("entrieeeees ", entries)

  useEffect(() => {
    userExerciseDataService.getAll(user.id)
      .then(({ data }) => {
        setMark(data.marks)
        addEntry()
      })

  }, [])

  const addEntry = () => {
    const defaultEntry = {
      entry_number: entries.length + 1,
      entry_date: "2024-10-10",
      mark_id: mark[0].id,
    }
    setEntries([...entries, defaultEntry])
  }

  console.log("entrieeeees ", entries)

  const removeEntry = (entryNumber) => {
    const updatedEntries = entries.filter(entry => entry.entry_number !== entryNumber);
    setEntries(updatedEntries);

    setAnnotations(annotations.filter(annotation => annotation.student_entry_id !== entryNumber));
  };


  const addAnnotation = (entryId) => {
    const initialAnnotation = {
      account_id: 1,
      number: annotations.length + 1,
      account_number: 0,
      debit: 0,
      credit: 0,
      student_entry_id: entryId,
    };

    setAnnotations([...annotations, initialAnnotation]);
  };


  const updateAnnotation = (index, updatedAnnotation) => {
    const newAnnotations = annotations.map((annotation, i) => i === index ? updatedAnnotation : annotation);
    setAnnotations(newAnnotations);
  };

  const deleteAnnotation = (index) => {
    setAnnotations(annotations.filter((_, i) => i !== index));
  };

  return (
    <div className='entry_container'>
      <EntryHeader addEntry={addEntry} />
      {
        entries && entries.map((entry, index) => {
          return (
            <Entry
              key={user.name + index}
              number={index + 1}
              date={entry.entry_date}
              markId={entry.mark_id}
              annotations={annotations.filter(annotation => annotation.student_entry_id === entry.entry_number)}
              updateAnnotation={updateAnnotation}
              deleteAnnotation={deleteAnnotation}
              addAnnotation={() => addAnnotation(entry.entry_number)}
              deleteEntry={() => removeEntry(entry.entry_number)}
            />
          )
        })
      }
    </div >
  )
}

export default EntriesSection
