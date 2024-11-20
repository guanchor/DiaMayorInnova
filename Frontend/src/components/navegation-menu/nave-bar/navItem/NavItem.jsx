import { NavLink,useLocation} from 'react-router-dom';
import { navContext } from '../../../../context/nav-menu/navMenuContext';
import { useContext } from 'react';
import './NavItem.css';

const NavItem = ({ icon, name, url = "/home" }) => {
  const location = useLocation();
  const isActive = location.pathname === url;
  const { changeMenu } = useContext(navContext);

  return (
    <li className={`navBar__item ${isActive ? 'pg--active' : ''}`} onClick={changeMenu}>
      <NavLink className="nav_link" to={url}>
        <i className={icon}></i>
        <p className='navBar__text'>{name}</p>
      </NavLink>
    </li>
  );
}

export default NavItem;