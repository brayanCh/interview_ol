import './styles.css'
import HamburgerMenu from '../../assets/hamburger-menu-svgrepo-com.svg';
import Notification from '../../assets/bell-svgrepo-com.svg';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <div className="left-nav-logo">
          A
        </div>
        <div className="right-nav-sec">
          <button className="ham-menu" style={{width: 40, height: 40}}>
            <img className='notification' src={Notification} alt="menu" />
          </button>
          <button className="ham-menu" onClick={() => setShowMenu(true)}>
            <img src={HamburgerMenu} alt="menu" />
          </button>
        </div>
      </nav>
      {
        showMenu && (

          <div className="modal" onClick={() => setShowMenu(false)}>
            <div className="menu" onClick={() => {}}>
              <h2>ESTADISTICAS</h2>
              <button className="menu-item" onClick={() => navigate('/dashboard')}>dashboard</button>

              <h2>PROYECTOS</h2>
              <button className="menu-item" onClick={() => navigate('/projects')} >Lista de Proyectos</button>

              <h2>USUARIOS</h2>
              <button className="menu-item" onClick={() => navigate('/users')} >Lista de usuarios</button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Navbar;
