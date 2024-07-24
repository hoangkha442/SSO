import React, { useState } from 'react';
import { MinusOutlined, DownOutlined } from '@ant-design/icons';

const SelectBox = ({ labelTitle, labelStyle, containerStyle, defaultValue, options, updateFormValue, updateType, styleP, showDeleteIcon }) => {
  const [value, setValue] = useState(defaultValue);

  const updateSelectValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className={`label col-span-2 ${labelStyle}`}>
        {labelTitle}
      </label>
      <div className="col-span-10 flex items-center relative">
        <select
          value={value}
          onChange={(e) => updateSelectValue(e.target.value)}
          className={`select flex-1 shadow custom-input-shadow appearance-none border border-[#D0D5DD] w-full px-3 text-gray-700 my-2 leading-tight focus:outline-none focus:shadow-outline ${styleP} pr-10`}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <DownOutlined className="absolute right-3 text-gray-700" />
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

export default SelectBox;
