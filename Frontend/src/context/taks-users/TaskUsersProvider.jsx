import { useState } from 'react'
import { taskUsersContext } from './taskUserContext'
import http from '../../http-common';
import userExerciseDataService from '../../services/userExerciseDataService';

const TaskUsersProvider = ({ children }) => {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const data = { //Como enviar los datos para que se creen los ejercicios 
    "exercise": {
      "task_id": "",
      "user_id": []
    }
  }

  const addUsers = () => {
    console.log(currentUsers.filter(user => !assignedUsers.includes(user)))
  }

  const deleteUser = () => {
    console.log(assignedUsers.filter(user => !currentUsers.includes(user)))
  }

  const getAllUser = () => http.get('/registrations');

  const usersByTaskId = (id) => {
    userExerciseDataService.getByTaskId(id)
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
    addUsers();

  }

  const deselectUser = (userId) => {
    setCurrentUsers(prevState => prevState.filter(id => id !== userId));
    deleteUser();
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
      }
    }>
      {children}
    </taskUsersContext.Provider>
  )
}

export default TaskUsersProvider
