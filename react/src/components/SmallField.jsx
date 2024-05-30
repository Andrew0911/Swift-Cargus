import { capitalize } from '@mui/material';
import React from 'react'

function SmallField(props) {
    const { aboveFieldText, fieldText, setFieldText, fieldType, placeholder, width, height, aboveFieldsize, fontSize, hasError = false } = props;
    return (
        <div>
            <p 
              className='above-input-field'
              style={{ fontSize: aboveFieldsize }}
            > {aboveFieldText} </p>
            <input 
                className='small-input-field'
                type={fieldType} 
                value={fieldText} 
                onChange={ev => setFieldText(ev.target.value)}
                placeholder={placeholder ? (placeholder + ' ' + aboveFieldText.replace(/\*/g, '').toLowerCase() + '...') : capitalize(aboveFieldText.replace(/\*/g, '').toLowerCase()) + '...'}
                style={{ width: width, height: height, fontSize: fontSize, borderColor: hasError ? 'red' : '' }}
            />
        </div>
    )
}

export default SmallField