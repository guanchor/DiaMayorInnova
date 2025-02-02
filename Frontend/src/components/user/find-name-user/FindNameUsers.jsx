import React, { useState } from "react";
import './FindNameUsers.css';

const FindNameUsers = ({ searchName, setSearchName }) => {
  return (
    <section className="search-user_container">
      <h2>Buscar Usuarios por Nombre</h2>
      <div className='search-user_form'>
      <label htmlFor="searchName" className='search-user_label'>Nombre de usuario
        <input
          type="text"
          id="searchName"
          name="searchName"
          className='search-form_input'
          placeholder="Escribe un nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </label>
      </div>
    </section>
  );
};

export default FindNameUsers;
