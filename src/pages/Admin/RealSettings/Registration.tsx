import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import DefaultRolesTable from './DefaultRolesTable';
import DefaultGroupsTable from './DefaultGroupsTable';
import SearchBar from '../../../components/Input/SearchBar';
import axios from 'axios';
import { baseURL } from '../../../api/AxiosGet';
import AddDefaultGroupsModal from './components/AddDefaultGroupsModal';

const Registration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('defaultRoles');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [defaultRolesData, setDefaultRolesData] = useState([]);
  const [defaultGroupsData, setDefaultGroupsData] = useState([]);

  useEffect(() => {
    const fetchDefaultRoles = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.get(`${baseURL}roles`, config);
        setDefaultRolesData(response.data);
      } catch (error) {
        console.error('Error fetching default roles:', error);
        notification.error({
          message: 'Fetch Failed',
          description: 'An error occurred while fetching default roles.',
        });
      }
    };

    const fetchDefaultGroups = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.get(`${baseURL}default-groups`, config);
        setDefaultGroupsData(response.data);
      } catch (error) {
        console.error('Error fetching default groups:', error);
        notification.error({
          message: 'Fetch Failed',
          description: 'An error occurred while fetching default groups.',
        });
      }
    };

    fetchDefaultRoles();
    fetchDefaultGroups();
  }, []);

  const renderTabContent = () => {
    if (activeTab === 'defaultRoles') {
      return <DefaultRolesTable data={defaultRolesData} />;
    } else {
      return <DefaultGroupsTable data={defaultGroupsData} />;
    }
  };

  const handeSearch = (keySearch: any) => { 
    console.log('keySearch: ', keySearch);
   }
  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center">
        <div className="flex-1 w-full">
          <SearchBar
            styleClass=''
            styleInput='py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl' 
            styleIcon='text-xl sm:text-2xl top-3 sm:top-4 mt-1'
            setSearchText={handeSearch}
          />
        </div>
        <div className="text-end w-full sm:w-auto">
          <button onClick={() => setIsModalVisible(true)} className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white'>
            Add Default Groups
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
