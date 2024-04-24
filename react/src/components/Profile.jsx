import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import Field from './Field';
import { useEffect } from 'react';
import axiosClient from '../axios';
import { Dropdown } from './Dropdown';
import SmallField from './SmallField';

function Profile() {

  const [allCounties, setAllCounties] = useState([]);
  const [allLocalities, setAllLocalities] = useState([]);
  const [clientInfo, setClientInfo] = useState({});
  const [clientData, setClientData] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  const [street, setStreet] = useState('');
  const [nr, setNr] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [county, setCounty] = useState('');
  const [countyId, setCountyId] = useState(0);
  const [locality, setLocality] = useState('');
  const [localityId, setLocalityId] = useState(0);

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

  useEffect(() => {
    if(clientData['County'] != county)
    {
      setLocality('');
      setLocalityId(0);
    }
    const fetchLocalities = async () => {
      if (!county) return; 

      try {
        const countyObj = allCounties.find(County => County.Name === county);
        if (!countyObj) return; 

        const countyId = countyObj.CountyId;
        const { data: localitiesData } = await axiosClient.get('/all-localities-by-county', {
          params: { countyId: countyId }
        });
        setAllLocalities(localitiesData);
      } catch (error) {
        console.error('Error fetching localities:', error);
      }
    };

    fetchLocalities();
  }, [county]); 

  useEffect(() => {
    const fetchClientInformation = async () => {
      try {
        const { data: clientInfo } = await axiosClient.get('/user-information');
        setClientInfo(clientInfo);
      } catch (error) {
        console.error('Error fetching client information:', error);
      }
    };

    fetchClientInformation();
  }, []);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const { data: clientData } = await axiosClient.get('/client-data');
        setClientData(clientData);
        if(clientData)
        {
          setName(clientData['Name']);
          setEmail(clientData['Email']);
          setPhone(clientData['Phone']);
          setLocality(clientData['Locality']);
          setLocalityId(clientData['LocalityId'])
          setCounty(clientData['County']);
          setCountyId(clientData['CountyId']);
          setStreet(clientData['Street']);
          setNr(clientData['Nr']);
          setZipCode(clientData['ZipCode']);
          if(clientData['ContactPerson']){
            setContactPerson(clientData['ContactPerson']);
          }
        } 
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };
    fetchClientData();
  }, []);

  const handleInformationSave = async (ev) => {
    ev.preventDefault();

    try {
      const { data: data } = await axiosClient.post('/save-or-update-client-information', {
          name: name,
          email: email,
          phone: phone,
          contactPerson: contactPerson,
          countyId: countyId,
          localityId: localityId,
          street: street, 
          nr: nr,
          zipCode: zipCode
      });
      window.location.href = '/profile';
    } catch (error) {
      console.error('Error saving or updating the client data:', error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <div className='page-header'>Profile</div>
      
      <br/><br/>

      {clientInfo['Name'] ?
        (<div className='client-information'>
  
          <div style = {{display: 'flex', alignItems: 'center', gap: '5px'}}> 
            <p style = {{ color: ' #135a76', fontFamily: 'Quicksand', fontWeight: 'bold'}}> Name: </p> 
            <span> {clientInfo['Name']} </span>
          </div>

          <div style = {{display: 'flex', alignItems: 'center', gap: '5px'}}> 
            <p style = {{ color: ' #135a76', fontFamily: 'Quicksand', fontWeight: 'bold'}}> Email: </p> 
            <span> {clientInfo['Email']} </span>
          </div>

          <div style = {{display: 'flex', alignItems: 'center', gap: '5px'}}> 
            <p style = {{ color: ' #135a76', fontFamily: 'Quicksand', fontWeight: 'bold'}}> Member Since: </p> 
            <span> {clientInfo['Date']} </span>
          </div>
        
        </div>) : (
          <div className='client-information skeleton'>

          </div>
        )
      }

      <br/> <br/><br/>

       
      <div className='headers'> 
        <div className='client-heading'> Contact  </div>
        <div className='client-heading'> Address Details </div>
      </div>

      <div className='client-form'>
        <div>
          <Field
            aboveFieldText = 'Name*'
            fieldText = {name}
            setFieldText = {setName}
            type = 'text'
            placeholder = ''
            width = '23vw'
            height = '4vh'
            aboveFieldsize = '18px'
            fontSize = '18px'
          />
          <Field
            aboveFieldText = 'Contact Person'
            fieldText = {contactPerson}
            setFieldText = {setContactPerson}
            type = 'text'
            placeholder = ''
            width = '23vw'
            height = '4vh'
            aboveFieldsize = '18px'
            fontSize = '18px'
          /> 
          <Field
            aboveFieldText = 'Email*'
            fieldText = {email}
            setFieldText = {setEmail}
            type = 'email'
            placeholder = ''
            width = '23vw'
            height = '4vh'
            aboveFieldsize = '18px'
            fontSize = '18px'
          />
          <Field
            aboveFieldText = 'Phone*'
            fieldText = {phone}
            setFieldText = {setPhone}
            type = 'text'
            placeholder = ''
            width = '23vw'
            height = '4vh'
            aboveFieldsize = '18px'
            fontSize = '18px'
          />
        </div>

        <div>
          <Dropdown
            aboveFieldText='County*'
            aboveFieldsize = '18px'
            fontSize = '18px'
            fieldText = {county}
            setFieldText = {setCounty}
            menu={allCounties.map(county => county.Name)}
            setFieldId = {setCountyId}
            menuId={allCounties.map(county => county.CountyId)}
            width='24vw'
            height='5.8vh'
          />
          <Dropdown
            aboveFieldText='Locality*'
            aboveFieldsize = '18px'
            fontSize = '18px'
            fieldText = {locality}
            setFieldText = {setLocality}
            menu={ county ? (allLocalities.map(locality => locality.Name)) : ['No localities available']}
            setFieldId = {setLocalityId}
            menuId={allLocalities.map(locality => locality.LocalityId)}
            width='24vw'
            height='5.8vh'
          />
          <Field
            aboveFieldText = 'Street*'
            fieldText = {street}
            setFieldText = {setStreet}
            type = 'text'
            placeholder = ''
            width = '23.5vw'
            height = '4vh'
            aboveFieldsize = '18px'
            fontSize = '18px'
          />

          <div style={{display: 'flex', gap: '3vw'}}>
            <SmallField
              aboveFieldText = 'Nr*'
              fieldText = {nr}
              setFieldText = {setNr}
              type = 'text'
              placeholder = ''
              width = '10vw'
              height = '4vh'
              aboveFieldsize = '18px'
              fontSize = '18px'
            />
            <SmallField
              aboveFieldText = 'ZipCode*'
              fieldText = {zipCode}
              setFieldText = {setZipCode}
              type = 'text'
              placeholder = ''
              width = '10vw'
              height = '4vh'
              aboveFieldsize = '18px'
              fontSize = '18px'
            />
          </div>
        </div>
      </div>

      <div className='button-container'>
        <button onClick={handleInformationSave} style={{fontSize: '18px'}}> Save Information </button>
      </div>
    </>
  )
}

export default Profile