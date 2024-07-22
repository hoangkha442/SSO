import React, { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function SearchBar({ searchText, styleClass, placeholderText, setSearchText }) {

  const updateSearchInput = (value) => {
    setSearchText(value);
  }

  return (
    <div className={styleClass}>
      <div className="relative flex items-center w-full ">
        <AiOutlineSearch className="absolute left-3 top-[13px] text-gray-400" size={18}/>   
        <input 
          type="search" 
          value={searchText} 
          placeholder={placeholderText || "Search"} 
          onChange={(e) => updateSearchInput(e.target.value)} 
          className="border border-[#B3B3B3]  appearance-none rounded-lg w-full py-[10px] pl-8 pr-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline placeholder:font-medium" 
        />
      </div>
    </div>
  )
}

export default SearchBar;
