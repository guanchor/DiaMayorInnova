import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Shortcut from '../../components/shortcuts/shortcut/Shortcut'

const Modes = () => {
  const location = useLocation();


  if (location.pathname === "/modes") {
    return (
      <div className='shortcut__wrapper'>

        <Shortcut url="pruebas" name='pruebas' />
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
