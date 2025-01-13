import React, { useState } from 'react'
import EntriesSection from '../../../components/entries-section/EntriesSection'
import AuxSectionOne from '../../../components/aux-section-one/AuxSectionOne'
import AuxSectionTwo from '../../../components/aux-section-two/AuxSectionTwo'
import "./TaskPage.css"

const TaskPage = () => {
  const [submitTask, setSubmitTask] = useState(false);

  return (
    <main className='modes_page_container task-color'>
      <div className="task-page_header">
        <h1 className='head-task_tittle'>Modo Tarea</h1>
        <button className='btn head_button' onClick={() => setSubmitTask(true)}>Entregar Tarea</button>
      </div>
      <EntriesSection taskSubmit={submitTask} />
      <AuxSectionOne />
      <AuxSectionTwo />
    </main>
  )
}

export default TaskPage
