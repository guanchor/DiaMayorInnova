import React from 'react'
import { NavLink } from 'react-router-dom';
import './Shortcut.css';

const Shortcut = ({
  icon = "fi fi-rr-home",
  name = "Inicio",
  url = "/home",
  onClick = null,
}) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault(); // Prevenir la navegación estándar
      onClick(); // Ejecutar la acción personalizada
    }
  };

  return (
    <NavLink className='shortcut__container' to={url} onClick={handleClick}>
      <i className={`shortcut__icon ${icon}`}></i>
      <p className='shortcut__text'>{name}</p>
    </NavLink>
  )
}

export default Shortcut
