import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import DashboardTable from "../components/DashboardTable";
import DashboardChart from "../components/DashboardChart";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate asynchronous data fetching or component rendering
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the timeout value as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <div className='page-header'>Dashboard</div>
      
      <div className='dashboard-container'>
        {isLoading ? (
          <div className='center'>
            <PropagateLoader
              size = '30'
              color = '#135a76'
              speedMultiplier={1.15}
            />
          </div>
        ) : (
          <>
            <DashboardTable/>
            <DashboardChart/>
          </>
        )}
      </div>    
    </>
  )
}
