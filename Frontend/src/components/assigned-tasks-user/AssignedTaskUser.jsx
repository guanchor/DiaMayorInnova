import Modal from '../modal/Modal';
import { useContext, useEffect } from 'react';
import { taskUsersContext } from '../../context/tasks-users/taskUserContext';
import "./AssignedTaskUser.css";

const AssignedTaskUser = ({ id = "" }) => {
  const { users, usersByTaskId, assignedInclude, checkboxActive, getAllUsers, addUsers, deleteUser } = useContext(taskUsersContext)

  const onHandleSubmit = (e) => {
    e.preventDefault();
    deleteUser(id);
    addUsers(id);
  }

  useEffect(() => {
    getAllUsers();
    if (id !== "") {
      usersByTaskId(id)
    }
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
        <button className='btn btn--tasks-assigned' onClick={onHandleSubmit}>Guardar asignación</button>
      </Modal>
    </>
  );
};

export default AssignedTaskUser;
