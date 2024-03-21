import './styles.css';
import Logo from '../../assets/logoSimplifiedBlack.png';

const LoginPage = () => {

  const sendCredentials = async (e : {preventDefault : CallableFunction}) => {
    e.preventDefault();
  }

  return (
    <div className='page'>
      <div className='container'>
        <img src={Logo} alt='logo' />

        <h1>Hola! Bienvenido a OLSoftware</h1>
        <form onSubmit={sendCredentials}>
          <input className='text_input' type='email' placeholder='Correo' />
          <input className='text_input' type='password' placeholder='Contraseña' />
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
