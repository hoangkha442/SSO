import React, { useState } from 'react';
import SearchBar from '../Input/SearchBar';
import Profile from './Profile';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Header() {
  const [isMenuOpenSearch, setIsMenuOpenSearch] = useState(false);

  const toggleSearchMenu = () => {
    setIsMenuOpenSearch(!isMenuOpenSearch);
  };

  return (
    <section className="sm:h-[100px] h-16 px-8 w-full border-b border-[#D0D3D9]">
      <div className="flex items-center justify-between h-full">
        <div className="relative w-full lg:w-[40%]  ">
          <div className="hidden lg:inline-block w-full">
            <SearchBar
              placeholderText="Tìm kiếm"
              styleClass="w-full"
              styleInput="py-[10px] pl-8 "
              styleIcon="top-[12px] text-xl"
            />
          </div>
          <div className="lg:hidden flex items-center">
            <AiOutlineSearch
              className="text-2xl cursor-pointer"
              onClick={toggleSearchMenu}
            />
          </div>
          {isMenuOpenSearch && (
            <div className="absolute top-5 left-0 bg-white shadow-lg rounded-lg p-4 z-10 lg:hidden">
              <SearchBar
                placeholderText="Tìm kiếm"
                styleClass="w-full"
                styleInput="py-[10px] pl-8"
                styleIcon="top-[12px] text-xl"
              />
            </div>
          )}
        </div>
        <Profile />
      </div>
    </section>
  );
}
