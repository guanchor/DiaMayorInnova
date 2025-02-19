import DropdownContent from "./DropdownContent";
import { useContext, useEffect, useRef } from "react";
import { navContext } from "../../../../context/nav-menu/navMenuContext";
import './Dropdown.css';
import useOnClickOutside from "../../../../hooks/useOnClickOutside";

const Dropdown = () => {
  const { dropdownState = false, setdropdownState, changeDropmenu, userName, userAvatarUrl, currentRole } = useContext(navContext);
  const avatarUrl = userAvatarUrl;
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setdropdownState(false), setdropdownState);

  useEffect(() => {
    setdropdownState(false);
  }, [])

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <a
        className="userZone"
        href="#"
        role="button"
        tabIndex={0}
        onClick={changeDropmenu}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            changeDropmenu();
          }
        }}
      >
        <div className="userZone_menu">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="userZone_userFoto" />
          ) : (
            <i className=" text__user fi fi-rr-user"></i>
          )}
          <div className='menuInfo'>
            <p className='menuInfo_name'>{userName}</p>
            <p className='menuInfo_rol'>{currentRole}</p>
          </div>
        </div>
        <i className='fi fi-rr-angle-small-down'></i>
      </a>
      {dropdownState && <DropdownContent />}
    </div>
  )
}

export default Dropdown;