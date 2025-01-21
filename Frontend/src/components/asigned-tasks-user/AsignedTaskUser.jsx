import React, { useEffect, useState } from 'react'
import taskService from '../../services/taskService'
import http from '../../http-common'


const AsignedTaskUser = () => {
    const [tasks, setTasks] = useState(null)
    const [users, setUsers] = useState(null)
    const [userAdded, setUserAdded] = useState(false)
    const [userAsigned, setUserAsigned] = useState([])


    const getAllUsers = () => http.get('/registrations');
    
    useEffect(() => {
      taskService.getAllTasks()
        .then( ({data}) => {
            setTasks(data)

        })

    getAllUsers()
        .then((response)=> {
            setUsers(response.data)
            console.log(users, response.data)
        })

    }, [])
    
    const getIdTask = (id) => {
        setUserAdded(false)
        console.log(id)
        setUserAdded(true)
    }

    const checkboxActive = ({target } ,id) => {
        if (target.checked){
            setUserAsigned([...userAsigned,id])
            console.log(userAsigned)
        }else {
            setUserAsigned(userAsigned.filter(num => num != id))
            console.log(userAsigned);
        }
    }

  return (
    <>
        <p>holaaa</p>

      { tasks && tasks.map ((task) => (
            <button className='btn' onClick={() => getIdTask(task.id)} key={task.id}>{task.title}</button>
        )
      )}


      <div>
        {
            userAdded && users.map((user) => ( 
            <div key={user.id}>
                <input type="checkbox" onChange={() => checkboxActive(event,user.id)}/>
                <p>{user.name} {user.fisrtLastName}</p>
            </div>

            ))
        }
      </div>
    </>
  )
}

export default AsignedTaskUser
