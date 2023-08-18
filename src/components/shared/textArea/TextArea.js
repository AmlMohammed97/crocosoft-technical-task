import React, { useState, useEffect } from 'react'

export default function TextArea({ label, value, placeholder, isRequired, onInputChange = () => {} }) {
    const [shouldDisplayRequiredError, setShouldDisplayRequiredError] = useState(false);
    const [textValue, setTextValue] = useState(value);

    useEffect(() => {
      setTextValue(value)
    }, [value])
    const handleChangeTextValue = (event) => setTextValue(event.target.value);
    const onBlur = (event) => {
        const { value } = event.target;
        setShouldDisplayRequiredError(false);
        if (isRequired && !value) {
            setShouldDisplayRequiredError(true);
            onInputChange(value);
            return;
        }
        onInputChange(value);
    };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label>
            {label + (isRequired ? '*' : '')}
            {shouldDisplayRequiredError && <span className='error'>This field is required</span>}
        </label>
          <textarea onChange={handleChangeTextValue}  value={textValue} type="text" name="name" className={shouldDisplayRequiredError ? 'error' : ''} placeholder={placeholder} onBlur={onBlur} />
    </div>
  )
}
