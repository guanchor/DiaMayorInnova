import { NavLink, useLocation } from 'react-router-dom';
import { navContext } from '../../../../context/nav-menu/navMenuContext';
import { useContext } from 'react';
import { Tooltip } from 'react-tooltip'
import './NavItem.css';
import useScreenSize from '../../../../hooks/useScreenSize';

const NavItem = ({ icon, name, url = "/home" }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(url);
  const { changeMenu } = useContext(navContext);

  return (<>
    <li className={`navBar__item ${isActive ? 'pg--active' : ''}`} onClick={changeMenu}>
      <NavLink
        aria-label={name}
        className="nav_link" to={url}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={name}
        data-tooltip-place="right">
        <i className={icon}></i>
        <p className='navBar__text'>{name}</p>
      </NavLink>
      {useScreenSize().width > 800 && <Tooltip id="my-tooltip" place='right' />}
    </li>
  </>
  );
}

export default NavItem;