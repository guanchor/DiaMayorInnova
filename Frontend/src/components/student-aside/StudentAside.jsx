import React, { useState } from 'react'
import "./StudentAside.css";

const StudentAside = () => {

  const [nextTask, setNextTask] = useState(false);

  const changeBackground = () => {
    setNextTask(!nextTask);
  }

  return (
    <section className={nextTask ? "student__aside " : "student__aside asidelSection__img"}>
      <p className='aside__tittle'>Próximas Entregas</p>
      <button className='btn' onClick={changeBackground}>cambiar fondo</button>
    </section>
  )
}

export default StudentAside
