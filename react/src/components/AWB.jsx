import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import Field from './Field';
import { Dropdown } from './Dropdown.jsx';
import axiosClient from '../axios.js';
import Toggle from './Toggle.jsx';
import Option from './Option.jsx';
import Warning from '../img/Warning.png'

function AWB() {

  const [senderName, setSenderName] = useState('');
  const [senderContactPerson, setSenderContactPerson] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderCounty, setSenderCounty] = useState('');
  const [senderCountyId, setSenderCountyId] = useState(0);
  const [senderLocality, setSenderLocality] = useState('');
  const [senderLocalityId, setSenderLocalityId] = useState(0);

  const [senderStreet, setSenderStreet] = useState('');
  const [senderZipCode, setSenderZipCode] = useState('');
  
  const [recipientName, setRecipientName] = useState('');
  const [recipientContactPerson, setRecipientContactPerson] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientCounty, setRecipientCounty] = useState('');
  const [recipientCountyId, setRecipientCountyId] = useState(0);
  const [recipientLocality, setRecipientLocality] = useState('');
  const [recipientLocalityId, setRecipientLocalityId] = useState(0);
  const [recipientStreet, setRecipientStreet] = useState('');
  const [recipientZipCode, setRecipientZipCode] = useState('');

  const [allCounties, setAllCounties] = useState([]);
  const [allSenderLocalities, setAllSenderLocalities] = useState([]);
  const [allRecipientLocalities, setAllRecipientLocalities] = useState([]);

  const [standardServiceType, setStandardServiceType] = useState(false);
  const [heavyServiceType, setHeavyServiceType] = useState(false);

  const [serviceOptions, setServiceOptions] = useState([]);

  // Effect to fetch all counties
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
    setSenderLocalityId(0);
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
    setRecipientLocalityId(0);
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
  }, [recipientCounty]);

  // Get Service options according to selected service
  useEffect(() => {
    const fetchServiceOptions = async () => {
      setServiceOptions([]);
      if (!standardServiceType && !heavyServiceType) return;
      try {
        if(standardServiceType){
          const { data: serviceOptions } = await axiosClient.get('/service-options', {
            params : {serviceId: 1}
          });
          setServiceOptions(serviceOptions);
        } else {
          const { data: serviceOptions } = await axiosClient.get('/service-options', {
            params : {serviceId: 2}
          });
          setServiceOptions(serviceOptions);
        }
      } catch (error) {
        console.error('Error fetching service options:', error);
      }
    };
  
    fetchServiceOptions();
  }, [standardServiceType, heavyServiceType]);

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
          <div className = 'sender-and-recipient-section'>
            <div className='person-container'>

              <div className='header-div'> Sender Information </div>
              
              <div className='heading'> Contact </div>
              <div className='details-div'>
              
                <Field
                  aboveFieldText = 'Name'
                  fieldText = {senderName}
                  setFieldText = {setSenderName}
                  type = 'text'
                  placeholder = 'Sender'
                />
                <Field
                  aboveFieldText = 'Contact Person'
                  fieldText = {senderContactPerson}
                  setFieldText = {setSenderContactPerson}
                  type = 'text'
                  placeholder = 'Sender'
                /> 
                <Field
                  aboveFieldText = 'Email'
                  fieldText = {senderEmail}
                  setFieldText = {setSenderEmail}
                  type = 'email'
                  placeholder = 'Sender'
                />
                <Field
                  aboveFieldText = 'Phone'
                  fieldText = {senderPhone}
                  setFieldText = {setSenderPhone}
                  type = 'text'
                  placeholder = 'Sender'
                />
              </div>

              <div className='heading'> Address Details </div>
              <div className='details-div'>

                <Dropdown
                  aboveFieldText='County*'
                  fieldText = {senderCounty}
                  setFieldText = {setSenderCounty}
                  menu={allCounties.map(county => county.Name)}
                  setFieldId = {setSenderCountyId}
                  menuId={allCounties.map(county => county.CountyId)}
                />
                <Dropdown
                  aboveFieldText='Locality*'
                  fieldText = {senderLocality}
                  setFieldText = {setSenderLocality}
                  menu={senderCounty ? (allSenderLocalities.map(locality => locality.Name)) : ['No localities available']}
                  setFieldId = {setSenderLocalityId}
                  menuId={allSenderLocalities.map(locality => locality.LocalityId)}
                />
                <Field
                  aboveFieldText = 'Street'
                  fieldText = {senderStreet}
                  setFieldText = {setSenderStreet}
                  type = 'text'
                  placeholder = 'Sender'
                />
                <Field
                  aboveFieldText = 'Zip Code'
                  fieldText = {senderZipCode}
                  setFieldText = {setSenderZipCode}
                  type = 'text'
                  placeholder = 'Sender'
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
                  placeholder = 'Recipient'
                />
                <Field
                  aboveFieldText = 'Contact Person'
                  fieldText = {recipientContactPerson}
                  setFieldText = {setRecipientContactPerson}
                  type = 'text'
                  placeholder = 'Recipient'
                />
                <Field
                  aboveFieldText = 'Email'
                  fieldText = {recipientEmail}
                  setFieldText = {setRecipientEmail}
                  type = 'email'
                  placeholder = 'Recipient'
                />
                <Field
                  aboveFieldText = 'Phone'
                  fieldText = {recipientPhone}
                  setFieldText = {setRecipientPhone}
                  type = 'text'
                  placeholder = 'Recipient'
                />
              </div>

              <div className='heading'> Address Details </div>
              <div className='details-div'>

                <Dropdown
                  aboveFieldText='County*'
                  fieldText = {recipientCounty}
                  setFieldText = {setRecipientCounty}
                  menu={allCounties.map(county => county.Name)}
                  setFieldId = {setRecipientCountyId}
                  menuId={allCounties.map(county => county.CountyId)}
                />
                <Dropdown
                  aboveFieldText='Locality*'
                  fieldText = {recipientLocality}
                  setFieldText = {setRecipientLocality}
                  menu={recipientCounty ? allRecipientLocalities.map(locality => locality.Name) : ['No localities available']}
                  setFieldId = {setRecipientLocalityId}
                  menuId={allRecipientLocalities.map(locality => locality.LocalityId)}
                />
                <Field
                  aboveFieldText = 'Street'
                  fieldText = {recipientStreet}
                  setFieldText = {setRecipientStreet}
                  type = 'text'
                  placeholder = 'Recipient'
                />
                <Field
                  aboveFieldText = 'Zip Code'
                  fieldText = {recipientZipCode}
                  setFieldText = {setRecipientZipCode}
                  type = 'text'
                  placeholder = 'Recipient'
                />
              </div>
            </div>
          </div>

          <br/> <br/> <br/> 
          <div>
            <div className='person-container'>

              <div className='header-div'> Delivery Details </div>

              <div className='heading'> Expedition Service Type </div>

              <div className='checkboxes'>
                
                <div className='checkbox-container'>
                  <Toggle
                    value={standardServiceType}
                    setValue={setStandardServiceType}
                    siblingValue={heavyServiceType}
                    setSiblingValue={setHeavyServiceType}
                  />
                  
                  <div className='inline'>
                    Standard Transport 
                    <p className='info' value='For shipments weighing up to 30kg'> &#x2728; </p>
                  </div>
                </div>

                <div className='checkbox-container'>
                  
                  <Toggle
                    value={heavyServiceType}
                    setValue={setHeavyServiceType}
                    siblingValue={standardServiceType}
                    setSiblingValue={setStandardServiceType}
                  />

                  <div className='inline'>
                    Heavy Transport 
                    <p className='info' value='For shipments weighing over 30kg'> &#x2728; </p>
                  </div>
                </div>

              </div>

              <div className='heading'> Expedition Options </div>
              <br/><br/>

              {/* Warning banner */}
              {serviceOptions.length === 0 && standardServiceType === false && heavyServiceType === false &&
                <div className='options-unavailable-banner'>
                  <img src={Warning}/>
                  <div>
                     The delivery options will be displayed after selecting a service type
                  </div>
                </div>
              }

              {/* Loading Skeletons */}
              {serviceOptions.length === 0 && (standardServiceType || heavyServiceType) &&
                <div className='skeleton-options-container'>
                  <div className='option-container skeleton'></div>
                  <div className='option-container skeleton'></div>
                  <div className='option-container skeleton'></div>
                  <div className='option-container skeleton'></div>
                </div>
              }

              {/* Options Section */}
              <div className='details-div'>

                {standardServiceType &&
                  <div className='options-container'> 
                    {serviceOptions.map(option => (
                      <Option
                        name = {option.Name}
                        description = {option.Description}
                      />
                    ))}
                  </div>
                }

                {heavyServiceType &&
                  <div className='options-container'> 
                    {serviceOptions.map(option => (
                      <Option
                        name = {option.Name}
                        description = {option.Description}
                      />
                    ))}
                  </div>
                }

              </div>
            </div>
          </div>

          <br/> <br/> <br/>
        </div>
      </form>
    </>
  )
}

export default AWB