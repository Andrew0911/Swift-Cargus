import React from 'react'
import Checkbox from '@mui/material/Checkbox';


function Option({ name, description }) {
    
  return (
    <div className='option-container'>
        <div>
            <div className='name'> {name} </div>
            <div className='description'> {description} </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox color="default" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>
        </div>
    </div>
  )
}

export default Option