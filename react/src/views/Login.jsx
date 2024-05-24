import '../style.scss'
import LoginBackground from '../img/FundalLogin.jpg'
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';
import ClipLoader from "react-spinners/ClipLoader";

export default function Login() {
    const {setCurrentUser, setUserToken} = useStateContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [credentialsError, setCredentialsError] = useState({__html: ''});
    const [error, setError] = useState({__html: ''});
    const [isLoading, setIsLoading] = useState(false);

    const submitLogin = async (ev) => {
        ev.preventDefault();
        setIsLoading(true);
        setError({__html: ''});
        setCredentialsError({__html: ''});
        try {
          const { data } = await axiosClient.post('/login', {
            email: email,
            password: password
          });
          setIsLoading(false);
          setCurrentUser(data.user)
          setUserToken(data.token)
        } catch (error) {
          setIsLoading(false);
          if (error.response.data.error) {
            const finalErrors = Object.values(error.response.data.error);
            setCredentialsError({__html: finalErrors});
          } else if(error.response.data.errors) {
            const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], []);
            setError({__html: finalErrors});
          }
          console.error(error);
        }
      }

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

                    <span className='logo'> 
                      <div>
                        <span>Swift</span> <span style={{color: '#ffb703'}}>Cargus</span>
                      </div>
                    </span>
                    <span className='title'>Login</span>
                    <form onSubmit={submitLogin}>
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
                        <button id="login">
                          {
                            isLoading ? 
                            <ClipLoader
                              size={20}
                              color = 'white'
                              speedMultiplier={0.5}
                            /> 
                            : 
                            'Login'
                          }
                        </button>
                    </form>

                    {credentialsError.__html && 
                    <div className = 'errors'>
                        {credentialsError.__html}
                    </div>
                    }

                    {error.__html && 
                    <div className = 'errors'>
                      {error.__html.map((errorMessage) => (
                          errorMessage.split(',').map((word, i) => (
                            <div key={i}>{word}</div> 
                          ))
                      ))}
                    </div>
                    }

                    <p>Don't have an account? <a className = 'link' href = '/register'> Register </a></p>
                </div>
            </div>
        </div>
    )
}
