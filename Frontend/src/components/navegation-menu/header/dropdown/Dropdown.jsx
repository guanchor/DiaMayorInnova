import DropdownContent from "./DropdownContent";
import { useContext, useEffect, useRef, useState } from "react";
import { navContext } from "../../../../context/nav-menu/navMenuContext";
import './Dropdown.css';

const Dropdown = () => {
  const { name, rol, dropdownState, setdropdownState, changeDropmenu } = useContext(navContext);

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



  return (
    <div ref={dropdownRef} className="dropdown-container">
      <a className="userZone" tabIndex={0} onClick={changeDropmenu} >
        <div className="userZone_menu">
          <div className='userZone_userFoto' ></div>
          <div className='menuInfo'>
            <p className='menuInfo_name'>{name}</p>
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