import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import exerciseService from "../../services/userExerciseDataService";
import "./StudentAside.css";

const StudentAside = () => {

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = (exerciseId) => {
    const selectedExercise = exercises.find((ex) => ex.id === exerciseId);
    if (selectedExercise && selectedExercise.started) {
      alert("Este examen ya se ha iniciado y no se puede acceder nuevamente.");
      return;
    }
    navigate(`/modes/examen/${exerciseId}`);
  };

  useEffect(() => {
    if (!user?.id) return;

    const fetchExercises = async () => {
      try {
        const response = await exerciseService.getAll();
        if (response?.data) {
          console.log("Ejercicios obtenidos:", response.data);
          setExercises(response.data);
        } else {
          console.log("No hay datos de ejercicios");
          setExercises([]);
        }
      } catch (error) {
        console.error("Error obteniendo los ejercicios:", error);
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [user?.id]);

  return (
    <section className={exercises.length > 0 ? "student__aside " : "student__aside asidelSection__img"}>
      <p className='aside__tittle'>Próximas Entregas</p>
      {loading ? (
        <p>Cargando...</p>
      ) : exercises.length > 0 ? (
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise.id} onClick={() => handleClick(exercise.id)} style={{ cursor: "pointer" }}>
              <p><strong>Tarea:</strong> {exercise.task.title || "Sin título"}</p>
              <p><strong>Apertura:</strong> {new Date(exercise.task.opening_date).toLocaleString()}</p>
              <p><strong>Cierre:</strong> {new Date(exercise.task.closing_date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes tareas asignadas.</p>
      )}
    </section>
  )
}

export default StudentAside
