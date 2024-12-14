import React, { useEffect, useState } from 'react'
import EntryHeader from './entry-header/EntryHeader'
import Entry from './entry/Entry'
import "./EntriesSection.css"
import userExerciseDataService from '../../services/userExerciseDataService'
import { Navigate, useNavigate } from 'react-router-dom'

const EntriesSection = ({ taskSubmit }) => {
  const [entries, setEntries] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const mark = 0;
  const navigate = useNavigate();

  const addEntry = () => {
    const defaultEntry = {
      entry_number: entries.length + 1,
      entry_date: "2024-10-10",
    }
    setEntries([...entries, defaultEntry])
  }

  const removeEntry = (entryNumber) => {
    const updatedEntries = entries.filter(entry => entry.entry_number !== entryNumber);
    setEntries(updatedEntries);
    setAnnotations(annotations.filter(annotation => annotation.student_entry_id !== entryNumber));
  };


  const addAnnotation = (entryId) => {

    const entryAnnotations = annotations.filter(annotation => annotation.student_entry_id === entryId);
    const nextAnnotationNumber = entryAnnotations.length + 1;

    const initialAnnotation = {
      student_entry_id: entryId,
      account_id: 1,
      number: nextAnnotationNumber,
      account_number: 0,
      debit: 0,
      credit: 0,
    };

    setAnnotations(prevAnnotations => [...prevAnnotations, initialAnnotation]);
  };


  const updateAnnotation = (index, updatedAnnotation) => {
    const newAnnotations = annotations.map((annotation, i) => i === index ? updatedAnnotation : annotation);
    setAnnotations(newAnnotations);
  };

  const deleteAnnotation = (index) => {
    setAnnotations(annotations.filter((_, i) => i !== index));
  };

  const prepareExerciseData = () => {
    return {
      exercise: {
        task_id: 2, // Cambia esto por el valor correspondiente
        marks_attributes: entries.map(entry => ({
          mark: mark ? mark : 5,
          student_entries_attributes: entries.map(entry => ({
            entry_number: entry.entry_number,
            entry_date: entry.entry_date,
            student_annotations_attributes: annotations
              .filter(annotation => annotation.student_entry_id === entry.entry_number)
              .map(annotation => ({
                account_id: annotation.account_id,
                number: annotation.number,
                account_number: annotation.account_number,
                credit: annotation.credit,
                debit: annotation.debit,
              }))
          }))
        }))
      }
    };
  };

  useEffect(() => {
    if (taskSubmit) {
      const exerciseData = prepareExerciseData();
      userExerciseDataService.create(exerciseData)
        .then((response) => {
          console.log("guardadoooooooooooo", response)
          navigate("/home")
        })
    }
  }, [taskSubmit])

  return (
    <div className='entry_container'>
      <EntryHeader addEntry={addEntry} />
      {
        entries.map((entry, index) => {
          return (
            <Entry
              key={entry.entry_number}
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
