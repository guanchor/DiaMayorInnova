import React, { useState } from "react";
import userService from "../../../services/userService";

const ListUsers = ({ users, setUsers }) => {
  const deleteUser = (userId) => {
    userService.deleteUser(userId)
      .then(() => {
        setUsers(prev => prev.filter(user => user.id !== userId));
      })
      .catch(e => console.log(e));
  };

  const updateForm = (user) => {
    //
  };

  return (
    <>
      <section className='user-list__container scroll-style'>
        <ul className="user_list">
          {users.map(user => (
            <li className='user-list_item' key={user.id}>
              <div className="user-list_section">
                {user.name} ({user.email}) - {user.role}
                <button onClick={() => updateForm(user)}>Editar</button>
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