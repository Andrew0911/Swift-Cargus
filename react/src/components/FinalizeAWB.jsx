import React from 'react'
import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import { useLocation, useNavigate } from 'react-router-dom';
import FinalizePlusIcon from '../img/FinalizePlusIcon.png';
import FinalizePrintIcon from '../img/FinalizePrintIcon.png';
import FinalizeTrackingIcon from '../img/FinalizeTrackingIcon.png';
import FinalizeDashboardIcon from '../img/FinalizeDashboardIcon.png';

function FinalizeAWB() {
  
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const awbNumber = searchParams.get('awbNumber');
    const navigate = useNavigate();
    
    const redirect = (title) => {
        navigate(`/${title.toLowerCase()}`);
    }

    const redirectToPrint = () => {
        navigate(`/print?awbNumber=${awbNumber}`);
    }

    const redirectToTracking = () => {
        navigate(`/tracking?awbNumber=${awbNumber}`);
    }

    return (
        <>
            <Helmet>
                <title>AWB Finalize</title>
                <link rel="icon" href={SwiftCargusLogo} type="image/png" />
            </Helmet>

            <div className='finalizePage-container'>

                <div className='title'> 
                    The AWB &#xA0;  
                    <span>{awbNumber}</span> 
                    &#xA0; was sucessfully generated !
                </div>

                <br/><br/><br/><br/><br/>

                <div className='buttons-container'>
                    
                    <button onClick={() => redirect('AWB')}> 
                        <img src={FinalizePlusIcon}></img> 
                        <span style={{paddingLeft: '1vw'}}> Generate new AWB </span>
                    </button>
                    
                    <button onClick={() => redirectToPrint()}>
                        <img src={FinalizePrintIcon}></img> 
                        <span style={{paddingLeft: '3vw'}}> Print AWB </span>
                    </button>
                    
                    <button onClick={() => redirectToTracking()}> 
                        <img src={FinalizeTrackingIcon}></img> 
                        <span style={{paddingLeft: '3vw'}}> Track AWB </span> 
                    </button>
                    
                    <button onClick={() => redirect('Dashboard')}> 
                        <img src={FinalizeDashboardIcon}></img> 
                        <span style={{paddingLeft: '3vw'}}> Dashboard </span>
                    </button>
                </div>
            
                <br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        </>
  )
}

export default FinalizeAWB