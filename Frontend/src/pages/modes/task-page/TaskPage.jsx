import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import userExerciseDataService from "../../../services/userExerciseDataService";
import EntriesSection from '../../../components/entries-section/EntriesSection'
import AuxSectionTwo from '../../../components/aux-section-two/AuxSectionTwo'
import "./TaskPage.css"
import HelpSection from '../../../components/help-section/HelpSection'

const TaskPage = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [taskStarted, setTaskStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [submitTask, setSubmitTask] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [saveStatus, setSaveStatus] = useState("");

  const [openDate, setOpenDate] = useState(null);
  const [closeDate, setCloseDate] = useState(null);
  const [isTaskClosed, setIsTaskClosed] = useState(false);
  const [canStartTask, setCanStartTask] = useState(false);
  const [canEditTask, setCanEditTask] = useState(false);

  const handleSelectStatement = (statement) => {
    setSelectedStatement(statement);
  };

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await userExerciseDataService.getById(exerciseId);
        if (response) {
          setExercise(response.exercise);
          const opDate = new Date(response.exercise.task.opening_date);
          const clDate = new Date(response.exercise.task.closing_date);
          setOpenDate(opDate);
          setCloseDate(clDate);

          const now = new Date();
          const isClosed = now > clDate;
          const isAvailable = now >= opDate && now <= clDate;

          setIsTaskClosed(isClosed);
          setCanStartTask(isAvailable);
          setCanEditTask(isAvailable && !isClosed);

          if (response.exercise.started && isAvailable) {
            setTaskStarted(true);
          }
        }
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    };

    if (exerciseId) fetchExercise();
  }, [exerciseId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      if (openDate && closeDate) {
        setIsTaskClosed(now > closeDate);
        setCanStartTask(now >= openDate && now <= closeDate);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [openDate, closeDate]);

  const startTask = async () => {
    try {
      const response = await userExerciseDataService.start(exerciseId);
      if (response?.status === 200) {
        setTaskStarted(true);
        setCanEditTask(true);
      }
    } catch (err) {
      console.error("Error al iniciar la tarea:", err);
    }
  };

  if (!exercise) return <p>Cargando...</p>;

  let availabilityMessage = '';
  if (!canStartTask) {
    availabilityMessage = currentTime < openDate
      ? `La tarea estará disponible el ${openDate.toLocaleString()}`
      : `La tarea cerró el ${closeDate.toLocaleString()}`;
  }

  const handleSaveProgress = async (statementId, data) => {
    try {
      const response = await userExerciseDataService.update(exercise.id, {
        exercise: {
          marks_attributes: [
            {
              statement_id: statementId,
              student_entries_attributes: data.entries.map(entry => ({
                entry_number: entry.entry_number,
                entry_date: entry.entry_date,
                student_annotations_attributes: data.annotations
                  .filter(a => a.student_entry_id === entry.entry_number)
                  .map(a => ({
                    account_number: a.account_number,
                    debit: a.debit,
                    credit: a.credit
                  }))
              }))
            }
          ]
        }
      });
      
      setSaveStatus("Progreso guardado exitosamente");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus("Error al guardar el progreso");
    }
  };

  return (
    <div className='modes_page_container task-color'>
      {saveStatus && <div className="save-status">{saveStatus}</div>}
      {!taskStarted ? (
        <div className='modes_page_container--button'>
          <button className="btn" onClick={startTask} disabled={!canStartTask}>
            Comenzar tarea
          </button>
          {!canStartTask && (
            <p className='exam-available'><strong>{availabilityMessage}</strong></p>
          )}
        </div>
      ) : (
        <>
          <div className="task-page_header">
            <h1 className='head-task_tittle'>Modo Tarea - {exercise?.task?.title}</h1>
          </div>
          {exercise && (
            <EntriesSection
              taskSubmit={submitTask}
              taskId={exercise.task.id}
              existingExerciseId={exercise.id}
              examStarted={canEditTask}
              selectedStatement={selectedStatement}
              onStatementComplete={handleSaveProgress}
            />
          )}
          <AuxSectionTwo
            statements={exercise?.task.statements}
            isTaskActive={canEditTask}
            onSelectStatement={handleSelectStatement}
            examStarted={undefined}
          />
        </>
      )}
      <HelpSection />
    </div>
  )
}

export default TaskPage
