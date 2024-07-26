import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import InputText from '../../../components/Input/InputText';
import SelectBox from '../../../components/Input/SelectBox';
import SearchBar from '../../../components/Input/SearchBar';
import RoleMappingTable from './RoleMappingTable';
import SessionTable from './SessionTable';
import GroupsTable from './GroupsTable';

export default function UserDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');

  const updateFormValue = (updatedField) => {
    console.log(updatedField);
  };

  const roleMappingData = [
    { role: 'Admin', description: 'Has full access to all settings' },
    { role: 'User', description: 'Can view and edit own data' },
    { role: 'Viewer', description: 'Can view data but cannot edit' }
  ];
  const groupsData = [
    { id: 1, name: 'CaMauApp', path: '/camauapp' },
    { id: 2, name: 'CaMauApp', path: '/camauapp' },
    { id: 3, name: 'CaMauApp', path: '/camauapp' },
  ];
  const sessionData = [
    { started: '06/10/2024 10:30AM', lastAccess: '07/10/2024 11:30PM', ipAddress: '10.1.5', clients: 'zimbraEntity' },
    { started: '06/10/2024 10:30AM', lastAccess: '07/10/2024 11:30PM', ipAddress: '10.1.5', clients: 'zimbraEntity' },
    { started: '06/10/2024 10:30AM', lastAccess: '07/10/2024 11:30PM', ipAddress: '10.1.5', clients: 'zimbraEntity' },
    { started: '06/10/2024 10:30AM', lastAccess: '07/10/2024 11:30PM', ipAddress: '10.1.5', clients: 'zimbraEntity' },
  ];

  const handleDeleteGroup = (id) => {
    console.log('Delete group with id:', id);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <form className="pt-0 rounded-[10px]">
            <InputText
              labelTitle="User ID:"
              updateFormValue={updateFormValue}
              updateType="userId"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              inputStyle="col-span-12 md:col-span-10"
              defaultValue="45fr567fghy678"
              styleP='py-[10px] rounded-[10px]'
              disabled
            />
            <InputText
              labelTitle="Created at:"
              updateFormValue={updateFormValue}
              updateType="createdAt"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              inputStyle="col-span-12 md:col-span-10"
              defaultValue="10/03/2023 10:30PM"
              styleP='py-[10px] rounded-[10px]'
              disabled
            />
            <SelectBox
              labelTitle="Required Action:"
              updateFormValue={updateFormValue}
              updateType="requiredAction"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              inputStyle="col-span-12 md:col-span-10"
              styleP='py-[10px] rounded-[10px]'
              options={[
                { value: '', label: 'Select action' },
                { value: 'action1', label: 'Action 1' },
                { value: 'action2', label: 'Action 2' },
              ]}
            />
            <p className='text-[#344054] text-lg sm:text-xl md:text-2xl font-semibold mt-4'>General Settings</p>
            <InputText
              labelTitle="User Name:"
              updateFormValue={updateFormValue}
              updateType="username"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              inputStyle="col-span-12 md:col-span-10"
              defaultValue="anh_tt"
              styleP='py-[10px] rounded-[10px]'
            />
            <InputText
              labelTitle="Email:"
              updateFormValue={updateFormValue}
              updateType="email"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              inputStyle="col-span-12 md:col-span-10"
              defaultValue="anhtt.thd@email.com"
              styleP='py-[10px] rounded-[10px]'
            />
            <InputText
              labelTitle="First Name:"
              updateFormValue={updateFormValue}
              updateType="firstName"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              inputStyle="col-span-12 md:col-span-10"
              defaultValue="The Anh"
              styleP='py-[10px] rounded-[10px]'
            />
            <InputText
              labelTitle="Last Name:"
              updateFormValue={updateFormValue}
              updateType="lastName"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              inputStyle="col-span-12 md:col-span-10"
              defaultValue="Tran"
              styleP='py-[10px] rounded-[10px]'
            />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <label className='text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2' htmlFor="">Groups:</label>
              <button className='col-span-12 md:col-span-3 md:col-start-3 flex justify-center gap-3 items-center bg-[#F9FAFB] hover:text-[#4a8aac] transition-all duration-500 input shadow custom-input-shadow py-3 appearance-none border border-[#D0D5DD] my-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] text-sm sm:text-lg font-medium text-[#009FF5]'>
                <PlusOutlined /> Join Group
              </button>
            </div>
          </form>
        );
      case 'roleMapping':
        return <RoleMappingTable roleMappingData={roleMappingData} />;
      case 'groups':
        return <GroupsTable groupsData={groupsData} handleDelete={handleDeleteGroup} />;
      case 'session':
        return <SessionTable sessionData={sessionData} />;
      default:
        return null;
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
          <button onClick={() => { 
            navigate('/admin/users/add-new')
           }} className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white'>
            Add User
          </button>
        </div>
      </div>
      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <div className="flex items-center gap-2 cursor-pointer mb-10" onClick={() => { navigate('/admin/users') }}>
          <LeftOutlined className='font-semibold text-[#344054]' />
          <p className='text-lg sm:text-xl md:text-2xl font-semibold text-[#344054]'>anhTT</p>
        </div>
        <div className="flex flex-wrap mb-9">
          <button
            className={`px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-2xl border border-[#D0D5DD] rounded-tl-lg rounded-bl-lg ${activeTab === 'details' ? 'text-[#FCFCFC] bg-[#009FF5]' : 'text-[#344054]'}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-2xl border-y border-r border-[#D0D5DD] ${activeTab === 'roleMapping' ? 'text-[#FCFCFC] bg-[#009FF5]' : 'text-[#344054]'}`}
            onClick={() => setActiveTab('roleMapping')}
          >
            Role Mapping
          </button>
          <button
            className={`px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-2xl border-y border-r border-[#D0D5DD] ${activeTab === 'groups' ? 'text-[#FCFCFC] bg-[#009FF5]' : 'text-[#344054]'}`}
            onClick={() => setActiveTab('groups')}
          >
            Groups
          </button>
          <button
            className={`px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-2xl border-y border-r border-[#D0D5DD] rounded-tr-lg rounded-br-lg ${activeTab === 'session' ? 'text-[#FCFCFC] bg-[#009FF5]' : 'text-[#344054]'}`}
            onClick={() => setActiveTab('session')}
          >
            Session
          </button>
        </div>
        {renderTabContent()}
      </div>
    </section>
  );
}
