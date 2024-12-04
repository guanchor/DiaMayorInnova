import React from 'react'
import EntriesSection from '../../components/entries-section/EntriesSection'
import "./TaskPage.css"

const TaskPage = () => {
  return (
    <div className='task_page_container'>
      <p className='head_task'>Task Page</p>
      <EntriesSection />
    </div>
  )
}

export default TaskPage
