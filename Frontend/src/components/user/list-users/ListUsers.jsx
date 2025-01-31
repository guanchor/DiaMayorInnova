import React, { useState } from "react";
import userService from "../../../services/userService";
import './ListUsers.css';

const ListUsers = ({ users, setUsers, setSelectedUser }) => {
  const deleteUser = (userId) => {
    userService.deleteUser(userId)
      .then(() => {
        setUsers(prev => prev.filter(user => user.id !== userId));
      })
      .catch(e => console.log(e));
  };

  return (
    <>
      <section className='user-list__container scroll-style'>
        <ul className="user_list">
          {users.map(user => (
            <li className='user-list_item' key={user.id}>
              <div className="user-list_section">
                {user.name} ({user.email}) - {user.role}
              </div>
              <div className="user-list_section">
                <button onClick={() => setSelectedUser(user)}>Editar</button>
                <button onClick={() => deleteUser(user.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ListUsers;