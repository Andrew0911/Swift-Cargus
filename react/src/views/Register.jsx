import '../style.scss'
import RegisterBackground from '../img/FundalRegister.jpg'
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';

function Register() {
    const {setCurrentUser, setUserToken} = useStateContext();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({__html: ''});

    const submitSignup = async (ev) => {
      ev.preventDefault();
      setError({__html: ''});
      try {
        const { data } = await axiosClient.post('/register', {
          name: displayName,
          email: email,
          password: password
        });
        setCurrentUser(data.user)
        setUserToken(data.token)
      } catch (error) {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], []);
          setError({__html: finalErrors});
        }
        console.error(error);
      }
    }
    
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

                <span className='logo'>
                  <div>
                    <span>Swift</span> <span style={{color: '#ffb703'}}>Cargus</span>
                  </div> 
                </span>
                <span className='title'>Register</span>

                <form onSubmit={submitSignup}>
                    <input 
                      type='text' 
                      placeholder='Display Name' 
                      value={displayName} 
                      onChange={ev => setDisplayName(ev.target.value)}
                    />
                    <input 
                      type='email' 
                      placeholder='E-mail'
                      value={email} 
                      onChange={ev => setEmail(ev.target.value)}
                    />
                    <input 
                      type='password' 
                      placeholder='Password'
                      value={password} 
                      onChange={ev => setPassword(ev.target.value)}
                    />
                    
                    <button>Register</button>
                </form>

                {error.__html && 
                  <div className = 'errors'>
                    {error.__html.map((errorMessage) => (
                        errorMessage.split(',').map((word, i) => (
                          <div key={i}>{word}</div> 
                        ))
                    ))}
                  </div>
                }

                <p>Already have an account? <a className = 'link' href = '/login'> Login </a></p>
            </div>
      </div>
      </div>
  )
}

export default Register
