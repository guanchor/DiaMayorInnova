import DropdownContent from "./DropdownContent";
import { useContext, useEffect, useRef, useState } from "react";
import { navContext } from "../../../../context/nav-menu/navMenuContext";
import './Dropdown.css';

const Dropdown = () => {
  //console.log("DESDE DROPDOWN", useAuth());
  const { dropdownState, setdropdownState, changeDropmenu, userName, userAvatarUrl, rol } = useContext(navContext);


  /* sugerencia de mi pana , pero ns si se hace asi, no he buscado info , es para cuando se picha fuera del menu se cierre*/
  const dropdownRef = useRef(null);
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setdropdownState(false);
    }
  };

  useEffect(() => {
    // Agregar un listener para detectar clics en el documento
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Limpiar el listener al desmontar el componente
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* hasta aqui la sugerencia */


  const avatarUrl = userAvatarUrl;

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <a className="userZone" tabIndex={0} onClick={changeDropmenu} >
        <div className="userZone_menu">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="userZone_userFoto" />
          ) : (
            <i className=" text__user fi fi-rr-user"></i>
          )}
          <div className='menuInfo'>
            <p className='menuInfo_name'>{userName}</p>
            <p className='menuInfo_rol'>{rol}</p>
          </div>
        </div>
        <i className='fi fi-rr-angle-small-down'></i>
      </a>
      {dropdownState && <DropdownContent />}
    </div>
  )
}

export default Dropdown;