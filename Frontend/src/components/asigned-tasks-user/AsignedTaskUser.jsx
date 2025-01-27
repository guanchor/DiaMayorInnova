import userExerciseDataService from '../../services/userExerciseDataService';
import Modal from '../modal/Modal';
import http from '../../http-common';
import { useEffect, useState } from 'react';
import "./AsignedTaskUser.css";

const AsignedTaskUser = ({ id = "" }) => {
  const [users, setUsers] = useState([]);
  const [userAsigned, setUserAsigned] = useState([]);


  const getAllUsers = () => http.get('/registrations'); //Esto debe estar en un servicio, pero para probar esta aqui

  const checkboxActive = ({ target }, userId) => {
    const { checked } = target;
    if (checked) {
      setUserAsigned(prevState => [...prevState, userId]);
    } else {
      setUserAsigned(prevState => prevState.filter(id => id !== userId));
    }
  };


  const data = { //Como enviar los datos para que se creen los ejercicios 
    "exercise": {
      "task_id": "",
      "user_id": []
    }
  }

  useEffect(() => {
    if (id !== "" && id !== null) {
      userExerciseDataService.getByTaskId(id)
        .then(({ data }) => {
          const assignedUsers = data.map(entry => entry.user_id);
          setUserAsigned(assignedUsers);
          console.log('Usuarios asignados:', assignedUsers);
        });
    }

    getAllUsers()
      .then((response) => {
        setUsers(response.data);
        console.log('Usuarios:', response.data);
      });

  }, [id]);

  return (
    <>
      <Modal
        btnText="Asignar Alumnos"
        modalTitle="Asignar tarea a usuario"
      >
        <div className='task--asigned__container'>
          <div className="list__container">
            <h3>Lista de clases</h3>
            <div className="list__items">
              <button className="btn light" onClick={(e) => e.preventDefault()}>Clase 1</button>
              <button className="btn light" onClick={(e) => e.preventDefault()}>Clase 2</button>
              <button className="btn light" onClick={(e) => e.preventDefault()}>Clase 3</button>
            </div>
          </div>

          <div className="list__container">
            <h3>Lista de estudiantes</h3>
            <div className="list__items">
              {users.map((user) => (
                <label className={userAsigned.includes(user.id) ? "user__item user__item--selected" : "user__item"} key={user.id}>
                  <input
                    type="checkbox"
                    checked={userAsigned.includes(user.id)}
                    onChange={(event) => checkboxActive(event, user.id)}
                  />
                  {user.name} {user.first_lastName} {user.second_lastName}
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* <button className='btn btn--taks-asigned' onClick={(e) => e.preventDefault()}>Guardar asignacion</button> */}
      </Modal>
    </>
  );
};

export default AsignedTaskUser;
