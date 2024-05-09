import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import { useLocation } from 'react-router-dom';
import axiosClient from '../axios';
import parse from 'html-react-parser';

function PrintAWB() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const awbNumber = searchParams.get('awbNumber');
  const [awb, setAwb] = useState("");
  const [awbPrintDetails, setAwbPrintDetails] = useState({});

  useEffect(() => {
    const updateAwb = async () => {
      if(awbNumber){
        setAwb(awbNumber);
      }
    };
    updateAwb();
  }, []);

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

  const printAWB = async (ev) => {
    ev.preventDefault();
    try {
      const { data: awbDetails } = await axiosClient.get('/awb/print-details', { params: {
        awb: awb
      }});
      setAwbPrintDetails(awbDetails);
    } catch (error) {
    console.error('Error printing the AWB', error);
  }
  }

  return (
    <>
      <Helmet>
        <title>Print</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <div className='page-header'>AWB Print</div>
      <br/> <br/> <br/>

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1vw'}}>
        <div style={{fontFamily: 'Quicksand', fontSize: '21px', color: 'var(--yellow-color)'}}> AWB Number </div>
        <input 
          className='input-field'
          type='text'
          value={awb} 
          style={{ width: '23vw', height: '4vh', fontSize: '18px' }}
          onChange={handleInputChange} 
          maxLength="10"
        />
        
        <button className='dynamic-button' onClick={(ev) => printAWB(ev)} disabled={awb.length !== 10}> 
          Print
        </button>
      </div>
      
      <br/> <br/> <br/> <br/>
      {awbPrintDetails.html && 
        parse(awbPrintDetails.html)
      }
    </>
  )
}

export default PrintAWB