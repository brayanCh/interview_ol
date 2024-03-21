import './styles.css'
import HamburgerMenu from '../../assets/hamburger-menu-svgrepo-com.svg';
import Notification from '../../assets/bell-svgrepo-com.svg';

const Navbar = () => {

  return (
    <nav>
      <div className="left-nav-logo">
        A
      </div>
      <div className="right-nav-sec">
        <button className="ham-menu" style={{width: 40, height: 40}}>
          <img className='notification' src={Notification} alt="menu" />
        </button>
        <button className="ham-menu">
          <img src={HamburgerMenu} alt="menu" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
