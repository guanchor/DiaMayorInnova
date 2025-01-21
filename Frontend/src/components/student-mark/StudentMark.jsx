import { useEffect, useState } from 'react'
import "./StudentMark.css";
import userExerciseDataService from '../../services/userExerciseDataService';

const StudentMark = () => {

  const [marks, setMarks] = useState(null);

  useEffect(() => {
    userExerciseDataService.getAll()
      .then(({ data }) => {
        console.log(data)
        setMarks(data)
      })
  }, [])

  return (
    <section className={marks ? "mark__section " : "mark__section principalSection__img"}>
      <p className='mark__tittle'>Calificaciones</p>
      <div className="marks__wrapper">
        {
          marks && marks.map((mark, index) => (
            <div className="mark_container" key={index}>
              <p className='mark_mark'>{mark?.marks?.[0]?.mark || "No mark available"}</p>
              <div className="mark_text">
                <p className='mark-text_tittle'>Tarea de ejemplo 12345</p>
                <p className='mark_info'>Tarea realizada para la asignatura de Dor ... </p>
              </div>
            </div>
          ))
        }
      </div>

    </section>
  )
}

export default StudentMark
