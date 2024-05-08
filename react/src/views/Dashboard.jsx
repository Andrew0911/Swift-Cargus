import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import DashboardTable from "../components/DashboardTable";
import DashboardChart from "../components/DashboardChart";
import PropagateLoader from "react-spinners/PropagateLoader";
import axiosClient from '../axios';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const colors = ["#135a76", "orange", "green"];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
      const fetchAllRows = async () => {
          try {
              const { data: fetchedRows } = await axiosClient.get('/awb/get-awbs');
              setTableData(fetchedRows);
          } catch (error) {
              console.error('Error fetching all awbs:', error);
          }
      };
      fetchAllRows();
  }, []);

  useEffect(() => {
    const fetchAllStatuses = async () => {
        try {
            const { data: allStatuses } = await axiosClient.get('/awb/get-each-status-awb-count');
            if(allStatuses['Processed'] + allStatuses['Shipment in delivery'] + allStatuses['Delivered'] == 0){
              setChartData([]);
            } else {
              const statuses = Object.entries(allStatuses).map(([key, value], index) => ({
                  id: index,
                  value: value,
                  label: key,
                  color: colors[index]
              }));
              setChartData(statuses);
            }
        } catch (error) {
            console.error('Error fetching all statuses:', error);
        }
    };
    fetchAllStatuses();
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
              size = '30px'
              color = '#135a76'
              speedMultiplier={1.15}
            />
          </div>
        ) : (
          tableData.length > 0 ?
          (<>
            <DashboardTable rows={tableData}/>
            <DashboardChart data={chartData}/>
          </>) : 
          (
            <div className='center' style={{fontSize: '26px', color: 'var(--yellow-color)'}}>  Currently, there are no AWBs associated with your account... </div>
          )
        )}
      </div>    
    </>
  )
}
