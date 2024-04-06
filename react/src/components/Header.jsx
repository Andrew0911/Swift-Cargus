import SignOut from '../img/SignOut.png'
import DefaultAvatar from '../img/DefaultAvatar.png'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';
import router from '../router';

function Header() {
  const { setCurrentUser, setUserToken } = useStateContext();

  const signOut = async (ev) => {
    ev.preventDefault();
    await axiosClient.post('/logout');
    setCurrentUser({});
    setUserToken(null);
    localStorage.removeItem('selectedTab');
  };

  return (
    <div className = "header">
        <div>
          <span>Swift</span> <span style={{color: '#ffb703'}}>Cargus</span>
        </div>
        <div className = 'buttons'>
            <img 
              src = {DefaultAvatar} 
              alt = ''
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