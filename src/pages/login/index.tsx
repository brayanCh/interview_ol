import './styles.css';
import Logo from '../../assets/logoSimplifiedBlack.png';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setCurrentUser} from '../../redux/slices/auth';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {

  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendCredentials = async (e : {preventDefault : CallableFunction}) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/login?user=${user}&password=${password}`);
    const data = await response.json();
    if (data?.length === 0) {
      alert('Usuario o contraseña incorrectos');
      return;
    }
    dispatch(setCurrentUser(data[0]));
    localStorage.setItem('user', JSON.stringify(data[0]));
    navigate('/dashboard');
  }

  const checkLocalStorage = () => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(setCurrentUser(JSON.parse(user)));
      navigate('/dashboard');
    }
  }

  useEffect(() => {
    checkLocalStorage();
  }, []);

  return (
    <div className='page'>
      <div className='container'>
        <img src={Logo} alt='logo' />

        <h1>Hola! Bienvenido a OLSoftware</h1>
        <form onSubmit={sendCredentials}>
          <input value={user} onChange={e => setUser(e.target.value)} className='text_input' type='text' placeholder='usuario' />
          <input value={password} onChange={e => setPassword(e.target.value)} className='text_input' type='password' placeholder='Contraseña' />
          <button className='send_button' type='submit'>Ingresar</button>
          <div className='row'>
            <input type='checkbox' />
            <label>Recordarme</label>
            <h3>Recuperar Contraseña</h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
