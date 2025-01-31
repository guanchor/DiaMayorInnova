import React, { useState } from "react";
import './FindNameUsers.css';

const FindNameUsers = ({ users }) => {
  const [searchName, setSearchName] = useState("");
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <section className="search-user_container">
      <h2>Buscar Usuarios por Nombre</h2>
      <div className='search-user_form'>
      <label htmlFor="searchName" className='search-user_label'>Nombre de usuario
        <input
          type="text"
          name="searchName"
          className='search-form_input'
          placeholder="Escribe un nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </label>
      </div>
      <div>
        <ul className="user_list">
          {filteredUsers.map(user => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FindNameUsers;
