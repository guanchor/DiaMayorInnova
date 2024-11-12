import React from 'react';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className='navbar_container'>
            <ul className='navbar'>
                <li className='navbar_item '><a className='currentPage' href="#"><i className='fi fi-rr-home'></i></a></li>
                <li className='navbar_item'><a href="#"><i className='fi fi-rr-bank'></i></a></li>
                <li className='navbar_item'><a href="#"><i className='fi fi-rr-graduation-cap'></i></a></li>
                <li className='navbar_item'><a href="#"><i className='fi fi-rr-calendar'></i></a></li>
            </ul>
            <a href="#" className='navbar_item'><i className='fi fi-rr-settings-sliders'></i></a>

        </nav>
    );
}
export default NavBar;