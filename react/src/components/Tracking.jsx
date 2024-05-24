import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import axiosClient from '../axios';
import PropagateLoader from "react-spinners/PropagateLoader";

function Tracking() {
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const awbNumber = searchParams.get('awbNumber');
  const [awb, setAwb] = useState('');
  const [trackingDetails, setTrackingDetails] = useState({});
  const [statusColor, setStatusColor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    console.error('Error tracking the AWB', error);
  }
  }

  return (
    <>
      <Helmet>
        <title>Tracking</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

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
              style={{ width: '23vw', height: '4vh', fontSize: '18px' }}
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
    </>
  )
}

export default Tracking