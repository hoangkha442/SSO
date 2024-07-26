import React, { useState } from 'react';
import { MinusOutlined } from '@ant-design/icons';

const InputText = ({ labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType, styleP, showDeleteIcon, icon }) => {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className={`label ${labelStyle}`}>
        {labelTitle}
      </label>
      <div className="col-span-10 flex items-center">
        <input
          type={type || 'text'}
          value={value}
          placeholder={placeholder || ''}
          onChange={(e) => updateInputValue(e.target.value)}
          className={`input flex-1 shadow custom-input-shadow appearance-none border border-[#D0D5DD] w-full px-3 text-gray-700 my-2 leading-tight focus:outline-none focus:shadow-outline ${styleP}`}
        />
        {showDeleteIcon && (
          <button
            type="button"
            className="flex justify-center items-center hover:text-gray-700 input shadow custom-input-shadow py-3 appearance-none border border-[#D0D5DD] my-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] ml-2"
          >
            <MinusOutlined />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputText;
