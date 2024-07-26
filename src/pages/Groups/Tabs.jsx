import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="flex">
    <button
      className={`px-4 py-2 text-base sm:text-lg md:text-2xl border border-[#D0D5DD] rounded-tl-lg rounded-bl-lg ${activeTab === 'members' ? 'text-white bg-[#009FF5]' : 'text-[#344054] bg-white hover:bg-gray-100'}`}
      onClick={() => setActiveTab('members')}
    >
      Members
    </button>
    <button
      className={`px-4 py-2 text-base sm:text-lg md:text-2xl border-y border-r border-[#D0D5DD] rounded-tr-lg rounded-br-lg ${activeTab === 'roleMapping' ? 'text-white bg-[#009FF5]' : 'text-[#344054] bg-white hover:bg-gray-100'}`}
      onClick={() => setActiveTab('roleMapping')}
    >
      Role Mapping
    </button>
  </div>
);

export default Tabs;
