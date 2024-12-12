import React, { useEffect, useState } from 'react'
import { navContext } from './navMenuContext'
import { useAuth } from '../../context/AuthContext';

const NavStateProvider = ({ children }) => {
  const { user, roles, userAvatarUrl } = useAuth();


  const [menuState, setMenuState] = useState(false);
  const [rol, setRol] = useState(roles[0]);
  const [dropdownState, setdropdownState] = useState(false);

  const userName = user ? user.name : "Pedro Picapiedra";

  const changeMenu = () => {
    setMenuState(!menuState);
  }

  const changeDropmenu = () => {
    setdropdownState(!dropdownState);
  }

  const isAdmin = [...roles].includes("admin") ? true : false;

  const setAdminRol = () => {
    setRol("admin")
  }

  const setTeacherRol = () => {
    setRol("teacher")
  }

  const setStudentRol = () => {
    setRol("student")
  }

  useEffect(() => {
    setRol(roles[0]);
  }, [roles])




  return (
    <navContext.Provider value={
      {
        menuState,
        userName,
        userAvatarUrl,
        dropdownState,
        isAdmin,
        rol,
        changeMenu,
        setdropdownState,
        changeDropmenu,
        setAdminRol,
        setStudentRol,
        setTeacherRol,
      }
    }>
      {children}
    </navContext.Provider >
  )
}

export default NavStateProvider
