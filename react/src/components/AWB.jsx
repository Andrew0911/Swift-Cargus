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

      <div className='page-header'>Generare AWB</div>
      <br/>
    </>
  )
}

export default AWB