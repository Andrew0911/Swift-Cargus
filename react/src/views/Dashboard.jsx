import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import DashboardTable from "../components/DashboardTable";

export default function Dashboard() {

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <div className='page-header'>Dashboard</div>
      
      <div className='dashboard-container'>
        <DashboardTable/>
      </div>    
        
    </>
  )
}
