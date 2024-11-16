import React from 'react';
import Dropdown from './dropdown/Dropdown';
import { useContext } from "react";
import { navContext } from "../../../context/nav-menu/navMenuContext";
import './Header.css';


const Header = () => {
  const { changeMenu } = useContext(navContext);

  return (
    <nav className="header">
      <i className='fi fi-rr-menu-burger' onClick={changeMenu}></i>
      <a href="/" className='logo'>Innova</a>
      <div className="header_userZone">
        <ul className='header_menu'>
          <li className='header_item'><a href="/home" tabIndex={0}><i className='fi fi-rr-bell'></i></a></li>
          <li className='header_item'><a href="" tabIndex={0}><i className='fi fi-rr-comment-alt' > </i></a></li>
        </ul>
        <Dropdown />
      </div>
    </nav>
  )
}

export default Header;