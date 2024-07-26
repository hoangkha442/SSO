import React, { useState } from 'react';
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import SearchBar from '../../components/Input/SearchBar';
import { Modal, Input, Checkbox, Button } from 'antd';

const AddDefaultGroupsModal = ({ visible, onClose }) => {
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const groups = [
    'Zimbra Test',
    'THDSplunk',
    'Zimbra Test',
    'Zimbra Test',
    'Zimbra Test',
    'Zimbra Test',
    'Zimbra Test'
  ];

  const handleCheckboxChange = (group) => {
    setSelectedGroups((prev) =>
      prev.includes(group) ? prev.filter((item) => item !== group) : [...prev, group]
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredGroups = groups.filter((group) =>
    group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={400}
      closeIcon={<CloseOutlined />}
    >
      <h2 className="text-xl font-semibold mb-4">Add Default Groups</h2>
      <Input
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />
      {filteredGroups.map((group, index) => (
        <div key={index} className="flex items-center mb-2">
          <Checkbox
            checked={selectedGroups.includes(group)}
            onChange={() => handleCheckboxChange(group)}
          >
            {group}
          </Checkbox>
        </div>
      ))}
      <Button
        type="primary"
        className="w-full mt-4"
        onClick={() => {
          console.log('Selected Groups:', selectedGroups);
          onClose();
        }}
      >
        Add
      </Button>
    </Modal>
  );
};

const Registration = () => {
  const [activeTab, setActiveTab] = useState('defaultRoles');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const defaultRolesData = [
    { name: 'offline_access', inherited: 'False', description: '∼role{ offline_access }' },
    { name: 'offline_access', inherited: 'False', description: '∼role{ offline_access }' },
    { name: 'offline_access', inherited: 'False', description: '∼role{ offline_access }' },
    { name: 'offline_access', inherited: 'False', description: '∼role{ offline_access }' },
    { name: 'offline_access', inherited: 'False', description: '∼role{ offline_access }' },
  ];

  const defaultGroupsData = [
    { name: 'group1', path: '/group1' },
    { name: 'group2', path: '/group2' },
    { name: 'group3', path: '/group3' },
    { name: 'group4', path: '/group4' },
    { name: 'group5', path: '/group5' },
  ];

  const renderTabContent = () => {
    if (activeTab === 'defaultRoles') {
      return (
        <div className="overflow-x-auto mt-4 sm:mt-6">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
            <thead>
              <tr>
                <th className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-5">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>Name</div>
                </th>
                <th className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>Inherited</div>
                </th>
                <th className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>Description</div>
                </th>
                <th className="text-center text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2 pr-5">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>Action</div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {defaultRolesData.map((role, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-5">
                    <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{role.name}</div>
                  </td>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{role.inherited}</div>
                  </td>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{role.description}</div>
                  </td>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pr-5 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] text-center'>
                      <button className="text-[#1d232d] text-3xl font-semibold hover:text-gray-700 cursor-pointer h-[60px]"><DeleteOutlined className='text-[#344054]'/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="overflow-x-auto mt-4 sm:mt-6">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
            <thead>
              <tr>
                <th className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-5">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>Name</div>
                </th>
                <th className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>Path</div>
                </th>
                <th className="text-center text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2 pr-5">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>Action</div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {defaultGroupsData.map((group, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-5">
                    <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{group.name}</div>
                  </td>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{group.path}</div>
                  </td>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pr-5 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] text-center'>
                      <button className="text-[#1d232d] text-3xl font-semibold hover:text-gray-700 cursor-pointer h-[60px]"><DeleteOutlined /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center">
        <div className="flex-1 w-full">
          <SearchBar  
            styleClass=''
            styleInput='py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl' 
            styleIcon='text-xl sm:text-2xl top-3 sm:top-4 mt-1'
          />
        </div>
        <div className="text-end w-full sm:w-auto">
          <button onClick={() => setIsModalVisible(true)} className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white'>
            Add User
          </button>
          <AddDefaultGroupsModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          />
        </div>
      </div>
      <div className="bg-white border border-[#D0D3D9] rounded-xl p-6 sm:p-9 mt-5">
        <p className='text-lg sm:text-xl md:text-2xl font-semibold text-[#344054]'>Users Registration</p>
        <div className="flex flex-wrap my-5">
          <button
            className={`px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-2xl border border-[#D0D5DD] rounded-tl-lg rounded-bl-lg ${activeTab === 'defaultRoles' ? 'text-[#FCFCFC] bg-[#009FF5]' : 'text-[#344054]'}`}
            onClick={() => setActiveTab('defaultRoles')}
          >
            Default Roles
          </button>
          <button
            className={`px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-2xl border-y border-r border-[#D0D5DD] rounded-tr-lg rounded-br-lg ${activeTab === 'defaultGroups' ? 'text-[#FCFCFC] bg-[#009FF5]' : 'text-[#344054]'}`}
            onClick={() => setActiveTab('defaultGroups')}
          >
            Default Groups
          </button>
        </div>
        {renderTabContent()}
      </div>
    </section>
  );
};

export default Registration;
