import Tab from "./Tab"
import AWB from '../img/AWB.png'
import Tracking from '../img/Tracking.png'
import Dashboard from '../img/Dashboard.png'


function ItemsMenu() {
  return (
    <div className = "itemsMenu">
        <Tab logo = {Dashboard} title = 'Dashboard'/>
        <Tab logo = {AWB} title = 'AWB'/>
        <Tab logo = {Tracking} title = 'Tracking'/>
    </div>
  )
}

export default ItemsMenu