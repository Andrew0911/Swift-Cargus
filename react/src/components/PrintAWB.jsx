import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import { useLocation } from 'react-router-dom';
import axiosClient from '../axios';
import parse from 'html-react-parser';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useReactToPrint } from "react-to-print";
import ClipLoader from "react-spinners/ClipLoader";

function PrintAWB() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const awbNumber = searchParams.get('awbNumber');
  const [awb, setAwb] = useState("");
  const [awbPrintDetails, setAwbPrintDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const contentToPrint = useRef(null);
  const [isOpeningPrintingInterface, setIsOpeningPrintingInterface] = useState(false);

  const handlePrint = useReactToPrint({
    documentTitle: "AWB",
  });

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

    setIsLoading(true); 
    ev.preventDefault();
    try {
      const { data: awbDetails } = await axiosClient.get('/awb/print-details', { params: {
        awb: awb
      }});
      setAwbPrintDetails(awbDetails);
      setIsLoading(false);
    } catch (error) {
    setIsLoading(false);
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

      {isLoading && 
        <div className='center-print'>
          <div style={{marginTop: '30vh'}}>
            <PropagateLoader
              size = '30px'
              color = '#135a76'
              speedMultiplier={1.15}
            />
          </div>
        </div>
      }

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1vw'}}>
        <div style={{fontFamily: 'Quicksand', fontSize: '21px', color: 'var(--yellow-color)'}}> AWB </div>
        <input 
          className='input-field'
          type='text'
          value={awb} 
          style={{ width: '23vw', height: '4vh', fontSize: '18px' }}
          onChange={handleInputChange} 
          maxLength="10"
        />
        
        <button className='dynamic-button' onClick={(ev) => printAWB(ev)} disabled={awb.length !== 10}> 
          Load Labels
        </button>
      </div>
      
      <br/> <br/> <br/>
      {awbPrintDetails.html ?  
        (<>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '-1vh'}}> 
            <button className='print-button' onClick={() => {
              setIsOpeningPrintingInterface(true);
              handlePrint(null, () => contentToPrint.current);
              setTimeout(() => {
                setIsOpeningPrintingInterface(false);
              }, 1500);
            }}
            >
              {isOpeningPrintingInterface ?
                <div style={{marginTop: '5px'}}> 
                  <ClipLoader
                    color = '#ffb703'
                    speedMultiplier={0.5}
                    size={30}
                  /> 
                </div>
                :
                'Open Printing Interface'
              }
            </button>
          </div>

          <div ref={contentToPrint}> {parse(awbPrintDetails.html)} </div>
        </>) :
        (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}> 
            <img src={SwiftCargusLogo} style={{ width: '27.5vw', height: '55vh', zIndex: '-9999', opacity: 0.2}}></img> 
          </div>
        )
      }
    </>
  )
}

export default PrintAWB