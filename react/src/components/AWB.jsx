import React from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'

function AWB() {
  return (
    <>
      <Helmet>
        <title>AWB</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <div className='page-header'>AWB Generation</div>

      <div className='awb-container'>
        <div className='sender-container'>

          <div className='header-div'> Sender Information </div>
          
          <div className='container-div'>
          
            <div>
                <p className='above-input-field'> Nume </p>
                <input className='input-field'
                  type='text' 
                />
            </div>

            <div>
              <p className='above-input-field'> Nume </p>
              <input className='input-field'
                type='text' 
              />
            </div>
            
          </div>

        </div>

        <div className='recipient-container'>
          
          <div className='header-div'> Recipient Information </div>

          <div className='container-div'>
            
            <div>
              <p className='above-input-field'> Nume </p>
              <input className='input-field'
                type='text' 
              />
            </div>

            <div>
              <p className='above-input-field'> Nume </p>
              <input className='input-field'
                type='text' 
              />
            </div>

          </div>

        </div>
        
      </div>
      
    </>
  )
}

export default AWB