import { useEffect, useState } from 'react'
import { navContext } from './navMenuContext'
import { useAuth } from '../../context/AuthContext';

const NavStateProvider = ({ children }) => {
  const { user, role, userAvatarUrl } = useAuth();
  const [menuState, setMenuState] = useState(false);
  const [currentRole, setCurrentRole] = useState(role);
  const [dropdownState, setdropdownState] = useState(false);

  const userName = user ? user.name : "Pedro Picapiedra";
  console.log("cotext roleeeeeeeee", role)

  const changeMenu = () => {
    setMenuState(!menuState);
  }

  const changeDropmenu = () => {
    setdropdownState(!dropdownState);
  }

  const isAdmin = role === "admin";
  const isTeacher = role === "teacher";

  const setAdminRol = () => {
    setCurrentRole("admin")
  }

  const setTeacherRol = () => {
    setCurrentRole("teacher")
  }

  const setStudentRol = () => {
    setCurrentRole("student")
  }

  useEffect(() => {
    setCurrentRole(role);
  }, [role])

  return (
    <navContext.Provider value={
      {
        menuState,
        userName,
        userAvatarUrl,
        dropdownState,
        isAdmin,
        isTeacher,
        currentRole,
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
