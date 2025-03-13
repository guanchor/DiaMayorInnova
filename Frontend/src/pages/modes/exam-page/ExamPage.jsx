import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import EntriesSection from '../../../components/entries-section/EntriesSection';
import AuxSectionTwo from '../../../components/aux-section-two/AuxSectionTwo';
import HelpSection from '../../../components/help-section/HelpSection';
import userExerciseDataService from "../../../services/userExerciseDataService";
import Modal from "../../../components/modal/Modal"
import "./ExamPage.css";

const ExamPage = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [statements, setStatements] = useState([]);
  const [examStarted, setExamStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [completedStatements, setCompletedStatements] = useState({});
  const modalNotAvailableRef = useRef(null);
  const modalTimeExpiredRef = useRef(null);
  const modalFinishedRef = useRef(null);
  const navigate = useNavigate();

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await userExerciseDataService.getById(exerciseId);
        // console.log("Response data:", response); // Depuración

        if (!response || !response.exercise) {
          throw new Error("Respuesta vacía o malformada");
        }

        // const { exercise, statements, time_remaining } = response.data;
        // console.log("Opening date:", exercise.task.opening_date); // Depuración
        // console.log("Closing date:", exercise.task.closing_date); // Depuración
        // console.log("Tiempo restante recibido:", time_remaining); // Depuración
        // console.log("Hora actual:", new Date()); // Depuración
        // if (exercise) {
        // setExercise(exercise);
        // setStatements(statements || []);
        setExercise(response.exercise);
        setStatements(response.exercise.task.statements || []);

        if (response.exercise.task.is_exam && response.exercise.started) {
          setExamStarted(true);
          setTimeRemaining(response.time_remaining);
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
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [examStarted]);

  const finishExam = async () => {
    try {
      const response = await userExerciseDataService.finish(exerciseId);
      if (response && response.status === 200) {
        console.log("Examen finalizado correctamente");
      } else {
        console.error("Error al finalizar el examen", response);
      }
    } catch (err) {
      console.error("Error al finalizar el examen", err);
    }
  };

  useEffect(() => {
    if (examStarted) {
      const handleVisibilityChange = async () => {
        if (document.visibilityState === "hidden") {
          const confirmation = window.confirm(
            "Si sales de la pestaña, perderás tu progreso y no hay vuelta atrás. ¿Desea continuar?"
          );
          if (confirmation) {
            await finishExam();
            modalFinishedRef.current?.showModal();
            navigate("/home");
          }
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }, [examStarted, navigate, exerciseId]);

  useEffect(() => {
    if (examStarted) {
      const timer = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examStarted]);

  useEffect(() => {
    if (timeRemaining === 0 && examStarted) {
      modalTimeExpiredRef.current?.showModal();
      navigate("/home");
    }
  }, [timeRemaining, examStarted, navigate]);

  const startExam = async () => {
    if (!exercise?.task) return;
    const now = new Date();
    const openingDate = new Date(exercise.task.opening_date);
    if (now < openingDate) {
      modalNotAvailableRef.current?.showModal();
      return;
    }

    try {
      const response = await userExerciseDataService.start(exerciseId);
      if (response && response.status === 200) {
        console.log("Examen iniciado con éxito");
        
        const closingDate = new Date(exercise.task.closing_date);
        const now = new Date();
        const remaining = Math.floor((closingDate - now) / 1000);
        
        setExamStarted(true);
        setTimeRemaining(remaining);
        setExercise({ ...exercise, started: true });
      } else {
        console.error("Error al iniciar el examen: ", response);
      }
    } catch (err) {
      console.error("Error al iniciar el examen:", err);
    }
  };

  const handleStatementComplete = (statementId, statementData) => {
    // console.log("Statement completado:", statementId, statementData); // Depuración

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
  const now = new Date();
  const openingDate = new Date(exercise.task.opening_date);
  const examAvailable = now >= openingDate;

  return (
    <div className='modes_page_container exam-color'>
      <p className='head_task'>Modo Examen - {exercise.task.title}</p>
      {!examStarted && (
        <div className='modes_page_container--button'>
          <button className="btn" onClick={startExam} disabled={!examAvailable}>
            Comenzar examen
          </button>
          {!examAvailable && (
            <p className='exam-available'><strong>El examen estará disponible a: {new Date(exercise.task.opening_date).toLocaleString()}</strong></p>
          )}
        </div>
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
        examStarted={examStarted}
      />
      <HelpSection />
      <AuxSectionTwo
        statements={exercise.task.statements}
        examStarted={examStarted}
        onSelectStatement={setSelectedStatement}
      />

      <Modal
        ref={modalNotAvailableRef}
        modalTitle="Examen terminado"
        showButton={false}
      >
        <p>Examen terminado.</p>
        <button className="btn light" onClick={() => modalNotAvailableRef.current?.close()}>
          Cerrar
        </button>
      </Modal>

      <Modal
        ref={modalNotAvailableRef}
        modalTitle="Examen no disponible"
        showButton={false}
      >
        <p>El examen aún no está disponible.</p>
        <button className="btn light" onClick={() => modalNotAvailableRef.current?.close()}>
          Cerrar
        </button>
      </Modal>

      <Modal
        ref={modalTimeExpiredRef}
        modalTitle="Tiempo Expirado"
        showButton={false}
      >
        <p>Se ha agotado el tiempo. El examen ha terminado.</p>
        <button
          className="btn light"
          onClick={() => {
            modalTimeExpiredRef.current?.close();
            navigate("/home");
          }}
        >
          Cerrar
        </button>
      </Modal>
    </div>
  )
}

export default ExamPage;
