import React from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'

function Tracking() {
  return (
    <>
      <Helmet>
        <title>Tracking</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <div className='page-header'>AWB Tracking</div>
      <br/>
    </>
  )
}

export default Tracking