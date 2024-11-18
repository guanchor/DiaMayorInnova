import React from 'react'
import { Navigate } from 'react-router-dom';
import './Shortcut.css';

const Shortcut = ({icon="fi fi-rr-home" , name="Inicio", url="/home"}) => {
  return (
    <a href={url} className='shortcut__container'>
      <i className={`shortcut__icon ${icon}`}></i>
      <p className='shortcut__text'>{name}</p>
    </a>
  )
}

export default Shortcut
