import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import EntriesSection from '../../../components/entries-section/EntriesSection';
import AuxSectionTwo from '../../../components/aux-section-two/AuxSectionTwo';
import "./ExamPage.css";
import HelpSection from '../../../components/help-section/HelpSection';
import userExerciseDataService from "../../../services/userExerciseDataService";

const ExamPage = () => {

  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [statements, setStatements] = useState([]);
  const [examStarted, setExamStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [completedStatements, setCompletedStatements] = useState({});

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await userExerciseDataService.getById(exerciseId);
        console.log("Response data:", response);

        if (!response || !response.data) {
          throw new Error("Respuesta vacía o malformada");
        }

        const { exercise, statements } = response.data;

        if (exercise) {
          setExercise(exercise);
          setStatements(statements || []);

          if (exercise.task?.is_exam && exercise.time_remaining > 0) {
            setExamStarted(true);
            setTimeRemaining(exercise.time_remaining);
          }
        }
      } catch (err) {
        console.error("Error fetching exercise:", err);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (examStarted) {
        const message = "Estás en medio de un examen. Si sales, perderás tu progreso.";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    if (examStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTimeRemaining = prevTime - 1;
          if (newTimeRemaining <= 0) {
            clearInterval(timer);
            setExamStarted(false);
            alert("Se ha agotado el tiempo. El examen ha terminado.");
            navigate("/home");
            return 0;
          }
          console.log("Tiempo restante: ", newTimeRemaining);
          return newTimeRemaining;
        });
      }, 1000);

      return () => clearInterval(timer);
    }

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [examStarted, timeRemaining, navigate]);

  const startExam = async () => {
    setExamStarted(true);
    try {
      const response = await userExerciseDataService.start(exerciseId);
      if (response && response.status === 200) {
        console.log("Examen iniciado con éxito");
      } else {
        console.error("Error al iniciar el examen: ", response);
      }
    } catch (err) {
      console.error("Error al iniciar el examen:", err);
    }
  };

  const handleStatementComplete = (statementId, statementData) => {
    console.log("Statement completado:", statementId, statementData);

    setCompletedStatements((prevData) => ({
      ...prevData,
      [statementId]: statementData,
    }));

    const currentIndex = statements.findIndex((stmt) => stmt.id === statementId);
    if (currentIndex < statements.length - 1) {
      setSelectedStatement(statements[currentIndex + 1]);
    }
  };

  if (!exercise) return <p>Cargando...</p>;

  return (
    <div className='modes_page_container exam-color'>
      <p className='head_task'>Modo Examen - {exercise.task.title}</p>
      {!examStarted && (
        <button onClick={startExam}>Comenzar examen</button>
      )}
      {examStarted && (
        <div className="timer">
          <p>Tiempo restante: {formatTime(timeRemaining)}</p>
        </div>
      )}
      <EntriesSection
        selectedStatement={selectedStatement}
        taskId={exercise.task.id}
        existingExerciseId={exercise.id}
        onStatementComplete={handleStatementComplete}
        completedStatements={completedStatements}
        exercise={exercise}
      />
      <HelpSection />
      <AuxSectionTwo statements={statements} examStarted={examStarted} onSelectStatement={setSelectedStatement} />
    </div>
  )
}

export default ExamPage;
