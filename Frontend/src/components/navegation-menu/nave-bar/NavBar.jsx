import { useContext } from "react";
import { navContext } from "../../../context/nav-menu/navMenuContext";
import NavItem from "./navItem/NavItem";
import "./NavBar.css";

const NavBar = () => {
  const { menuState, changeMenu } = useContext(navContext);

  const routes = [];

  routes.push({
    to: "/home",
    icon: "fi fi-rr-home",
    name: "home",
    rol: ["teacher", "admin", "student"],
  })

  routes.push({
    to: "/modes",
    icon: "fi fi-rr-bank",
    name: "modos",
    rol: ["teacher", "admin", "student"],
  })

  routes.push({
    to: "/task",
    icon: "fi fi-rr-graduation-cap",
    name: "tareas",
    rol: ["teacher", "admin", "student"],
  })

  routes.push({
    to: "/calendar",
    icon: "fi fi-rr-calendar",
    name: "calendario",
    rol: ["teacher", "admin", "student"],
  })

  routes.push({
    to: "/settings",
    icon: "fi fi-rr-settings-sliders",
    name: "ajustes",
    rol: ["teacher", "admin", "student"],
  })

  routes.push({
    to: "/schools",
    icon: "fi fi-rr-school",
    name: "gestión escuelas",
    rol: ["admin"],
  })

  routes.push({
    to: "/accounting-plans",
    icon: "fi fi-rr-book",
    name: "gestión planes contables",
    rol: ["teacher", "admin"],
  })

  routes.push({
    to: "/class-list",
    icon: "fi fi-rr-book",
    name: "gestión clases",
    rol: ["teacher", "admin"],
  })

  console.table(routes)

  return (
    <>
      <nav className={menuState ? "navBar_container nav--active" : "navBar_container"}>
        <i className="fi fi-rr-x close" onClick={changeMenu}></i>
        <ul className="navBar__list" >
          {routes.map((route) => (
            <NavItem key={route.to} icon={route.icon} name={route.name} url={route.to} />
          ))}
        </ul>
        <div className="navBar__item"><NavItem icon="fi fi-rr-settings-sliders" name="ajustes" url="/settings" /></div>
      </nav>
    </>
  )

}
export default NavBar;