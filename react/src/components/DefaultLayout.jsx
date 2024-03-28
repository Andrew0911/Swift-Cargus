import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import ItemsMenu from "./ItemsMenu";
import Menu from "./Menu";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const {currentUser, userToken} = useStateContext();

    if(!userToken) {
        return <Navigate to='/login'/>
    }

  return (
    <div>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />

      <div className = "container">
        <Header />
        <div className = "menu-container">
          <ItemsMenu/>
          <Menu>  
            <Outlet/>
          </Menu>
        </div>
      </div>
    </div>
  )
}
