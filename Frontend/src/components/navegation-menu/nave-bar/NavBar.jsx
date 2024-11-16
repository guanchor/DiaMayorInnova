import { useContext } from "react";
import { navContext } from "../../../context/nav-menu/navMenuContext";
import NavItem from "./navItem/NavItem";
import "./NavBar.css";

const NavBar = () => {
  const { menuState, changeMenu } = useContext(navContext);

  return (
    <>
      <nav className={menuState ? "navBar_container nav--active" : "navBar_container"}>
        <i className="fi fi-rr-x close" onClick={changeMenu}></i>
        <ul className="navBar__list" >
          <li className="navBar__item pg--active"><NavItem icon="fi fi-rr-home" name="home" url="/home" /></li>
          <li className="navBar__item"><NavItem icon="fi fi-rr-bank" name="Modos" url="schools" /></li>
          <li className="navBar__item"><NavItem icon="fi fi-rr-graduation-cap" name="Tareas" /></li>
          <li className="navBar__item"><NavItem icon="fi fi-rr-calendar" name="Calendario" /></li>
        </ul>
        <div className="navBar__item"><NavItem icon="fi fi-rr-settings-sliders" name="ajustes" /></div>
      </nav>
    </>
  )
}

export default NavBar;