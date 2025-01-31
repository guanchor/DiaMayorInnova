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
          <div className="user-list_section">
            <p><strong>Nombre</strong></p>
            <p><strong>Correo</strong></p>
            <p><strong>Role</strong></p>
          </div>
          {users.map(user => (
            <li className='user-list_item' key={user.id}>
              <div className="user-list_section">
                <p>{user.name}</p>
                <p>({user.email})</p>
                <p>{user.role}</p>
              </div>
              <div className="user-list_section">
                <button onClick={() => setSelectedUser(user)} >Editar</button>
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