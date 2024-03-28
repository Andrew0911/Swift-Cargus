import SignOut from '../img/SignOut.png'
import DefaultAvatar from '../img/DefaultAvatar.png'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';

function Header() {
  const { setCurrentUser, setUserToken } = useStateContext();

  const signOut = async (ev) => {
    ev.preventDefault();
    await axiosClient.post('/logout');
    setCurrentUser({});
    setUserToken(null);
  };

  return (
    <div className = "header">
        Swift Cargus
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