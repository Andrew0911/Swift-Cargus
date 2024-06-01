import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import GoogleMapsIcon from '../img/GoogleMapsIcon.png'
import WazeIcon from '../img/WazeIcon.png'
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import axiosClient from '../axios';
import PropagateLoader from "react-spinners/PropagateLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tracking() {
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const awbNumber = searchParams.get('awbNumber');
  const [awb, setAwb] = useState('');
  const [trackingDetails, setTrackingDetails] = useState({});
  const [statusColor, setStatusColor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [awbTrackingErrors, setAwbTrackingErrors] = useState({});

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

  const trackAWB = async (ev) => {

    setIsLoading(true); 
    setAwbTrackingErrors({});
    setTrackingDetails({});
    ev.preventDefault();
    try {
      const { data: awbDetails } = await axiosClient.get('/awb/tracking-details', { params: {
        awb: awb
      }});
      setTrackingDetails(awbDetails);
      setIsLoading(false);

      if(awbDetails.status == 'Processed'){
        setStatusColor('#135a76');
      } else if(awbDetails.status == 'Shipment in delivery'){
        setStatusColor('orange');
      } else {
        setStatusColor('green');
      }

    } catch (error) {
      setIsLoading(false);
      console.error('Error tracking the AWB', error);

      if(error.response.data.errors) {
        const finalErrors = error.response.data.errors;
        setAwbTrackingErrors(finalErrors);
      }
  }
  }

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

  useEffect(() => {

    if(Object.keys(awbTrackingErrors).length > 0) {
      toastError(awbTrackingErrors.awb[0]);
    } else {
      if(trackingDetails.message){
        toastError(trackingDetails.message);
      }
    }

  }, [awbTrackingErrors, trackingDetails]);

  return (
    <>
      <Helmet>
        <title>Tracking</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <ToastContainer/>

      <div className='page-header'>AWB Tracking</div>
      <br/> <br/> <br/>

      {isLoading && 
        <div className='center-tracking'>
          <PropagateLoader
            size = '30px'
            color = '#135a76'
            speedMultiplier={1.15}
          />
        </div>
      }

      <div style={{display: 'flex', gap: '3vw'}}>
        <div className='search-and-map-container'> 
          <div className='search'>  
            <div style={{fontFamily: 'Quicksand', fontSize: '21px', color: 'var(--yellow-color)'}}> AWB </div>
            <input 
              className='input-field'
              type='text'
              value={awb} 
              style={{ width: '23vw', height: '4vh', fontSize: '18px', borderColor: awbTrackingErrors.awb || trackingDetails.message ? 'red' : '' }}
              onChange={handleInputChange} 
              maxLength="10"
            />
              
            <button className='dynamic-button' onClick={(ev) => trackAWB(ev)} disabled={awb.length !== 10}> 
              Track
            </button>
          </div>
          
          <MapContainer center={[45.8422222, 24.97138888888889]} zoom={7} scrollWheelZoom={true} style={{height: '63vh', width: '50vw'}}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* // Sender Marker */}
            {trackingDetails.senderLatitude > 0 && trackingDetails.senderLongitude > 0 && 
              <Marker position={[trackingDetails.senderLatitude, trackingDetails.senderLongitude]}>
                <Popup>
                  <div style={{ fontFamily: 'Quicksand', fontSize: '15px', fontWeight: '450' }}>
                    <span style={{ color: 'var(--yellow-color)' }}> Sender Address </span>
                    <br />
                    {trackingDetails.senderAddress}
                  </div>
                </Popup>
              </Marker>
            }

            {/* // Reipient Marker */}
            {trackingDetails.recipientLatitude > 0 && trackingDetails.recipientLongitude > 0 && 
              <Marker position={[trackingDetails.recipientLatitude, trackingDetails.recipientLongitude]}>
                <Popup>
                  <div style={{ fontFamily: 'Quicksand', fontSize: '15px', fontWeight: '450' }}>
                    <span style={{color: '#135a76'}}> Recipient Address </span>
                    <br /> 
                    {trackingDetails.recipientAddress} 
                  </div>
                </Popup>
              </Marker>
            }

          </MapContainer>
        </div>


        <div className='tracking-details-container'>  

          <div className='sender-section'> 
            <div className='sender-title'> Shipment Takeover </div>
            <div className='sender-content'> 
              <div> <span style={{color: 'var(--yellow-color)', fontWeight: '550'}}> Sender Name : </span> &nbsp; {trackingDetails.senderName ?? '-'}</div> 
              <div> <span style={{color: 'var(--yellow-color)', fontWeight: '550'}}> Sender Phone : </span> &nbsp; {trackingDetails.senderPhone ?? '-'}</div> 
              <div> <span style={{color: 'var(--yellow-color)', fontWeight: '550'}}> Sender Email : </span> &nbsp; {trackingDetails.senderEmail ?? '-'}</div> 
              <div> <span style={{color: 'var(--yellow-color)', fontWeight: '550'}}> Sender Address : </span> &nbsp; {trackingDetails.senderAddress ?? '-'}</div> 
            </div>
          </div>

          <div className='recipient-section'> 
            <div className='recipient-title'> Shipment Destination </div>
            <div className='recipient-content'>  
              <div> <span style={{color: '#135a76', fontWeight: '550'}}> Recipient Name : </span> &nbsp; {trackingDetails.recipientName ?? '-'}</div> 
              <div> <span style={{color: '#135a76', fontWeight: '550'}}> Recipient Phone : </span> &nbsp; {trackingDetails.recipientPhone ?? '-'}</div> 
              <div> <span style={{color: '#135a76', fontWeight: '550'}}> Recipient Email : </span> &nbsp; {trackingDetails.recipientEmail ?? '-'}</div> 
              <div> <span style={{color: '#135a76', fontWeight: '550'}}> Recipient Address : </span> &nbsp; {trackingDetails.recipientAddress ?? '-'}</div> 
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3vh', fontSize: '26px'}}> 
            <span style={{color: 'var(--yellow-color)'}}> Last registered status : </span> &nbsp; &nbsp;

            {trackingDetails.status ? <span style={{color: statusColor}}> {trackingDetails.status} </span> : '-'} 
          </div>

        </div>
      </div>

      {
        trackingDetails.senderLatitude > 0 && 
        trackingDetails.senderLongitude > 0 && 
        trackingDetails.recipientLatitude > 0 && 
        trackingDetails.recipientLongitude > 0 && 

        <>
          <div style={{position: 'absolute', bottom: '7vh', left: '10vw', zIndex: '99999999'}}>
            <a href={
                'https://www.google.com/maps/dir/' + 
                trackingDetails.senderLatitude + ',' + trackingDetails.senderLongitude + '/' + 
                trackingDetails.recipientLatitude + ',' + trackingDetails.recipientLongitude + '/'
              } target="_blank">
              <img height='75px' width='75px' src={GoogleMapsIcon}/> 
            </a>
          </div>

          <div style={{position: 'absolute', bottom: '8vh', left: '14.5vw', zIndex: '99999999'}}>
            <a href={
                'https://www.waze.com/ul?ll=' + 
                trackingDetails.recipientLatitude + ',' + trackingDetails.recipientLongitude + '&navigate=yes&from=' +
                trackingDetails.senderLatitude + ',' + trackingDetails.senderLongitude 
              } target="_blank">
              <img height='60px' width='60px' src={WazeIcon} style={{borderRadius: '7px'}}/> 
            </a>
          </div>
        </>
      }
    </>
  )
}

export default Tracking