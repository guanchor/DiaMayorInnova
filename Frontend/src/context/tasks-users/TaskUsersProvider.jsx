import { useState } from 'react'
import { taskUsersContext } from './taskUserContext'
import http from '../../http-common';
import exerciseServices from '../../services/exerciseServices';

const TaskUsersProvider = ({ children }) => {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [users, setUsers] = useState([]);



  const addUsers = (id) => {
    console.log("añadiiir usuarios ", currentUsers.filter(user => !assignedUsers.includes(user)))
    const filteredUsers = currentUsers.filter(user => !assignedUsers.includes(user));

    if (filteredUsers.length !== 0) {

      const data = {
        "exercise": {
          "task_id": id,
          "user_id": currentUsers.filter(user => !assignedUsers.includes(user))
        }
      }
      exerciseServices.create(data)
        .then((response) => {
          console.log(response);
        })
    }
  }

  const deleteUser = (id) => {
    console.log("iddddd ", id, " Usaurios a eliminar ", assignedUsers.filter(user => !currentUsers.includes(user)))
    const filteredUsers = assignedUsers.filter(user => !currentUsers.includes(user));
    const taskId = id;
    if (filteredUsers.filter(user => !currentUsers.includes(user)).length !== 0) {

      const data = {
        "task_id": taskId,
        "user_id": [...filteredUsers]
      }

      exerciseServices.deleteOnGroup(data)
        .then((response) => {
          console.log(response);
        })
    }
  }

  const getAllUser = () => http.get('/registrations');

  const usersByTaskId = (id) => {
    exerciseServices.getByTaskId(id)
      .then(({ data }) => {
        const assigned = data.map(user => user.user_id);
        setCurrentUsers(assigned)
        setAssignedUsers(assigned)
      });
  }

  const getAllUsers = () => {
    getAllUser()
      .then((response) => {
        setUsers(response.data);
      });
  }

  const selectUser = (userId) => {
    if (!currentUsers.includes(userId))
      setCurrentUsers(prevState => [...prevState, userId]);
  }

  const deselectUser = (userId) => {
    setCurrentUsers(prevState => prevState.filter(id => id !== userId));
  }

  const assignedInclude = (id) => {
    return currentUsers.includes(id);
  }

  const checkboxActive = ({ target }, userId) => {
    const { checked } = target;
    if (checked) {
      selectUser(userId)
    } else {
      deselectUser(userId)
    }
  };


  return (
    <taskUsersContext.Provider value={
      {
        users,
        usersByTaskId,
        getAllUsers,
        assignedInclude,
        checkboxActive,
        addUsers,
        deleteUser,
      }
    }>
      {children}
    </taskUsersContext.Provider>
  )
}

export default TaskUsersProvider
