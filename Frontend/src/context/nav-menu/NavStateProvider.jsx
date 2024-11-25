import React, { useEffect, useState } from 'react'
import { navContext } from './navMenuContext'
import { useAuth } from '../../hooks/AuthProvider';

const NavStateProvider = ({ children }) => {
  const [menuState, setMenuState] = useState(false);
  const [name, setName] = useState("Pedro Picapiedra");
  const [rol, setRol] = useState("Estudiante");
  const [dropdownState, setdropdownState] = useState(false);
  const { user } = useAuth();

  const changeMenu = () => {
    setMenuState(!menuState);
  }

  const changeDropmenu = () => {
    setdropdownState(!dropdownState);
  }

  const setUser = () => {
    if (user && user.email) {
    setName(user.email.split('@')[0]);
    } else {
      setName("Pedro Picapiedra");
    }
  }

  useEffect(() => {
    setUser();
  }, [user])

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
