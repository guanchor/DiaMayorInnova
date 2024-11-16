import './NavItem.css';

const NavItem = ({ icon, name }) => {
  return (
    <>
      <i className={icon}></i>
      <p className='navBar__text'>{name}</p>
    </>
  );
}

export default NavItem;