import React, { useState } from "react";

const FindNameUsers = ({ users }) => {
  const [searchName, setSearchName] = useState("");
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <section className="search-user_container">
      <h2>Buscar Usuarios por Nombre</h2>
      <label htmlFor="searchName" className='search-user_label'>
        <input
          type="text"
          name="searchName"
          placeholder="Buscar por nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </label>
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
