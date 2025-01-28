import Modal from '../modal/Modal';
import { useContext, useEffect } from 'react';
import "./AsignedTaskUser.css";
import { taskUsersContext } from '../../context/taks-users/taskUserContext';

const AsignedTaskUser = ({ id = "" }) => {
  const { selectUser, deselectUser, getAllUsers, users, usersByTaskId, assignedInclude, currentUsers } = useContext(taskUsersContext)


  console.log(users)


  const checkboxActive = ({ target }, userId) => {
    const { checked } = target;
    if (checked) {
      selectUser(userId)
    } else {
      deselectUser(userId)
    }
  };

  useEffect(() => {
    getAllUsers();
    if (id !== "") {
      usersByTaskId(id)
      console.log(currentUsers);
    }
  }, [])

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
              {users && users.map((user) => (
                <label className={assignedInclude(user) ? "user__item user__item--selected" : "user__item"} key={user.id}>
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
        {/* <button className='btn btn--taks-asigned' onClick={(e) => e.preventDefault()}>Guardar asignacion</button> */}
      </Modal>
    </>
  );
};

export default AsignedTaskUser;
