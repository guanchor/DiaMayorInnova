import React, { useState } from 'react'
import EntriesSection from '../../../components/entries-section/EntriesSection'
import { AuxSection } from '../../../components/aux-section/AuxSection'
import "./TaskPage.css"

const TaskPage = () => {
  const [submitTask, setSubmitTask] = useState(false);
  const [exercise, setExercise] = useState({
    marks: [],
    task: {}
  });
  const [canEditTask, setCanEditTask] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState(null);

  const handleSelectStatement = (statement) => {
    setSelectedStatement(statement);
  };

  return (
    <main className='modes_page_container task-color'>
      <div className="task-page_header">
        <h1 className='head-task_tittle'>Modo Tarea</h1>
        <button className='btn head_button' onClick={() => setSubmitTask(true)}>Entregar Tarea</button>
      </div>
      <EntriesSection taskSubmit={submitTask} />
      <AuxSection
        statements={exercise?.task.statements}
        isTaskActive={canEditTask}
        onSelectStatement={handleSelectStatement}
        examStarted={undefined}
      />
    </main>
  )
}

export default TaskPage
