import { useEffect, useState } from 'react'
import "./StudentMark.css";
import userExerciseDataService from '../../services/userExerciseDataService';

const StudentMark = () => {

  const [marks, setMarks] = useState(null);
  const [includeMark, setIncludeMark] = useState(false)

  useEffect(() => {
    userExerciseDataService.getAll()
      .then(({ data }) => {
        console.log(data)
        setMarks(data)
      })
  }, [])

  const onHandldeMarks = () => {
    return false
  }

  return (
    <section className={includeMark ? "mark__section " : "mark__section principalSection__img"}>
      <h2 className='mark__tittle'>Calificaciones</h2>
      <div className="marks__wrapper">
        {
          includeMark && marks.map((mark, index) => (
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
