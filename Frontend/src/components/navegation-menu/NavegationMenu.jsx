import Header from "./header/Header";
import NavBar from "./nave-bar/NavBar";
import NavStateProvider from "../../context/nav-menu/NavStateProvider";

const NavegationMenu = () => {

  return (
    <NavStateProvider>
      <Header />
      <NavBar />
    </NavStateProvider>
  )
}
export default NavegationMenu;