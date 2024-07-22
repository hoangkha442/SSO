import React, { useState } from 'react';

const InputText = ({ labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType, styleP }) => {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className={`label col-span-2 ${labelStyle}`}>
        {labelTitle}
      </label>
      <input
        type={type || 'text'}
        value={value}
        placeholder={placeholder || ''}
        onChange={(e) => updateInputValue(e.target.value)}
        className={`input col-span-10 shadow custom-input-shadow appearance-none border border-[#D0D5DD] w-full px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${styleP}`}
      />
    </div>
  );
};

export default InputText;
