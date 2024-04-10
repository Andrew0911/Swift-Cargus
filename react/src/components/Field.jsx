import React from 'react'

function Field(props) {
    const { aboveFieldText, fieldText, setFieldText, fieldType, placeholder } = props;
    return (
        <div>
            <p className='above-input-field'> {aboveFieldText} </p>
            <input 
                className='input-field'
                type={fieldType} 
                value={fieldText} 
                onChange={ev => setFieldText(ev.target.value)}
                placeholder={placeholder + ' ' + aboveFieldText.replace(/\*/g, '').toLowerCase() + '...'}
            />
        </div>
    )
}

export default Field