import './NavItem.css';

const NavItem = ({ icon, name, url }) => {
  return (
    <a className='nav_link' href={url}>
      <i className={icon}></i>
      <p className='navBar__text'>{name}</p>
    </a>
  );
}

export default NavItem;