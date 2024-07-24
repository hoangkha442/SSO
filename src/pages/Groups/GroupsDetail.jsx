import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import Tabs from './Tabs';
import MembersTable from './MembersTable';
import RoleMappingTable from './RoleMappingTable';

export default function GroupsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('members');

  const membersData = [
    {
      key: '1',
      name: 'Hai',
      email: 'hai.xyz',
      firstName: 'Hai',
      lastName: 'Nguyen',
      membership: 'Ca Mau App, QLVBCC',
    },
    {
      key: '2',
      name: 'Minh',
      email: 'minh.xyz',
      firstName: 'Minh',
      lastName: 'Tran',
      membership: 'Eximbank',
    },
    {
      key: '3',
      name: 'An',
      email: 'an.xyz',
      firstName: 'An',
      lastName: 'Pham',
      membership: 'Ca Mau App',
    },
  ];

  const roleMappingData = [
    {
      key: '1',
      role: 'Admin',
      description: 'Has full access to all settings',
    },
    {
      key: '2',
      role: 'User',
      description: 'Can view and edit own data',
    },
    {
      key: '3',
      role: 'Viewer',
      description: 'Can view data but cannot edit',
    },
  ];

  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/admin/clients') }}>
          <LeftOutlined className='font-semibold text-[#344054]' />
          <p className='text-xl sm:text-2xl font-semibold text-[#344054]'>{id}</p>
        </div>

        <div className="mt-4 sm:mt-6">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'members' && <MembersTable membersData={membersData} />}
          {activeTab === 'roleMapping' && <RoleMappingTable roleMappingData={roleMappingData} />}
        </div>
      </div>
    </section>
  );
}
