import React from 'react';
import { AiOutlineBell, AiOutlineDown } from 'react-icons/ai';

export default function Profile() {
  return (
    <div className="flex items-center p-4 bg-white">
      <AiOutlineBell className="text-2xl mr-4" />
      <img 
        src="https://via.placeholder.com/40"
        alt="Profile" 
        className="w-10 h-10 rounded-full object-cover mr-4" 
      />
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900">Nguyen Van A</span>
        <span className="text-sm text-gray-500">NguyenVanA@gmail.com</span>
      </div>
      <AiOutlineDown className="text-xl ml-2" />
    </div>
  );
}
