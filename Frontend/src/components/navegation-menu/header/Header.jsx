import React, { useState, useEffect, useContext } from 'react';
import Dropdown from './dropdown/Dropdown';
import { navContext } from "../../../context/nav-menu/navMenuContext";
import './Header.css';
import { NavLink, useLocation } from 'react-router-dom';
import innovaLogo from '/innova.svg';
import innovaLogoSmall from '/innova_small.svg';
import useScreenSize from '../../../hooks/useScreenSize';

const Header = () => {
  const { changeMenu } = useContext(navContext);
  const [logo, setLogo] = useState(innovaLogo);
  const location = useLocation();
  const screenSize = useScreenSize();

  useEffect(() => {
    if (screenSize.width < 800) {
      setLogo(innovaLogoSmall);
    } else {
      setLogo(innovaLogo);
    }
  }, [screenSize.width]);


  if (location.pathname === "/sign_in") {
    return (
      <nav className="header">
        <NavLink to={"/home"}>
          <img src={logo} className="logo" alt="Innova logo" />
        </NavLink>
      </nav>
    )
  }

  return (
    <nav className="header">
      <i className='fi fi-rr-menu-burger' onClick={changeMenu}></i>
      <NavLink to={"/home"}><img src={logo} className="logo" alt="Innova logo" /></NavLink>
      <div className="header_userZone">
        <ul className='header_menu'>
          <li className='header_item'><NavLink to="/home" tabIndex={0}><i className='fi fi-rr-bell'></i></NavLink></li>
        </ul>
        <Dropdown />
      </div>
    </nav>
  )
}

export default Header;