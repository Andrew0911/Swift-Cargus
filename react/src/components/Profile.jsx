import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'

function Profile() {

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <div className='page-header'>Profile</div>
      <br/>
    </>
  )
}

export default Profile