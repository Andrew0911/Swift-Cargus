import { capitalize } from '@mui/material';
import React from 'react'

function SmallField(props) {
    const { aboveFieldText, fieldText, setFieldText, fieldType, placeholder } = props;
    return (
        <div>
            <p className='above-input-field'> {aboveFieldText} </p>
            <input 
                className='small-input-field'
                type={fieldType} 
                value={fieldText} 
                onChange={ev => setFieldText(ev.target.value)}
                placeholder={placeholder ? (placeholder + ' ' + aboveFieldText.replace(/\*/g, '').toLowerCase() + '...') : capitalize(aboveFieldText.replace(/\*/g, '').toLowerCase()) + '...'}
            />
        </div>
    )
}

export default SmallField