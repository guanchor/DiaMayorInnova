import React from 'react'
import EntriesSection from '../../components/entries-section/EntriesSection'
import AuxSectionOne from '../../components/aux-section-one/AuxSectionOne'
import AuxSectionTwo from '../../components/aux-section-two/AuxSectionTwo'
import "./TaskPage.css"

const TaskPage = () => {
  return (
    <div className='modes_page_container task-color'>
      <p className='head_task'>Modo Tarea</p>
      <EntriesSection />
      <AuxSectionOne />
      <AuxSectionTwo />
    </div>
  )
}

export default TaskPage
