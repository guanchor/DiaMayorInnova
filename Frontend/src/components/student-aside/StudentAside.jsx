import { useState } from 'react'
import "./StudentAside.css";

const StudentAside = () => {

  const [nextTask, setNextTask] = useState(false);

  return (
    <section className={nextTask ? "student__aside " : "student__aside asidelSection__img"}>
      <p className='aside__tittle'>Próximas Entregas</p>
    </section>
  )
}

export default StudentAside
