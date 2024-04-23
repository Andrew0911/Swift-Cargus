import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import Field from './Field';
import { useEffect } from 'react';
import axiosClient from '../axios';
import { Dropdown } from './Dropdown';

function Profile() {

  const [allCounties, setAllCounties] = useState([]);
  const [allLocalities, setAllLocalities] = useState([]);

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
    setLocality('');
    setLocalityId(0);
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

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <div className='page-header'>Profile</div>
      <br/><br/><br/><br/><br/><br/>
      
      <div className='client-address-form'>
          <Field
            aboveFieldText = 'Name*'
            fieldText = {name}
            setFieldText = {setName}
            type = 'text'
            placeholder = ''
            width = '23vw'
            height = '4vh'
            aboveFieldsize = '18px'
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
          />
          <Dropdown
            aboveFieldText='County*'
            aboveFieldsize = '18px'
            fieldText = {county}
            setFieldText = {setCounty}
            menu={allCounties.map(county => county.Name)}
            setFieldId = {setCountyId}
            menuId={allCounties.map(county => county.CountyId)}
            width='24vw'
            height='6vh'
          />
          <Dropdown
            aboveFieldText='Locality*'
            aboveFieldsize = '18px'
            fieldText = {locality}
            setFieldText = {setLocality}
            menu={ county ? (allLocalities.map(locality => locality.Name)) : ['No localities available']}
            setFieldId = {setLocalityId}
            menuId={allLocalities.map(locality => locality.LocalityId)}
            width='24vw'
            height='6vh'
          />
          <Field
            aboveFieldText = 'Street*'
            fieldText = {street}
            setFieldText = {setStreet}
            type = 'text'
            placeholder = ''
            width = '23vw'
            height = '4vh'
            aboveFieldsize = '18px'
          />
          <Field
            aboveFieldText = 'Nr*'
            fieldText = {nr}
            setFieldText = {setNr}
            type = 'text'
            placeholder = ''
            width = '23vw'
            height = '4vh'
            aboveFieldsize = '18px'
          />
          <Field
            aboveFieldText = 'ZipCode*'
            fieldText = {zipCode}
            setFieldText = {setZipCode}
            type = 'text'
            placeholder = ''
            width = '23vw'
            height = '4vh'
            aboveFieldsize = '18px'
          />
      </div>
      <br/><br/><br/><br/><br/><br/>

    </>
  )
}

export default Profile