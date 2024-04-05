import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import Field from './Field';
import { Dropdown } from './Dropdown.jsx';
import axiosClient from '../axios.js';

function AWB() {

  const [senderName, setSenderName] = useState('');
  const [senderContactPerson, setSenderContactPerson] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderCounty, setSenderCounty] = useState('');
  const [senderLocality, setSenderLocality] = useState('');
  const [senderStreet, setSenderStreet] = useState('');
  const [senderZipCode, setSenderZipCode] = useState('');
  
  const [recipientName, setRecipientName] = useState('');
  const [recipientContactPerson, setRecipientContactPerson] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientCounty, setRecipientCounty] = useState('');
  const [recipientLocality, setRecipientLocality] = useState('');
  const [recipientStreet, setRecipientStreet] = useState('');
  const [recipientZipCode, setRecipientZipCode] = useState('');

  const [allCounties, setAllCounties] = useState([]);
  const [allSenderLocalities, setAllSenderLocalities] = useState([]);
  const [allRecipientLocalities, setAllRecipientLocalities] = useState([]);

  // Effect to fetch all counties once
  useEffect(() => {
    const fetchAllCounties = async () => {
      try {
        const { data: countiesData } = await axiosClient.get('/all-counties');
        setAllCounties(countiesData);
      } catch (error) {
        console.error('Error fetching all counties:', error);
      }
    };

    fetchAllCounties();
  }, []);

  // Get sender localities when senderCounty changes
  useEffect(() => {
    setSenderLocality('');
    const fetchSenderLocalities = async () => {
      if (!senderCounty) return; 

      try {
        const senderCountyObj = allCounties.find(county => county.Name === senderCounty);
        if (!senderCountyObj) return; 

        const senderCountyId = senderCountyObj.CountyId;
        const { data: senderLocalitiesData } = await axiosClient.get('/all-localities-by-county', {
          params: { countyId: senderCountyId }
        });
        setAllSenderLocalities(senderLocalitiesData);
      } catch (error) {
        console.error('Error fetching sender localities:', error);
      }
    };

    fetchSenderLocalities();
  }, [senderCounty]); 

    // Get recipient localities when recipientCounty changes
    useEffect(() => {
      setRecipientLocality('');
      const fetchRecipientLocalities = async () => {
        if (!recipientCounty) return;
  
        try {
          const recipientCountyObj = allCounties.find(county => county.Name === recipientCounty);
          if (!recipientCountyObj) return;
  
          const recipientCountyId = recipientCountyObj.CountyId;
          const { data: recipientLocalitiesData } = await axiosClient.get('/all-localities-by-county', {
            params: { countyId: recipientCountyId }
          });
          setAllRecipientLocalities(recipientLocalitiesData);
        } catch (error) {
          console.error('Error fetching recipient localities:', error);
        }
      };
  
      fetchRecipientLocalities();
    }, [recipientCounty]); // Run when senderCounty or allCounties changes

  const submitAWB = async (ev) => {
    ev.preventDefault();
  }

  return (
    <>
      <Helmet>
        <title>AWB</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <div className='page-header'>AWB Generation</div>

      <form onSubmit={submitAWB}>
        <div className='awb-container'>
          <div className='person-container'>

            <div className='header-div'> Sender Information </div>
            
            <div className='heading'> Contact </div>
            <div className='details-div'>
            
              <Field
                aboveFieldText = 'Name'
                fieldText = {senderName}
                setFieldText = {setSenderName}
                type = 'text'
              />
              <Field
                aboveFieldText = 'Contact Person'
                fieldText = {senderContactPerson}
                setFieldText = {setSenderContactPerson}
                type = 'text'
              /> 
              <Field
                aboveFieldText = 'Email'
                fieldText = {senderEmail}
                setFieldText = {setSenderEmail}
                type = 'email'
              />
              <Field
                aboveFieldText = 'Phone'
                fieldText = {senderPhone}
                setFieldText = {setSenderPhone}
                type = 'text'
              />
            </div>

            <div className='heading'> Address Details </div>
            <div className='details-div'>

              <Dropdown
                aboveFieldText='County*'
                fieldText = {senderCounty}
                setFieldText = {setSenderCounty}
                menu={allCounties.map(county => county.Name)}
              />
              <Dropdown
                aboveFieldText='Locality*'
                fieldText = {senderLocality}
                setFieldText = {setSenderLocality}
                menu={senderCounty ? (allSenderLocalities.map(locality => locality.Name)) : ['No locality available']}
              />
              <Field
                aboveFieldText = 'Street'
                fieldText = {senderStreet}
                setFieldText = {setSenderStreet}
                type = 'text'
              />
              <Field
                aboveFieldText = 'Zip Code'
                fieldText = {senderZipCode}
                setFieldText = {setSenderZipCode}
                type = 'text'
              />
            </div>
          </div>

          <div className='person-container'>
            
            <div className='header-div'> Recipient Information </div>
            
            <div className='heading'> Contact </div>
            <div className='details-div'>
              
              <Field
                aboveFieldText = 'Name'
                fieldText = {recipientName}
                setFieldText = {setRecipientName}
                type = 'text'
              />
              <Field
                aboveFieldText = 'Contact Person'
                fieldText = {recipientContactPerson}
                setFieldText = {setRecipientContactPerson}
                type = 'text'
              />
              <Field
                aboveFieldText = 'Email'
                fieldText = {recipientEmail}
                setFieldText = {setRecipientEmail}
                type = 'email'
              />
              <Field
                aboveFieldText = 'Phone'
                fieldText = {recipientPhone}
                setFieldText = {setRecipientPhone}
                type = 'text'
              />
            </div>

            <div className='heading'> Address Details </div>
            <div className='details-div'>
              
              <Dropdown
                aboveFieldText='County*'
                fieldText = {recipientCounty}
                setFieldText = {setRecipientCounty}
                menu={allCounties.map(county => county.Name)}
              />
              <Dropdown
                aboveFieldText='Locality*'
                fieldText = {recipientLocality}
                setFieldText = {setRecipientLocality}
                menu={recipientCounty ? allRecipientLocalities.map(locality => locality.Name) : ['No locality available']}
              />
              <Field
                aboveFieldText = 'Street'
                fieldText = {recipientStreet}
                setFieldText = {setRecipientStreet}
                type = 'text'
              />
              <Field
                aboveFieldText = 'Zip Code'
                fieldText = {recipientZipCode}
                setFieldText = {setRecipientZipCode}
                type = 'text'
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default AWB