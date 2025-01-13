import useEntry from '../../hooks/useEntry'
import useAnnotation from '../../hooks/useAnnotation'
import taskSubmitService from '../../services/taskSubmitService'
import EntryHeader from './entry-header/EntryHeader'
import Entry from './entry/Entry'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import "./EntriesSection.css"

const EntriesSection = ({ taskSubmit }) => {
  const { addEntry, removeEntry, entries } = useEntry();
  const { addAnnotation, deleteAnnotation, updateAnnotation, annotations } = useAnnotation();
  const navigate = useNavigate();

  useEffect(() => {
    if (taskSubmit) {
      taskSubmitService({ entries, annotations }, navigate)
    }
  }, [taskSubmit])

  return (
    <div className='entry_container'>
      <EntryHeader addEntry={addEntry} />
      <section className='modes-entries-containner scroll-style'>
        {
          entries.map((entry, index) => {
            return (
              <Entry
                key={entry.entry_number}
                entryIndex={entry.entry_number}
                number={index + 1}
                date={entry.entry_date}
                markId={entry.mark_id}
                annotations={annotations.filter(annotation => annotation.student_entry_id === entry.entry_number)}
                updateAnnotation={updateAnnotation}
                deleteAnnotation={deleteAnnotation}
                addAnnotation={addAnnotation}
                deleteEntry={removeEntry}
              />
            )
          })
        }
      </section>
    </div >
  )
}

export default EntriesSection
