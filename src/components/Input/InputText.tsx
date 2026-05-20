import React, { useState, useEffect } from 'react';
import { MinusOutlined } from '@ant-design/icons';

interface InputTextProps {
  labelTitle: string;
  labelStyle?: string;
  type?: string;
  containerStyle?: string;
  defaultValue?: string;
  placeholder?: string;
  updateFormValue: ({ updateType, value }: { updateType: string; value: string }) => void;
  updateType: string;
  styleP?: string;
  showDeleteIcon?: boolean;
  icon?: React.ReactNode;
  startCol?: string
}

const InputText: React.FC<InputTextProps> = ({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue = '',
  placeholder,
  updateFormValue,
  updateType,
  styleP,
  showDeleteIcon,
  startCol
}) => {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const updateInputValue = (val: string) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className={`label ${labelStyle}`}>
        {labelTitle}
      </label>
      <div className={`col-span-10 flex items-center ${startCol}`}>
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
            onClick={() => updateInputValue('')}
          >
            <MinusOutlined />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputText;
