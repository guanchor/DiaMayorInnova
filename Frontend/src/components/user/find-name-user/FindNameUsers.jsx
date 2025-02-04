import React, { useState } from "react";
import './FindNameUsers.css';

const FindNameUsers = ({ searchName, setSearchName }) => {
  return (
    <section className="search-user_container">
      <h2>Buscar Usuarios por Nombre</h2>
      <div className="search-bar_container">
        <div className='search-bar'>
          <input
            type="text"
            id="searchName"
            aria-label='Filtrar por nombre de usuario'
            name="searchName"
            className='search-bar_search'
            placeholder="Escribe un nombre"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <i className='fi fi-rr-search'></i>
        </div>
      </div>
    </section>
  );
};

export default FindNameUsers;
