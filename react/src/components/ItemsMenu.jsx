import Tab from "./Tab"
import AWB from '../img/AWB.png'
import Tracking from '../img/Tracking.png'
import Dashboard from '../img/Dashboard.png'
import { useEffect, useState } from "react";


function ItemsMenu() {
  const [selectedTab, setSelectedTab] = useState(() => {
    return localStorage.getItem('selectedTab') || 'Dashboard';
  });

  useEffect(() => {
    localStorage.setItem('selectedTab', selectedTab);
  }, [selectedTab]);

  const handleTabClick = (title) => {
    setSelectedTab(title);
  };
  return (
    <div className = "itemsMenu">
        <Tab 
          logo = {Dashboard} 
          title = 'Dashboard'
          selected={selectedTab === 'Dashboard'}
          onClick={() => handleTabClick('Dashboard')}
        />
        <Tab 
          logo = {AWB} 
          title = 'AWB'
          selected={selectedTab === 'AWB'}
          onClick={() => handleTabClick('AWB')}
        />
        <Tab 
          logo = {Tracking} 
          title = 'Tracking'
          selected={selectedTab === 'Tracking'}
          onClick={() => handleTabClick('Tracking')}
        />
    </div>
  )
}

export default ItemsMenu