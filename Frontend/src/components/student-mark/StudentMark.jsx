import React, { useState } from 'react'
import "./StudentMark.css";

const StudentMark = () => {

  const [marks, setMarks] = useState(false);

  const changeBackground = () => {
    setMarks(!marks)
  }

  return (
    <section className={marks ? "mark__section " : "mark__section principalSection__img"}>
      <p className='mark__tittle'>Califiaciones</p>
      <div className="marks__wrapper">
        <button className='btn' onClick={changeBackground}>cambiar fondo</button>
      </div>

    </section>
  )
}

export default StudentMark
