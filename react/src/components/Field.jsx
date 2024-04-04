import React from 'react'

function Field(props) {
    const { aboveFieldText, fieldText, setFieldText, fieldType } = props;
    return (
        <div>
            <p className='above-input-field'> {aboveFieldText} </p>
            <input 
                className='input-field'
                type={fieldType} 
                value={fieldText} 
                onChange={ev => setFieldText(ev.target.value)}
            />
        </div>
    )
}

export default Field