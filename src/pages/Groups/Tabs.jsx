import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="flex">
    <button
      className={`px-4 py-2 text-2xl border border-[#D0D5DD] rounded-tl-lg rounded-bl-lg ${activeTab === 'members' ? 'text-[#FCFCFC] bg-[#009FF5]' : 'text-[#344054]'}`}
      onClick={() => setActiveTab('members')}
    >
      Members
    </button>
    <button
      className={`px-4 py-2 text-2xl border-y border-r border-[#D0D5DD] rounded-tr-lg rounded-br-lg  ${activeTab === 'roleMapping' ? 'text-[#FCFCFC] bg-[#009FF5]' : 'text-[#344054]'}`}
      onClick={() => setActiveTab('roleMapping')}
    >
      Role Mapping
    </button>
  </div>
);

export default Tabs;
