import DropdownContent from "./DropdownContent";
import { useState, useRef } from "react";
import { useAuth } from "../../../hooks/AuthProvider";
import useOnClickOutside from "../../../hooks/UseOnClickOutside";
import './Dropdown.css';

const Dropdown = () => {
  const { user, userAvatarUrl } = useAuth();
  console.log("Datos del usuario en Dropdown:", user);
  console.log("Avatar URL en Dropdown:", userAvatarUrl);
  /* const [name, setName] = useState("Pedro Picapiedra") */
  const [rol, setRol] = useState("Estudiante")

  const [menuState, setMenuState] = useState(false);
  const dropDownRef = useRef();

  useOnClickOutside(dropDownRef, () => setMenuState(false));

  const changeMenu = () => {
    setMenuState(!menuState);
  }
  console.log("Datos usuario Dropdown", user);
  const userName = user ? user.email.split('@')[0] : "Pedro Picapiedra";
  const avatarUrl = userAvatarUrl;
  console.log("¿Existe avatar para el usuario?", avatarUrl);

  return (
    <>
      <div ref={dropDownRef}>
        <a className="userZone" tabIndex={0} onClick={changeMenu} onKeyDown={(e) => { if (e.key === 'Enter') { changeMenu(); } }}>
          <div className="userZone_menu">
            <div className="userZone_userFoto">
            {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="avatar-image" />
              ) : (
                <span>No Avatar</span>
              )}
            </div>
            <div className='menuInfo'>
              <p className='menuInfo_name'>{userName}</p>
              <p className='menuInfo_rol'>{rol}</p>
            </div>
          </div>
          <i className='fi fi-rr-angle-small-down'></i>
        </a>
        {menuState && <DropdownContent />}
      </div>
    </>
  )
}

export default Dropdown;
