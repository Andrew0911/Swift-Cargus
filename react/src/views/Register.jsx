import '../style.scss'
import AddPicture from '../img/AddPicture.png'
import RegisterBackground from '../img/FundalRegister.jpg'
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import { Helmet } from 'react-helmet';

function Register() {

  return (
    <div>
      <Helmet>
        <title>Register</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />

      <div className='formContainer' style={{ backgroundImage: `url(${RegisterBackground})`}}>

            <div className='formWrapper'>

                <span className='logo'> Swift Cargus </span>
                <span className='title'>Register</span>

                <form>
                    <input type='text' placeholder='Display Name'></input>
                    <input type='email' placeholder='E-mail'></input>
                    <input type='password' placeholder='Password'></input>
                    <input type='file' id='file' style={{ display: 'none' }} />
                    <label htmlFor='file'>
                        <img src ={AddPicture} alt=''></img>
                        <span> Add a profile picture</span>
                    </label>
                    <button>Register</button>
                </form>
                
                <p>Already have an account? <a href = '/login'> Login </a></p>
            </div>
      </div>
      </div>
  )
}

export default Register
