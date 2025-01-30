import React, { useState } from "react";

const FindNameUsers = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="find-name-users">
      <h2>Buscar Usuarios por Nombre</h2>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindNameUsers;
