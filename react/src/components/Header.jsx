import SignOut from '../img/SignOut.png'
import DefaultAvatar from '../img/DefaultAvatar.png'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';
import { useNavigate } from 'react-router-dom';
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'

function Header() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const navigate = useNavigate();

  const signOut = async (ev) => {
    ev.preventDefault();
    await axiosClient.post('/logout');
    setCurrentUser({});
    setUserToken(null);
    localStorage.clear();
  };

  const goToProfile = () => {
    navigate('/profile');
  }

  return (
    <div className = "header">
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <img src={SwiftCargusLogo} style={{ width: '30px', height: '30px'}}></img> 
          <span>Swift</span> <span style={{color: '#ffb703'}}>Cargus</span>
        </div>
        <div className = 'buttons'>
            <img 
              src = {DefaultAvatar} 
              alt = ''
              onClick={goToProfile}
              title="Profile"
            />
            <img
              src = {SignOut}
              alt = '' 
              onClick={(ev) => signOut(ev)} 
              title="Sign Out"
            /> 
        </div>
    </div>
  )
}

export default Header