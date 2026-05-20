import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import Tabs from './Tabs';
import MembersTable from './MembersTable';
import RoleMappingTable from './RoleMappingTable';
import { baseURL } from '../../../api/AxiosGet';

interface Member {
  key: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  membership: string;
  createdTimestamp: string;
}

interface RoleMapping {
  key: string;
  role: string;
  description: string;
}

const GroupsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('members');
  const [membersData, setMembersData] = useState<Member[]>([]);
  const [roleMappingData, setRoleMappingData] = useState<RoleMapping[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const fetchGroupName = async () => {
    try {
      const res = await axios.get(`${baseURL}groups/${id}`, config);
      setGroupName(res.data.name);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataMember = async () => {
    try {
      const res = await axios.get(`${baseURL}groups/${id}/members`, config);
      const data = res.data.map((item: any) => {
        const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
        let date = new Date(item.createdTimestamp);

        return {
          key: item.id,
          name: item.username,
          email: item.email || '',
          firstName: item.firstName || '',
          lastName: item.lastName || '',
          membership: item.membership || '',
          createdTimestamp: `${formatter.format(date.getMonth())} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        };
      });
      setMembersData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataRole = async () => {
    try {
      const res = await axios.get(`${baseURL}groups/${id}`, config);
      const result = Object.entries(res.data.clientRoles).map(([name, value]) => {
        const roleDescription = Array.isArray(value) ? value.join(', ') : '';
        return {
          key: name,
          role: name,
          description: roleDescription,
        };
      });
      setRoleMappingData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGroupName();
  }, [id]);

  useEffect(() => {
    if (activeTab === 'members') {
      fetchDataMember();
    } else if (activeTab === 'roleMapping') {
      fetchDataRole();
    }
  }, [activeTab]);

  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/groups'); }}>
          <LeftOutlined className='font-semibold text-[#344054]' />
          <p className='text-xl sm:text-2xl font-semibold text-[#344054]'>{groupName}</p>
        </div>

        <div className="mt-4 sm:mt-6">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'members' && <MembersTable membersData={membersData} />}
          {activeTab === 'roleMapping' && <RoleMappingTable roleMappingData={roleMappingData} />}
        </div>
      </div>
    </section>
  );
};

export default GroupsDetail;
