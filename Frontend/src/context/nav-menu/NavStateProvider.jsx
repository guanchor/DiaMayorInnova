import React, { useState } from 'react'
import { navContext } from './navMenuContext'

const NavStateProvider = ({ children }) => {
  const [menuState, setMenuState] = useState(false);
  const [name, setName] = useState("Pedro Picapiedra")
  const [rol, setRol] = useState("Estudiante")
  const [dropdownState, setdropdownState] = useState(false);

  const changeMenu = () => {
    setMenuState(!menuState);
  }

  const changeDropmenu = () => {
    setdropdownState(!dropdownState);
  }

  return (
    <navContext.Provider value={
      {
        menuState,
        changeMenu,
        name,
        rol,
        dropdownState,
        setdropdownState,
        changeDropmenu
      }
    }>
      {children}
    </navContext.Provider >
  )
}

export default NavStateProvider
