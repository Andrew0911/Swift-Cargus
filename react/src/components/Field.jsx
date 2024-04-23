import React from 'react'

function Field(props) {
    const { aboveFieldText, fieldText, setFieldText, fieldType, placeholder, width, height, aboveFieldsize} = props;
    return (
        <div>
            <p 
              className='above-input-field'
              style={{ fontSize: aboveFieldsize }}
            > {aboveFieldText} </p>
            <input 
                className='input-field'
                type={fieldType} 
                value={fieldText} 
                onChange={ev => setFieldText(ev.target.value)}
                placeholder={placeholder + ' ' + aboveFieldText.replace(/\*/g, '').toLowerCase() + '...'}
                style={{ width: width, height: height }}
            />
        </div>
    )
}

export default Field