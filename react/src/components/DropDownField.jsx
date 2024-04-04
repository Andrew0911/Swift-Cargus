import React from 'react'

function DropDownField(props) {
    const { aboveFieldText, fieldText, setFieldText } = props;
    return (
        <div>
            <p className='above-input-field'> {aboveFieldText} </p>
            <select 
                className='select-field' 
                value={fieldText} 
                aria-placeholder='Select an option...'
                onChange={ev => setFieldText(ev.target.value)}
            >
                <option value="" hidden disbled>Choose a {aboveFieldText.replace(/\*/g, '').toLowerCase()}...</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
        </div>
    )
}

export default DropDownField