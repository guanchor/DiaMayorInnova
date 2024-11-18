import { NavLink, useNavigate ,useLocation} from 'react-router-dom';
import './NavItem.css';

const NavItem = ({ icon, name, url = "/home" }) => {
  const location = useLocation();
  const isActive = location.pathname === url;

  return (
    <li className={`navBar__item ${isActive ? 'pg--active' : ''}`}>
      <NavLink className="nav_link" to={url}>
        <i className={icon}></i>
        <p className='navBar__text'>{name}</p>
      </NavLink>
    </li>
  );
}

export default NavItem;