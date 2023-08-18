import React, { useState, useEffect } from 'react'

export default function Input({ label, placeholder, value, isRequired, isInputValid, onInputChange = () => {}, inputStyle = {}, labelStyle = {} }) {
    const [shouldDisplayRequiredError, setShouldDisplayRequiredError] = useState(false);
    const [shouldDisplayInvalidError, setShouldDisplayInvalidError] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
      setInputValue(value)
    }, [value])
    
    const handleChangeInputValue = (event) => setInputValue(event.target.value);
    const onBlur = (event) => {
        const { value } = event.target;
        setShouldDisplayRequiredError(false);
        setShouldDisplayInvalidError(false);
        if (isRequired && !value) {
            setShouldDisplayRequiredError(true);
            onInputChange(value);
            return;
        }
        if (!isInputValid || isInputValid(value)) onInputChange(value);
        else setShouldDisplayInvalidError(true);
    };

    return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
        <label style={{ ...labelStyle }}>
            {label + (isRequired ? '*' : '')}
            {shouldDisplayRequiredError && <span className='error'>This field is required</span>}
            {shouldDisplayInvalidError && <span className='error'>Invalid value</span>}    
        </label>
        <input value={inputValue} onChange={handleChangeInputValue} style={{ ...inputStyle }} type="text" className={shouldDisplayRequiredError || shouldDisplayInvalidError ? 'error' : ''} name="name" placeholder={placeholder} onBlur={onBlur} />
    </div>
    )
}
