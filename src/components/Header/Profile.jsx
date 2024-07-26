import React, { useState } from 'react';
import { AiOutlineBell, AiOutlineDown, AiOutlineMenu } from 'react-icons/ai';

export default function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="flex items-center p-4 pb-0 bg-white lg:flex-row flex-col">
        <div className="lg:flex hidden items-center w-full lg:w-auto">
          <div className="">
          <AiOutlineBell className="text-2xl mr-4 hidden lg:block" />
          </div>
          <img 
            src="https://via.placeholder.com/40"
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover mr-4" 
          />
          <div className="flex flex-col flex-grow">
            <span className="font-semibold text-gray-900">Nguyen Van A</span>
            <span className="text-sm text-gray-500">NguyenVanA@gmail.com</span>
          </div>
        </div>
          <AiOutlineMenu 
            className="text-2xl ml-4 lg:hidden cursor-pointer" 
            onClick={toggleMenu} 
          />
        <div className="flex items-center w-full lg:w-auto mt-4 lg:mt-0 lg:ml-4">
          <AiOutlineDown className="text-xl ml-2 hidden lg:block" />
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 z-10 lg:hidden">
          <div className="flex items-center w-full lg:w-auto">
          <img 
            src="https://via.placeholder.com/40"
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover mr-4" 
          />
          <div className="flex flex-col flex-grow">
            <span className="font-semibold text-gray-900">Profile</span>
          </div>
        </div>
          <div className="flex items-center p-2">
            <AiOutlineBell className="text-2xl mr-4" />
            <span className="text-gray-900">Notifications</span>
          </div>
        </div>
      )}
    </div>
  );
}
