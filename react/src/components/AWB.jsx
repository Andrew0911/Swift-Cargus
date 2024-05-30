import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import Field from './Field';
import { Dropdown } from './Dropdown.jsx';
import axiosClient from '../axios.js';
import Toggle from './Toggle.jsx';
import Option from './Option.jsx';
import Warning from '../img/Warning.png'
import QuantityField from './QuantityField.jsx';
import DimensionInput from './DimensionInput.jsx';
import SmallField from './SmallField.jsx';
import { Checkbox } from '@mui/material';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [senderNr, setSenderNr] = useState('');
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
  const [recipientNr, setRecipientNr] = useState('');
  const [recipientZipCode, setRecipientZipCode] = useState('');

  const [allCounties, setAllCounties] = useState([]);
  const [allSenderLocalities, setAllSenderLocalities] = useState([]);
  const [allRecipientLocalities, setAllRecipientLocalities] = useState([]);

  const [standardServiceType, setStandardServiceType] = useState(false);
  const [heavyServiceType, setHeavyServiceType] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(0);

  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedOptionsArray, setSelectedOptionsArray] = useState([]);

  const [packageNo, setPackageNo] = useState(1);
  const [weight, setWeight] = useState(1);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [autoCompleteSenderInformation, setAutoCompleteSenderInformation] = useState(false);
  const [senderData, setSenderData] = useState([]);

  const [showCostPanel, setShowCostPanel] = useState(false)
  const [cost, setCost] = useState({});

  const [isSavingAwb, setIsSavingAwb] = useState(false);
  const [awbGenerationErrors, setAwbGenerationErrors] = useState({});
  
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
    if(senderCounty != senderData['County'])
    {
      setSenderLocality('');
      setSenderLocalityId(0);
    }
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
      setSelectedOptionsArray([]);
      if (!standardServiceType && !heavyServiceType)
      {
        setSelectedServiceId(0);
        return;
      }
      try {
        if(standardServiceType){
          setWeight(1);
          setSelectedServiceId(1);
          const { data: serviceOptions } = await axiosClient.get('/service-options', {
            params : {serviceId: 1}
          });
          setServiceOptions(serviceOptions);
        } else {
          setWeight(30);
          setSelectedServiceId(2);
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

  const submitAWB = async (ev) => {
    setIsSavingAwb(true);
    setAwbGenerationErrors({});
    ev.preventDefault();
    try {
        const { data: awbNumber } = await axiosClient.post('/awb/generate-awb', {
            senderName: senderName,
            senderContactPerson: senderContactPerson,
            senderEmail: senderEmail,
            senderPhone: senderPhone,
            senderCountyId: senderCountyId,
            senderLocalityId: senderLocalityId,
            senderStreet: senderStreet,
            senderNr: senderNr,
            senderZipCode: senderZipCode,
            
            recipientName: recipientName,
            recipientContactPerson: recipientContactPerson,
            recipientEmail: recipientEmail,
            recipientPhone: recipientPhone,
            recipientCountyId: recipientCountyId,
            recipientLocalityId: recipientLocalityId,
            recipientStreet: recipientStreet,
            recipientNr: recipientNr,
            recipientZipCode: recipientZipCode,

            serviceId: selectedServiceId,
            options: selectedOptionsArray,
            
            packages: packageNo,
            weight: weight,
            length: length, 
            width: width, 
            height: height
        });
        setIsSavingAwb(false);
        window.location.href = `/awb-finalize?awbNumber=${awbNumber.awbNumber}`;    
      } catch (error) {
      setIsSavingAwb(false);
      console.error('Error generating the AWB', error);

      if(error.response.data.errors) {
        const finalErrors = error.response.data.errors;
        setAwbGenerationErrors(finalErrors);
      }
    }
  }

  useEffect(() => {

    if(Object.keys(awbGenerationErrors).length > 0) {

      var shownErrors = 0;

      // sender errors
      if(awbGenerationErrors.senderEmail && senderEmail) {
        shownErrors += 1;
        if(shownErrors < 4){
          toastError(awbGenerationErrors.senderEmail[0]);
        }
      }

      if(awbGenerationErrors.senderPhone && senderPhone) {
        shownErrors += 1;
        if(shownErrors < 4){
          toastError(awbGenerationErrors.senderPhone[0]);
        }
      }

      if(awbGenerationErrors.senderZipCode && senderZipCode) {
        shownErrors += 1;
        if(shownErrors < 4){
          toastError(awbGenerationErrors.senderZipCode[0]);
        }
      }

      // recipient errors
      if(awbGenerationErrors.recipientEmail && recipientEmail) {
        shownErrors += 1;
        if(shownErrors < 4){
          toastError(awbGenerationErrors.recipientEmail[0]);
        }
      }

      if(awbGenerationErrors.recipientPhone && recipientPhone) {
        shownErrors += 1;
        if(shownErrors < 4){
          toastError(awbGenerationErrors.recipientPhone[0]);
        }
      }

      if(awbGenerationErrors.recipientZipCode && recipientZipCode) {
        shownErrors += 1;
        if(shownErrors < 4){
          toastError(awbGenerationErrors.recipientZipCode[0]);
        }
      }

      // service 
      if(awbGenerationErrors.serviceId && shownErrors === 0) {
        shownErrors += 1;
        if(shownErrors < 4){
          toastError('Please select a service type');
        }
      }

      // dimensions errors
      if(awbGenerationErrors.width && selectedServiceId != 0) {
        shownErrors += 1;
        if(shownErrors < 4){
          toastError(awbGenerationErrors.width[0]);
        }
      }

      if(awbGenerationErrors.length && selectedServiceId != 0) {
        shownErrors += 1;
        if(shownErrors < 4){
          toastError(awbGenerationErrors.length[0]);
        }
      }
      
      if(awbGenerationErrors.height && selectedServiceId != 0) {
        shownErrors += 1;
        if(shownErrors < 4){
          toastError(awbGenerationErrors.height[0]);
        }
      }

      // general error
      if(shownErrors === 0) {
        toastError('Failed to generate AWB');
      }
    }
  }, [awbGenerationErrors]);

  useEffect(() => {
    const fetchSenderInformation = async () => {
      try {
        if(autoCompleteSenderInformation === true)
        {
          const { data: senderData } = await axiosClient.get('/client-data');
          setSenderData(senderData);
          if(senderData)
          {
            setSenderName(senderData['Name']);
            setSenderEmail(senderData['Email']);
            setSenderPhone(senderData['Phone']);
            setSenderLocality(senderData['Locality']);
            setSenderLocalityId(senderData['LocalityId'])
            setSenderCounty(senderData['County']);
            setSenderCountyId(senderData['CountyId']);
            setSenderStreet(senderData['Street']);
            setSenderNr(senderData['Nr']);
            setSenderZipCode(senderData['ZipCode']);
            if(senderData['ContactPerson']){
              setSenderContactPerson(senderData['ContactPerson']);
            }
          } 
        } else {
          setSenderName('');
            setSenderEmail('');
            setSenderPhone('');
            setSenderLocality('');
            setSenderLocalityId(0)
            setSenderCounty('');
            setSenderCountyId(0);
            setSenderStreet('');
            setSenderNr('');
            setSenderZipCode('');
            setSenderContactPerson('');
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };
    fetchSenderInformation();
  }, [autoCompleteSenderInformation]);

  const handleAutocompleteCheck = (event) => {
    setAutoCompleteSenderInformation(event.target.checked);
  };

  const handleShowCostPanel = async (ev) => {
    ev.preventDefault();
    setShowCostPanel(!showCostPanel); 
  }

  useEffect(() => {
    if(
      selectedServiceId == 0 || 
      length == 0 || 
      width == 0 ||
      height == 0
    ) return;
    const fetchCost = async () => {
      try {
        setShowCostPanel(false);
        const { data: cost } = await axiosClient.get('/awb/estimate-cost', { params : {
          serviceId: selectedServiceId,
          options: selectedOptionsArray,
          packages: packageNo,
          weight: weight,
          length: length, 
          width: width, 
          height: height
        }});
        setCost(cost);
      } catch (error) {
        console.error('Error fetching cost estimation:', error);
      }
    };
    fetchCost();
  }, [selectedServiceId, selectedOptionsArray, length, width, height, weight, packageNo]);

  return (
    <>
      <Helmet>
        <title>AWB</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <ToastContainer/>

      <div className='page-header'>AWB Generation</div>

      <div>
        <div className='awb-container'>
          <div className = 'sender-and-recipient-section'>
            <div className='person-container'>

              <div className='header-div'> Sender Information </div>
              
              <div className='heading'> Contact </div>
              <div className='details-div'>
              
                <Field
                  aboveFieldText = 'Name*'
                  fieldText = {senderName}
                  setFieldText = {setSenderName}
                  type = 'text'
                  placeholder = 'Sender'
                  hasError = {awbGenerationErrors.senderName ? true : false}
                />
                <Field
                  aboveFieldText = 'Contact Person'
                  fieldText = {senderContactPerson}
                  setFieldText = {setSenderContactPerson}
                  type = 'text'
                  placeholder = 'Sender'
                /> 
                <Field
                  aboveFieldText = 'Email*'
                  fieldText = {senderEmail}
                  setFieldText = {setSenderEmail}
                  type = 'email'
                  placeholder = 'Sender'
                  hasError = {awbGenerationErrors.senderEmail ? true : false}
                />
                <Field
                  aboveFieldText = 'Phone*'
                  fieldText = {senderPhone}
                  setFieldText = {setSenderPhone}
                  type = 'text'
                  placeholder = 'Sender'
                  hasError = {awbGenerationErrors.senderPhone ? true : false}
                />
              </div>

              <div className='heading'> Address Details </div>
              <div className='details-div' style={{ marginBottom: '0'}}>

                <Dropdown
                  aboveFieldText='County*'
                  fieldText = {senderCounty}
                  setFieldText = {setSenderCounty}
                  menu={allCounties.map(county => county.Name)}
                  setFieldId = {setSenderCountyId}
                  menuId={allCounties.map(county => county.CountyId)}
                  hasError = {awbGenerationErrors.senderCountyId ? true : false}
                />
                <Dropdown
                  aboveFieldText='Locality*'
                  fieldText = {senderLocality}
                  setFieldText = {setSenderLocality}
                  menu={senderCounty ? (allSenderLocalities.map(locality => locality.Name)) : ['No localities available']}
                  setFieldId = {setSenderLocalityId}
                  menuId={allSenderLocalities.map(locality => locality.LocalityId)}
                  hasError = {awbGenerationErrors.senderLocalityId ? true : false}
                />
                <Field
                  aboveFieldText = 'Street*'
                  fieldText = {senderStreet}
                  setFieldText = {setSenderStreet}
                  type = 'text'
                  placeholder = 'Sender'
                  hasError = {awbGenerationErrors.senderStreet ? true : false}
                />
                <div className='zipcode_number'>
                  <SmallField
                    aboveFieldText = 'Nr*'
                    fieldText = {senderNr}
                    setFieldText = {setSenderNr}
                    type = 'text'
                    placeholder = 'Sender'
                    hasError = {awbGenerationErrors.senderNr ? true : false}
                  />
                  <SmallField
                    aboveFieldText = 'Zip Code*'
                    fieldText = {senderZipCode}
                    setFieldText = {setSenderZipCode}
                    type = 'text'
                    placeholder = ''
                    hasError = {awbGenerationErrors.senderZipCode ? true : false}
                  />
                </div>
              </div>

              <br/>

              <div className='autocomplete-information'>
                <p style={{color: "#135a76", fontFamily: "Quicksand", fontWeight: "600"}}> Autocomplete using profile preferences </p>
                <Checkbox
                  checked={autoCompleteSenderInformation}
                  onChange={handleAutocompleteCheck}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: "#135a76" } }}
                /> 
              </div>

              <br/>

            </div>

            <div className='person-container'>
              
              <div className='header-div'> Recipient Information </div>
              
              <div className='heading'> Contact </div>
              <div className='details-div'>
                
                <Field
                  aboveFieldText = 'Name*'
                  fieldText = {recipientName}
                  setFieldText = {setRecipientName}
                  type = 'text'
                  placeholder = 'Recipient'
                  hasError = {awbGenerationErrors.recipientName ? true : false}
                />
                <Field
                  aboveFieldText = 'Contact Person'
                  fieldText = {recipientContactPerson}
                  setFieldText = {setRecipientContactPerson}
                  type = 'text'
                  placeholder = 'Recipient'
                />
                <Field
                  aboveFieldText = 'Email*'
                  fieldText = {recipientEmail}
                  setFieldText = {setRecipientEmail}
                  type = 'email'
                  placeholder = 'Recipient'
                  hasError = {awbGenerationErrors.recipientEmail ? true : false}
                />
                <Field
                  aboveFieldText = 'Phone*'
                  fieldText = {recipientPhone}
                  setFieldText = {setRecipientPhone}
                  type = 'text'
                  placeholder = 'Recipient'
                  hasError = {awbGenerationErrors.recipientPhone ? true : false}
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
                  hasError = {awbGenerationErrors.recipientCountyId ? true : false}
                />
                <Dropdown
                  aboveFieldText='Locality*'
                  fieldText = {recipientLocality}
                  setFieldText = {setRecipientLocality}
                  menu={recipientCounty ? allRecipientLocalities.map(locality => locality.Name) : ['No localities available']}
                  setFieldId = {setRecipientLocalityId}
                  menuId={allRecipientLocalities.map(locality => locality.LocalityId)}
                  hasError = {awbGenerationErrors.recipientLocalityId ? true : false}
                />
                <Field
                  aboveFieldText = 'Street*'
                  fieldText = {recipientStreet}
                  setFieldText = {setRecipientStreet}
                  type = 'text'
                  placeholder = 'Recipient'
                  hasError = {awbGenerationErrors.recipientStreet ? true : false}
                />
                <div className='zipcode_number'>
                  <SmallField
                    aboveFieldText = 'Nr*'
                    fieldText = {recipientNr}
                    setFieldText = {setRecipientNr}
                    type = 'text'
                    placeholder = 'Recipient'
                    hasError = {awbGenerationErrors.recipientNr ? true : false}
                  />
                  <SmallField
                    aboveFieldText = 'Zip Code*'
                    fieldText = {recipientZipCode}
                    setFieldText = {setRecipientZipCode}
                    type = 'text'
                    placeholder = ''
                    hasError = {awbGenerationErrors.recipientZipCode ? true : false}
                  />
                </div>
              </div>
            </div>
          </div>

          <br/> <br/> <br/> 
          <div>
            <div className='person-container' style={{marginLeft: '20px', marginRight:'20px'}}>

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
                <div className='warning-banner'>
                  <img src={Warning}/>
                  <div>
                     The delivery options & content will be displayed after selecting a service type
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
                        key={option.Code}
                        name = {option.Name}
                        description = {option.Description}
                        code = {option.Code}
                        optionsArray={selectedOptionsArray}
                        setOptionsArray={setSelectedOptionsArray}
                      />
                    ))}
                  </div>
                }

                {heavyServiceType &&
                  <div className='options-container'> 
                    {serviceOptions.map(option => (
                      <Option
                        key={option.Code}
                        name = {option.Name}
                        description = {option.Description}
                        code = {option.Code}
                        optionsArray={selectedOptionsArray}
                        setOptionsArray={setSelectedOptionsArray}
                      />
                    ))}
                  </div>
                }

              </div>

              {(standardServiceType || heavyServiceType) && 
                
                <>
                  <div className='heading'> Expedition Content </div>
                  <br/><br/>
                  <div className='expedition-content'>
                    <QuantityField
                      name='Package Nr.'
                      counter={packageNo}
                      setCounter={setPackageNo}
                      serviceId = {selectedServiceId}
                    />
                    <QuantityField
                      name='Weight (kg)'
                      counter={weight}
                      setCounter={setWeight}
                      serviceId = {selectedServiceId}
                    />

                    <DimensionInput
                      fieldName={'Length'}
                      setValue={setLength}
                      hasError = {awbGenerationErrors.length ? true : false}
                    />

                    <DimensionInput
                      fieldName={'Width'}
                      setValue={setWidth}
                      hasError = {awbGenerationErrors.width ? true : false}
                    />

                    <DimensionInput
                      fieldName={'Height'}
                      setValue={setHeight}
                      hasError = {awbGenerationErrors.height ? true : false}
                    />
                    
                  </div>

                  <div className='complete-dimensions-banner'>
                    <img src={Warning}/>
                    <div> Complete the dimensions of the largest package </div>
                  </div>

                  <br/>
                </>
              }
            </div>
            <br/>
          </div>

          <br/> <br/> <br/>
        </div>

        <br/><br/>
        {showCostPanel &&
          <div className='estimate-cost-panel'> 
           <div className='cost-and-x'> Cost <button onClick={() => setShowCostPanel(false)}> x </button> </div>
           <div className='cost'> <div>{'Service:'}</div> <div>{ cost['ServiceCost'] + ' RON'} </div></div>
           <div className='cost'> <div>{'Volume:'}</div> <div>{cost['VolumeCost'] + ' RON'} </div></div>
           <div className='cost'> <div>{'Weight:'}</div> <div>{cost['WeightCost'] + ' RON'} </div></div>
           <div className='cost'> <div>{'Package Number:'}</div> <div>{cost['AdditionalPackagesCost'] + ' RON'} </div></div>
           <div className='cost'> <div>{'Options:'}</div> <div>{cost['OptionsCost'] + ' RON'} </div></div>
           
           <div className='cost' style={{borderTop: '1px solid #135a76', paddingTop: '5px'}}> <div>{'Cost without VAT:'}</div> <div>{cost['CostNoVat'] + ' RON'} </div></div>
           <div className='cost'> <div>{'VAT:'}</div> <div>{cost['Vat'] + ' RON'} </div></div>
           <div className='cost' style={{fontWeight: '550', color: 'var(--yellow-color)'}}> <div>{'Total cost:'}</div> <div>{cost['TotalCost'] + ' RON'} </div></div>

          </div>
        }

        <div className='footer'>
          {
            selectedServiceId > 0 &&
            length > 0 &&  
            width > 0 &&  
            height > 0 &&
            <button className='estimate-cost-button' onClick={(ev) => handleShowCostPanel(ev)}> Estimate Cost </button>
          }
          <button className='full-button' onClick={(ev) => submitAWB(ev)}> 
            {
              isSavingAwb ? 
              <div style={{marginTop: '5px'}}> 
                <ClipLoader
                  color = 'white'
                  speedMultiplier={0.5}
                  size={25}
                /> 
              </div>
              :
              'Save AWB' 
            }
          </button>
        </div>
      </div>

    </>
  )
}

export default AWB