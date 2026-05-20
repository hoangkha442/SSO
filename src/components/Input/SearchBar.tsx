import React, { ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBarProps {
  searchText?: any;
  styleClass?: any;
  placeholderText?: any;
  setSearchText: (value: any) => void;
  styleInput?: any;
  styleIcon?: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  styleClass,
  placeholderText = "Search",
  setSearchText,
  styleInput,
  styleIcon,
}) => {
  const updateSearchInput = (value: string | undefined) => {
    setSearchText(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSearchInput(e.target.value);
  };

  return (
    <div className={styleClass}>
      <div className="relative flex items-center w-full ">
        <AiOutlineSearch className={`absolute left-3 text-gray-400 ${styleIcon}`} />
        <input
          type="search"
          value={searchText}
          placeholder={placeholderText}
          onChange={handleChange}
          className={`${styleInput} border border-[#B3B3B3] appearance-none rounded-lg w-full pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:font-medium`}
        />
      </div>
    </div>
  );
};

export default SearchBar;
