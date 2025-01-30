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
    <div className="user-list">
      <h2>Usuarios Registrados</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email}) - {user.role}
            <button onClick={() => updateForm(user)}>Editar</button>
            <button onClick={() => deleteUser(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;