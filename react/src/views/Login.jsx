import '../style.scss'
import LoginBackground from '../img/FundalLogin.jpg'
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import { Helmet } from 'react-helmet';

export default function Login() {
  return (
    <div>
        <Helmet>
            <title>Login</title>
            <link rel="icon" href={SwiftCargusLogo} type="image/png" />
        </Helmet>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />

        <div className='formContainer' style={{ backgroundImage: `url(${LoginBackground})` }}>

            <div className='formWrapper'>

                <span className='logo'> Swift Cargus </span>
                <span className='title'>Login</span>
                <form>
                    <input type='email' placeholder='E-mail'></input>
                    <input type='password' placeholder='Password'></input>
                    <button id="login">Login</button>
                </form>
                <p>Do not have an account? <a href = '/register'> Register </a></p>
            </div>
        </div>
    </div>
  )
}
