import Tab from "./Tab"
import AWB from '../img/AWB.png'
import Tracking from '../img/Tracking.png'
import Dashboard from '../img/Dashboard.png'
import PrintIcon from '../img/Print.png';

function ItemsMenu() {
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
    </div>
  )
}

export default ItemsMenu