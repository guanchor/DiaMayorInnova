import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Shortcut from '../../components/shortcuts/shortcut/Shortcut'
import "./Modes.css"

const Modes = () => {
  const location = useLocation();


  if (location.pathname === "/modes") {
    return (
      <div className="shortcut__wrapper wrapper-center">
        <Shortcut url="practica" name='practica' />
        <Shortcut url="tarea" name='tarea' />
        <Shortcut url="examen" name='examen' />
      </div>

    )
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default Modes

