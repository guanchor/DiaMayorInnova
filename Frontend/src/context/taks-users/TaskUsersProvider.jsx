import { useState } from 'react'
import { taskUsersContext } from './taskUserContext'
import http from '../../http-common';
import userExerciseDataService from '../../services/userExerciseDataService';

const TaskUsersProvider = ({ children }) => {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const data = { //Como enviar los datos para que se creen los ejercicios 
    "exercise": {
      "task_id": "",
      "user_id": []
    }
  }

  const getAllUser = () => http.get('/registrations');

  const usersByTaskId = (id) => {
    userExerciseDataService.getByTaskId(id)
      .then(({ data }) => {
        const assignedUsers = data.map(entry => entry.user_id);
        setCurrentUsers(assignedUsers)
        console.log('Usuarios asignados:', assignedUsers);
      });

  }

  const getAllUsers = () => {
    getAllUser()
      .then((response) => {
        setUsers(response.data);
        console.log('Usuarios:', response.data);
      });
  }

  const selectUser = (userId) => {
    setAssignedUsers(prevState => [...prevState, userId]);
    setDeletedUsers(prevState => prevState.filter(id => id !== userId));
  }

  const deselectUser = (userId) => {
    setAssignedUsers(prevState => prevState.filter(id => id !== userId));
    setDeletedUsers(prevState => prevState.filter(id => id === userId));
  }

  const assignedInclude = (user) => {
    return assignedUsers.includes(user.id);
  }

  return (
    <taskUsersContext.Provider value={
      {
        users,
        currentUsers,
        deletedUsers,
        assignedUsers,
        usersByTaskId,
        getAllUsers,
        setAssignedUsers,
        setDeletedUsers,
        selectUser,
        deselectUser,
        assignedInclude,
        setCurrentUsers,
      }
    }>
      {children}
    </taskUsersContext.Provider>
  )
}

export default TaskUsersProvider
