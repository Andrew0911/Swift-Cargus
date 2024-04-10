import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

function Option({ name, description, code, optionsArray, setOptionsArray }) {
    const [selectedOption, setSelectedOption] = useState(false);

    const handleCheckboxChange = (event) => {
        setSelectedOption(event.target.checked);
        if (event.target.checked) {
            setOptionsArray(prevOptionsArray => [...prevOptionsArray, code]);
        } else {
            setOptionsArray(prevOptionsArray => prevOptionsArray.filter(item => item !== code));
        }
    };

    return (
        <div className='option-container'>
            <div>
                <div className='name'>{name}</div>
                <div className='description'>{description}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                    checked={selectedOption}
                    onChange={handleCheckboxChange}
                    color="default"
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
            </div>
        </div>
    );
}

export default Option;
