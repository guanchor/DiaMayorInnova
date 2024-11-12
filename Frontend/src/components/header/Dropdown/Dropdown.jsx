import DropdownContent from "./DropdownContent";
import './Dropdown.css';
import { useState } from "react";

const Dropdown = () => {

    const [name, setName] = useState("Pedro Picapiedra")
    const [rol, setRol] = useState("Estudiante")

    const [menuState, setMenuState] = useState(false);

    const changeMenu= () =>{
        setMenuState (!menuState);
    }

    return( 
        <>
            <a className="userZone" tabIndex={0} onClick={changeMenu} onKeyDown={(e) => {if(e.key === 'Enter') {changeMenu();}}}>
                <div className="userZone_menu">
                    <div className='userZone_userFoto' ></div>
                    <div className='menuInfo'>
                        <p className='menuInfo_name'>{name}</p>
                        <p className='menuInfo_rol'>{rol}</p>
                    </div>
                </div>
                <i className='fi fi-rr-angle-small-down'></i>
            </a>
            {menuState && <DropdownContent />}
        </>
    )
}

export default Dropdown;
