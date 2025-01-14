import { useContext, useState } from "react"
import { navContext } from "../../../../context/nav-menu/navMenuContext";
import RolMenu from "./RolMenu";
import { useAuth } from "../../../../context/AuthContext";

const DropdownContent = () => {
  const { logOut } = useAuth();
  const [rolMenu, setRolMenu] = useState(false)
  const { rol, isAdmin, setAdminRol } = useContext(navContext);

  const selectorStatus = () => {
    setRolMenu(!rolMenu)
  }

  return (
    <>
      <ul className="userMenu">
        {isAdmin && rol === "student" ? <li className="userMenu_item" tabIndex={0} onClick={setAdminRol}><a> <i className="fi fi-rr-user-coach"></i>Vista admin</a></li> : null}
        {(rol === "teacher" || rol === "admin") && (<li className="userMenu_item" tabIndex={0} onClick={selectorStatus}><a> <i className="fi fi-rr-user"></i> Cambio de rol</a></li>)}
        {rolMenu && rol !== "student" ? <RolMenu /> : null}
        <li className="userMenu_item" tabIndex={0}><a> <i className="fi fi-rr-info"></i> Ayuda y privacidad</a></li>
        <li className="userMenu_item" tabIndex={0} onClick={logOut}><a> <i className="fi fi-rr-power"></i> Cerrar Sesión</a></li>
      </ul>
    </>
  )

}

export default DropdownContent;