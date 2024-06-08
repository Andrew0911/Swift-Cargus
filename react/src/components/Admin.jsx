import React, { useEffect, useState } from 'react'
import GaugeComponent from 'react-gauge-component'
import { Helmet } from 'react-helmet';
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import axiosClient from '../axios';

function Admin() {

  const [currentMonthAwbCount, setCurrentMonthAwbCount] = useState(0);
  const [currentMonthAwbValue, setCurrentMonthAwbValue] = useState(0);

  const awbsPerMonthTarget = '100';
  const incomePerMonthTarget = '2000'

  // Effect to fetch awbs generated this month
  useEffect(() => {
    const fetchAwbsForThisMonth = async () => {
      try {
        const { data: awbsForThisMonth } = await axiosClient.get('/admin/current-month-awbs');
        setCurrentMonthAwbCount(awbsForThisMonth.awbs);
        setCurrentMonthAwbValue(awbsForThisMonth.totalValue);
      } catch (error) {
        console.error('Error fetching current month AWBs: ', error);
      }
    };
    fetchAwbsForThisMonth();
  }, []);

  return (
    <>
      <Helmet>
          <title>Admin</title>
          <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <div className='gaugesContainer'>

        <div className='gauge'>
          <div className='gauge-title'> This month's AWB target </div>
          <GaugeComponent 
            style={{width: '20vw'}}
            value={currentMonthAwbCount}
            maxValue={awbsPerMonthTarget}
            arc={{
                colorArray: ['red', '#135a76', 'var(--yellow-color)', 'green'],
                subArcs: [
                    { limit: awbsPerMonthTarget / 4, tooltip: { text: 'Very Low', style: {fontFamily: 'Quicksand'}}, showTick: true },
                    { limit: 2 * awbsPerMonthTarget / 4, tooltip: { text: 'Low', style: {fontFamily: 'Quicksand'}}, showTick: true },
                    { limit: 3 * awbsPerMonthTarget / 4,  tooltip: { text: 'Medium', style: {fontFamily: 'Quicksand'}}, showTick: true},
                    { limit: awbsPerMonthTarget, tooltip: { text: 'Good', style: {fontFamily: 'Quicksand'}}},
                  ]
            }}
            />
        </div>

        <div className='gauge'>
          <div className='gauge-title'> This month's income target </div>
          <GaugeComponent 
            style={{width: '20vw'}}
            value={currentMonthAwbValue}
            maxValue={incomePerMonthTarget}
            arc={{
                colorArray: ['red', '#135a76', 'var(--yellow-color)', 'green'],
                subArcs: [
                    { limit: incomePerMonthTarget / 4, tooltip: { text: 'Very Low', style: {fontFamily: 'Quicksand'}}, showTick: true },
                    { limit: 2 * incomePerMonthTarget / 4, tooltip: { text: 'Low', style: {fontFamily: 'Quicksand'}}, showTick: true },
                    { limit: 3 * incomePerMonthTarget / 4,  tooltip: { text: 'Medium', style: {fontFamily: 'Quicksand'}}, showTick: true},
                    { limit: incomePerMonthTarget, tooltip: { text: 'Good', style: {fontFamily: 'Quicksand'}}},
                  ]
            }}
            />
           
        </div>

        <div className='gauge'>
          {/* <div className='gauge-title'> Target Number of AWBs </div> */}
          
        </div>
        
      </div>
    </>
  );
}

export default Admin