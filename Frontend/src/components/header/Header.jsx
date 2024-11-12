import React from 'react';
import './Header.css';
import Dropdown from './Dropdown/Dropdown';

const Header = () => {
  return (
    <nav className="header">
      <a href="/" className='logo'></a>
      <div className="header_userZone">
        <ul className='header_menu'>
            <li className='header_item'><a href=""><i className='fi fi-rr-bell'></i></a></li>
            <li className='header_item'><a href=""><i className='fi fi-rr-comment-alt'></i></a></li>
        </ul>
        <Dropdown />
      </div>
    </nav>
  )
}

export default Header;