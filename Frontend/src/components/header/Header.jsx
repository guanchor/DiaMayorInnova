import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <span></span>
      <div className="header_userZone">
        <ul className='header_menu'>
            <li className='header_item'><i className='fi fi-rr-bell'></i></li>
            <li className='header_item'><i className='fi fi-rr-comment-alt'></i></li>
        </ul>
        <div className="userZone">
            <div className="userZone_menu">
                <div className='userZone_userFoto'></div>
                <div className='menuInfo'>
                    <p className='menuInfo_name'>Manu Menu</p>
                    <p className='menuInfo_role'>Admin</p>
                </div>
            </div>
            <i className='fi fi-rr-angle-small-down'></i>
        </div>
      </div>
    </div>
  )
}

export default Header;