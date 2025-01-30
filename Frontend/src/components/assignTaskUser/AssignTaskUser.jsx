import { useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import userServices from '../../services/userServices';
import "./AssignTaskUser.css"

const AssignTaskUser = ({ assignedInclude, setCurrentUsers, currentUsers }) => {
  const [users, setUsers] = useState([]);
  const selectUser = (userId) => {
    if (!currentUsers.includes(userId))
      setCurrentUsers(prevState => [...prevState, userId]);
  }

  const deselectUser = (userId) => {
    setCurrentUsers(prevState => prevState.filter(id => id !== userId));
  }

  const checkboxActive = ({ target }, userId) => {
    const { checked } = target;
    if (checked) {
      selectUser(userId)
    } else {
      deselectUser(userId)
    }
  };

  const getAllUsers = () => {
    userServices.getAllUser()
      .then(({ data }) => {
        console.log("all users ", data)
        setUsers(data);
        return data
      });
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <>
      <Modal
        btnText="Asignar Alumnos"
        modalTitle="Asignar tarea a usuario"
      >
        <div className='task-assigned__container'>
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
              {users && users.map((user) => (
                <label className={assignedInclude(user.id) ? "user__item user__item--selected" : "user__item"} key={user.id}>
                  <input
                    type="checkbox"
                    checked={assignedInclude(user.id)}
                    onChange={(event) => checkboxActive(event, user.id)}
                  />
                  {user.name} {user.first_lastName} {user.second_lastName}
                </label>
              ))}
            </div>
          </div>
        </div>
        {/*         <button className='btn btn--tasks-assigned' onClick={(e) => e.preventDefault()}>Guardar asignación</button> */}
      </Modal>
    </>
  )
}

export default AssignTaskUser
