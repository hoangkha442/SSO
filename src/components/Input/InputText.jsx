import React, { useState } from 'react';

const InputText = ({ labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType }) => {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={`label-text text-base-content ${labelStyle}`}>{labelTitle}</span>
      </label>
      <input
        type={type || 'text'}
        value={value}
        placeholder={placeholder || ''}
        onChange={(e) => updateInputValue(e.target.value)}
        className="shadow mt-1 appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default InputText;
