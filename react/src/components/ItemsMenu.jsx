import Tab from "./Tab"
import AWB from '../img/AWB.png'
import Tracking from '../img/Tracking.png'
import Dashboard from '../img/Dashboard.png'
import PrintIcon from '../img/Print.png';
import AdminIcon from '../img/Admin.png';
import { useState } from "react";

function ItemsMenu() {

  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));

  return (
    <div className = "itemsMenu">
        <Tab 
          logo = {Dashboard} 
          title = 'Dashboard'
        />
        <Tab 
          logo = {AWB} 
          title = 'AWB'
        />
        <Tab 
          logo = {Tracking} 
          title = 'Tracking'
        />
        <Tab 
          logo = {PrintIcon} 
          title = 'Print'
        />
        {isAdmin === 'true' &&
          <Tab 
            logo = {AdminIcon} 
            title = 'Admin'
          />
        }
    </div>
  )
}

export default ItemsMenu