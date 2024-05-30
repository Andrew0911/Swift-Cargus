import React from 'react';

const DimensionInput = ({ fieldName, setValue, hasError = false }) => {
  
  const handleInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    value = value.replace(/^0+/, '');
    if (value === '' || value === '0') {
      value = '0';
    }
    event.target.value = value;
    setValue(value);
  };

  return (
    <div>
        <div className='title'> {fieldName} </div>
        <div className="custom-input" style={{ borderColor: hasError ? 'red' : '' }}>
            <input placeholder='0' type="text" onChange={handleInputChange} maxLength="2" />
            <span className="suffix">cm</span>
        </div>
    </div>
  );
};

export default DimensionInput;
