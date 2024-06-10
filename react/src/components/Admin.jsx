import React, { useEffect, useState } from 'react'
import GaugeComponent from 'react-gauge-component'
import { Helmet } from 'react-helmet';
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import axiosClient from '../axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import Checkbox from '@mui/material/Checkbox';

function Admin() {

  const [currentMonthAwbCount, setCurrentMonthAwbCount] = useState(0);
  const [currentMonthAwbValue, setCurrentMonthAwbValue] = useState(0);
  const [currentMonthpackagesDelivered, setCurrentMonthpackagesDelivered] = useState(0);
  const [currentYearAWBs, setCurrentYearAWBs] = useState({});
  const [awb, setAwb] = useState('');
  const [awbDetails, setAwbDetails] = useState({});
  const [statusColor, setStatusColor] = useState('');
  const [isSearchingAwb, setIsSearchingAwb] = useState(false);
  const [isUpdatingAwbStatus, setIsUpdatingAwbStatus] = useState(false);
  const [awbErrors, setAwbErrors] = useState({});
  const [awbStatusUpdateErrors, setAwbStatusUpdateErrors] = useState({});
  const [availableStatuses, setAvailableStatuses] = useState([]);
  const [selectedStatusId, setSelectedStatusId] = useState(0);
  const [refetchCurrentMonthAwbs, setRefetchCurrentMonthAwbs] = useState(false);

  const awbsPerMonthTarget = '200';
  const incomePerMonthTarget = '8000'
  const packagesDeliveredPerMonthTarget = '500'

  // Effect to fetch awbs generated this month
  useEffect(() => {
    const fetchAwbsForThisMonth = async () => {
      try {
        const { data: awbsForThisMonth } = await axiosClient.get('/admin/current-month-awbs');
        setCurrentMonthAwbCount(awbsForThisMonth.awbs);
        setCurrentMonthAwbValue(awbsForThisMonth.totalValue);
        setCurrentMonthpackagesDelivered(awbsForThisMonth.packagesDelivered);
      } catch (error) {
        console.error('Error fetching current month AWBs: ', error);
      }
    };
    fetchAwbsForThisMonth();
  }, [refetchCurrentMonthAwbs]);

  // Effect to fetch awbs generated this year
  useEffect(() => {
    const fetchAwbsForThisYear = async () => {
      try {
        const { data: awbsForThisYear } = await axiosClient.get('/admin/current-year-awbs');
        setCurrentYearAWBs(awbsForThisYear);
      } catch (error) {
        console.error('Error fetching current year AWBs: ', error);
      }
    };
    fetchAwbsForThisYear();
  }, []);

  // check for AWB input
  const handleInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    value = value.replace(/^0+/, '');
    if (value === '' || value === '0') {
      value = '0';
    }
    event.target.value = value;
    setAwb(value);
  };

  // function to search fo AWB
  const searchForAWB = async (ev) => {

    setIsSearchingAwb(true); 
    setAwbErrors({});
    setAwbStatusUpdateErrors({});
    setAwbDetails({});
    setAvailableStatuses([]);
    ev.preventDefault();
    try {
      const { data: awbDetails } = await axiosClient.get('/admin/awb-details', { params: {
        awb: awb
      }});
      setAwbDetails(awbDetails);
      setIsSearchingAwb(false);

      if(awbDetails.statusName == 'Processed'){
        setStatusColor('#135a76');
      } else if(awbDetails.statusName == 'Shipment in delivery'){
        setStatusColor('orange');
      } else {
        setStatusColor('green');
      }

      // fetch available statuses if the AWB is not delivered
      if(awbDetails.statusId != 4){
        try {
          const { data: availableStatusesArray } = await axiosClient.get('/admin/available-statuses-for-update', {
            params: {
              statusId: awbDetails.statusId 
            }
          });
          setAvailableStatuses(availableStatusesArray);
        } catch (error) {
          console.error('Error fetching available statuses for update : ', error);
        }
      }
    } catch (error) {
      setIsSearchingAwb(false);
      console.error('Error searching the AWB', error);

      if(error.response.data.errors) {
        const finalErrors = error.response.data.errors;
        setAwbErrors(finalErrors);
      }
  }
  }

  // function to toast error message
  const toastError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        height: '10vh',
        width: '20vw',
        marginLeft: '-4vw',
        paddingLeft: '1vw',
        fontFamily: 'Quicksand, sans serif',
        fontSize: '19px'
      }
    });
  }

  // effect for showing AWB search errors
  useEffect(() => {
    if(Object.keys(awbErrors).length > 0) {
      toastError(awbErrors.awb[0]);
    } 
  }, [awbErrors]);

  // effect for showing AWB status update errors
  useEffect(() => {
    if(Object.keys(awbStatusUpdateErrors).length > 0) {
      if(awbStatusUpdateErrors.statusId[0]){
        toastError('Please select a status in order to update the AWB.')
      }
    } 
  }, [awbStatusUpdateErrors]);

  //function to update the AWB status
  const updateAwbStatus = async (ev) => {
    setAwbErrors({});
    setAwbStatusUpdateErrors({});
    setIsUpdatingAwbStatus(true); 
    ev.preventDefault();
    try {
      const { data: data } = await axiosClient.post('/admin/update-awb-status', {
        awb: awb,
        statusId: selectedStatusId
      });
      setIsUpdatingAwbStatus(false); 
      setAwbDetails({});
      setAvailableStatuses([]);
      setAwb('');

      if(data.message === 'success'){
        toast.success('AWB status updated successfully.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            height: '10vh',
            width: '20vw',
            marginLeft: '-4vw',
            paddingLeft: '1vw',
            fontFamily: 'Quicksand, sans serif',
            fontSize: '19px'
          }
        });
        setRefetchCurrentMonthAwbs(!refetchCurrentMonthAwbs);
      }

    } catch (error) {
      setIsUpdatingAwbStatus(false); 
      console.error('Error updating AWB status :', error);

      if(error.response.data.errors) {
        const finalErrors = error.response.data.errors;
        setAwbStatusUpdateErrors(finalErrors);
      }
    }
  }
  
  return (
    <>
      <Helmet>
          <title>Admin</title>
          <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <ToastContainer/>

      <div className='gaugesContainer'>
        
        {/* Gauge for this month's AWB target */}
        <div className='gauge'>
          <div className='gauge-title'> This month's AWBs </div>
          <GaugeComponent 
            className='gauge-component-class'
            value={currentMonthAwbCount}
            maxValue={awbsPerMonthTarget}
            arc={{
              colorArray: ['red', '#135a76', 'var(--yellow-color)', 'green'],
              subArcs: [
                { 
                  limit: awbsPerMonthTarget / 4,
                  tooltip: { 
                    text: 'Very Low',
                    style: {fontFamily: 'Quicksand'}
                  }, 
                  showTick: true 
                },
                { 
                  limit: 2 * awbsPerMonthTarget / 4,
                  tooltip: { 
                    text: 'Low',
                    style: {fontFamily: 'Quicksand'}
                  }, 
                  showTick: true 
                },
                { 
                  limit: 3 * awbsPerMonthTarget / 4, 
                  tooltip: {
                    text: 'Medium',
                    style: {fontFamily: 'Quicksand'}
                  },
                  showTick: true
                },
                { 
                  limit: awbsPerMonthTarget,
                  tooltip: {
                    text: 'Good',
                    style: {fontFamily: 'Quicksand'}
                  }
                },
              ]
            }}
            pointer={{elastic: true}}
            labels={{
              valueLabel: {
                style: {
                  fill: '#135a76',
                  textShadow: 'none',
                  fontSize: '40px'
                }
              },
              tickLabels: {
                defaultTickValueConfig: {
                  style: {
                    fontSize: "16px"
                  }
                }
              }
            }}
          />
        </div>

        {/* Gauge for this month's income target */}
        <div className='gauge'>
          <div className='gauge-title'> This month's income (RON) </div>
          <GaugeComponent 
            className='gauge-component-class'
            value={currentMonthAwbValue}
            maxValue={incomePerMonthTarget}
            arc={{
              colorArray: ['red', '#135a76', 'var(--yellow-color)', 'green'],
              subArcs: [
                { 
                  limit: incomePerMonthTarget / 4,
                  tooltip: { 
                    text: 'Very Low',
                    style: {fontFamily: 'Quicksand'}
                  }, 
                  showTick: true 
                },
                { 
                  limit: 2 * incomePerMonthTarget / 4,
                  tooltip: { 
                    text: 'Low',
                    style: {fontFamily: 'Quicksand'}
                  }, 
                  showTick: true 
                },
                { 
                  limit: 3 * incomePerMonthTarget / 4, 
                  tooltip: {
                    text: 'Medium',
                    style: {fontFamily: 'Quicksand'}
                  },
                  showTick: true
                },
                { 
                  limit: incomePerMonthTarget,
                  tooltip: {
                    text: 'Good',
                    style: {fontFamily: 'Quicksand'}
                  }
                },
              ]
            }}
            pointer={{elastic: true}}
            labels={{
              valueLabel: {
                style: {
                  fill: '#135a76',
                  textShadow: 'none',
                  fontSize: '40px'
                }
              },
              tickLabels: {
                defaultTickValueConfig: {
                  style: {
                    fontSize: "16px"
                  }
                }
              }
            }}
          />
        </div>

        {/* Gauge for this month's packages delivered */}
        <div className='gauge'>
          <div className='gauge-title'> This month's packages delivered </div>
          <GaugeComponent 
            className='gauge-component-class'
            value={currentMonthpackagesDelivered}
            maxValue={packagesDeliveredPerMonthTarget}
            arc={{
              colorArray: ['red', '#135a76', 'var(--yellow-color)', 'green'],
              subArcs: [
                { 
                  limit: packagesDeliveredPerMonthTarget / 4,
                  tooltip: { 
                    text: 'Very Low',
                    style: {fontFamily: 'Quicksand'}
                  }, 
                  showTick: true 
                },
                { 
                  limit: 2 * packagesDeliveredPerMonthTarget / 4,
                  tooltip: { 
                    text: 'Low',
                    style: {fontFamily: 'Quicksand'}
                  }, 
                  showTick: true 
                },
                { 
                  limit: 3 * packagesDeliveredPerMonthTarget / 4, 
                  tooltip: {
                    text: 'Medium',
                    style: {fontFamily: 'Quicksand'}
                  },
                  showTick: true
                },
                { 
                  limit: packagesDeliveredPerMonthTarget,
                  tooltip: {
                    text: 'Good',
                    style: {fontFamily: 'Quicksand'}
                  }
                },
              ]
            }}
            pointer={{elastic: true}}
            labels={{
              valueLabel: {
                style: {
                  fill: '#135a76',
                  textShadow: 'none',
                  fontSize: '40px'
                }
              },
              tickLabels: {
                defaultTickValueConfig: {
                  style: {
                    fontSize: "16px"
                  }
                }
              }
            }}
          />
        </div>
        
      </div>

      <div className='bottom-container'>

        {/* Update AWB status */}
        <div className='small-bottom-container' style={{alignItems: ''}}> 
          <div className='gauge-title'> Update AWB status </div> <br/>
          <div className='search'>  
            <div style={{fontFamily: 'Quicksand', fontSize: '21px', color: '#135a76'}}> AWB </div>
            <input 
              className='input-field'
              type='text'
              value={awb} 
              style={{ width: '23vw', height: '4vh', fontSize: '18px', borderColor: awbErrors.awb ? 'red' : '' }}
              onChange={handleInputChange} 
              maxLength="10"
            />
              
            <button className='dynamic-button' onClick={(ev) => searchForAWB(ev)} disabled={awb.length !== 10}> 
              {
                isSearchingAwb ? 
                <div style={{marginTop: '5px'}}> 
                <ClipLoader
                  color = 'white'
                  speedMultiplier={0.5}
                  size={25}
                /> 
                </div>
                :
                'Search'
              }
            </button>
          </div>
          <br/>
          {awbDetails.statusId && 
            <>
              <div style={{fontSize: '22px', color: 'var(--yellow-color)'}}> Current status : &nbsp; 
                <span style={{color: statusColor}}> {awbDetails.statusName} </span> 
              </div>
              <br/> <br/>
            </>
          }

          {availableStatuses.length > 0 && 
            <>
              <div className='available-statuses-container'> 
                {availableStatuses.map((status, index) => (
                  <div key={status.StatusId} className='status-container'>
                    {status.Name} 
                    &nbsp;
                    <Checkbox
                      checked={selectedStatusId === status.StatusId}
                      onChange={(ev) => { 
                        setSelectedStatusId(prevId => prevId === status.StatusId ? 0 : status.StatusId);
                      }}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: "#135a76" } }}
                    /> 
                  </div>
                ))}
              </div>

              <br/> <br/>

              <button className='dynamic-button' onClick={(ev) => updateAwbStatus(ev)}> 
              {
                isUpdatingAwbStatus ? 
                <div style={{marginTop: '5px'}}> 
                  <ClipLoader
                    color = 'white'
                    speedMultiplier={0.5}
                    size={25}
                  /> 
                </div>
                :
                'Update' 
              }
              </button>
            </>
          }
          
        </div> 

        {/* Graph for current year AWBs */}
        <div className='small-bottom-container'> 
          <div className='gauge-title'> This year's AWBs </div> <br/>
          <Box sx={{ flexGrow: 1, fontFamily: "Quicksand" }}>
            <LineChart width={770} height={300} data={currentYearAWBs} style={{ marginRight: '1vw', paddingRight: '1vw' }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line type="monotone" dataKey="count" stroke="#135a76" />
            </LineChart>
          </Box>
        </div> 

      </div>
    </>
  );
}

export default Admin