import React from 'react';
import Dropdown from './dropdown/Dropdown';
import { useContext } from "react";
import { navContext } from "../../../context/nav-menu/navMenuContext";
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { changeMenu } = useContext(navContext);

  if (location.pathname === "/sign_in") {
    return (
      <nav className="header">
        <i className='fi fi-rr-menu-burger' onClick={changeMenu}></i>
        <a href="/" className='logo'>Innova</a>;
      </nav>
    )
  }

  return (
    <nav className="header">
      <i className='fi fi-rr-menu-burger' onClick={changeMenu}></i>
      <a href="/" className='logo'>Innova</a>
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