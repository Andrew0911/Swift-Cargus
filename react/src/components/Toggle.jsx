import React from 'react';

function Toggle(props) {
    const { value, setValue, siblingValue, setSiblingValue } = props;

    const handleChange = (event) => {
        const checked = event.target.checked;

        setValue(checked);

        if (checked) {
            setSiblingValue(false);
        }
    };

    return (
        <label className="switch">
            <input
                type="checkbox"
                checked={value}
                onChange={handleChange}
            />
            <span className="slider round"></span>
        </label>
    );
}

export default Toggle;
