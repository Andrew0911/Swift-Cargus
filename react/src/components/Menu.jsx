import { Outlet } from "react-router-dom"

function Menu() {
  return (
    <div className = "menu"> 
      <Outlet/>
    </div>
  )
}

export default Menu