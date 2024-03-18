import SignOut from '../img/SignOut.png'
import DefaultAvatar from '../img/DefaultAvatar.png'

function Header() {
  return (
    <div className = "header">
        Swift Cargus
        <div className = 'buttons'>
            <img src = {DefaultAvatar} alt = ''/>
            <img src = {SignOut} alt = ''/> 
        </div>
    </div>
  )
}

export default Header