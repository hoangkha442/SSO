import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import RoleMappingTable from './RoleMappingTable';
import SessionTable from './SessionTable';
import GroupsTable from './GroupsTable';
import InputText from '../../../../components/Input/InputText';
import SelectBox from '../../../../components/Input/SelectBox';
import SearchBar from '../../../../components/Input/SearchBar';
import { baseURL } from '../../../../api/AxiosGet';
import moment from 'moment';
import { Modal, notification } from 'antd';
import Credentials from './Credentials';

type UpdatedField = {
  updateType: string;
  value: string;
};

type RoleMapping = {
  id: string;
  name: string;
  description: string;
};

type Group = {
  id: string;
  name: string;
  path: string;
};

type Session = {
  started: number;
  lastAccess: number;
  ipAddress: string;
  clients: string;
};

type Credential = {
  id: string;
  type: string;
  createdDate: number;
  userLabel: string;
  temporary: boolean;
};

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('details');
  const [userDetail, setUserDetail] = useState<any>(null);
  const [roleMappingData, setRoleMappingData] = useState<RoleMapping[]>([]);
  const [groupsData, setGroupsData] = useState<Group[]>([]);
  const [sessionData, setSessionData] = useState<Session[]>([]);
  const [credentialsData, setCredentialsData] = useState<Credential[]>([]);
  console.log('credentialsData: ', credentialsData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isJoinGroupModalVisible, setIsJoinGroupModalVisible] = useState<boolean>(false);
  const [availableGroups, setAvailableGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const updateFormValue = (updatedField: UpdatedField) => {
    console.log(updatedField);
  };

  useEffect(() => {
    const fetchUserDetail = async () => {
      const token = localStorage.getItem('token');
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const [userRes, rolesRes, groupsRes, sessionsRes, credentialsRes] = await Promise.all([
          axios.get(`${baseURL}/users/${id}`, config),
          axios.get(`${baseURL}/users/${id}/role-mappings`, config),
          axios.get(`${baseURL}/users/${id}/groups`, config),
          axios.get(`${baseURL}/users/${id}/sessions`, config),
          axios.get(`${baseURL}/users/${id}/credentials`, config),
        ]);

        setUserDetail(userRes.data);

        let allRoleMappings = rolesRes.data.realmMappings;
        if (rolesRes.data.clientMappings && rolesRes.data.clientMappings['realm-management']) {
          allRoleMappings = allRoleMappings.concat(rolesRes.data.clientMappings['realm-management'].mappings);
        }

        setRoleMappingData(allRoleMappings);
        setGroupsData(groupsRes.data);
        setSessionData(
          sessionsRes.data.map((session: any) => ({
            ...session,
            started: session.start,
            clients: 'zimbraEntity',
          }))
        );
        setCredentialsData(credentialsRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Error fetching user details');
        setLoading(false);
      }
    };

    if (id) {
      fetchUserDetail();
    }
  }, [id]);

  const handleDeleteGroup = async (groupId: string) => {
    if (id) {
      const token = localStorage.getItem('token');
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        await axios.delete(`${baseURL}/users/${id}/groups/${groupId}`, config);
        notification.success({
          message: 'Group Removed',
          description: 'The user has been successfully removed from the group.',
        });

        const groupsRes = await axios.get(`${baseURL}/users/${id}/groups`, config);
        setGroupsData(groupsRes.data);
      } catch (error) {
        console.error('Error removing user from group:', error);
        notification.error({
          message: 'Remove Group Failed',
          description: 'An error occurred while removing the user from the group.',
        });
      }
    }
  };

  const fetchAvailableGroups = async () => {
    const token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(`${baseURL}/groups`, config);
      setAvailableGroups(response.data);
    } catch (error) {
      console.error('Error fetching available groups:', error);
    }
  };

  const handleShowJoinGroupModal = () => {
    fetchAvailableGroups();
    setIsJoinGroupModalVisible(true);
  };

  const handleAddUserToGroup = async () => {
    if (selectedGroupId && id) {
      const token = localStorage.getItem('token');
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        await axios.put(`${baseURL}/users/${id}/groups/${selectedGroupId}`, {}, config);
        notification.success({
          message: 'Group Joined',
          description: `User has been successfully added to the group.`,
        });
        setIsJoinGroupModalVisible(false);
        setSelectedGroupId(null);
        const groupsRes = await axios.get(`${baseURL}/users/${id}/groups`, config);
        setGroupsData(groupsRes.data);
      } catch (error) {
        console.error('Error adding user to group:', error);
        notification.error({
          message: 'Join Group Failed',
          description: 'An error occurred while adding the user to the group.',
        });
      }
    }
  };

  const renderTabContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

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
              defaultValue={userDetail?.id || ''}
              styleP="py-[10px] rounded-[10px]"
            />
            <InputText
              labelTitle="Created at:"
              updateFormValue={updateFormValue}
              updateType="createdAt"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              defaultValue={moment(userDetail?.createdAt).format('YYYY-MM-DD HH:mm:ss') || ''}
              styleP="py-[10px] rounded-[10px]"
            />
            <SelectBox
              labelTitle="Required Action:"
              updateFormValue={updateFormValue}
              updateType="requiredAction"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              options={[
                { value: '', label: 'Select action' },
                { value: 'action1', label: 'Action 1' },
                { value: 'action2', label: 'Action 2' },
              ]}
            />
            <p className="text-[#344054] text-lg sm:text-xl md:text-2xl font-semibold mt-4">General Settings</p>
            <InputText
              labelTitle="User Name:"
              updateFormValue={updateFormValue}
              updateType="username"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              defaultValue={userDetail?.username || ''}
              styleP="py-[10px] rounded-[10px]"
            />
            <InputText
              labelTitle="Email:"
              updateFormValue={updateFormValue}
              updateType="email"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              defaultValue={userDetail?.email || ''}
              styleP="py-[10px] rounded-[10px]"
            />
            <InputText
              labelTitle="First Name:"
              updateFormValue={updateFormValue}
              updateType="firstName"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              defaultValue={userDetail?.firstName || ''}
              styleP="py-[10px] rounded-[10px]"
            />
            <InputText
              labelTitle="Last Name:"
              updateFormValue={updateFormValue}
              updateType="lastName"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              defaultValue={userDetail?.lastName || ''}
              styleP="py-[10px] rounded-[10px]"
            />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <label className="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2" htmlFor="">
                Groups:
              </label>
              <button
                type="button"
                className="col-span-12 md:col-span-3 md:col-start-3 flex justify-center gap-3 items-center bg-[#F9FAFB] hover:text-[#4a8aac] transition-all duration-500 input shadow custom-input-shadow py-3 appearance-none border border-[#D0D5DD] my-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] text-sm sm:text-lg font-medium text-[#009FF5]"
                onClick={handleShowJoinGroupModal}
              >
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
      case 'credentials':
        return <Credentials userId={id!} />;
      default:
        return null;
    }
  };




  return (
    <section className="px-4 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center">
        <div className="flex-1 w-full">
          <SearchBar
            styleClass=""
            styleInput="py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl"
            styleIcon="text-xl sm:text-2xl top-3 sm:top-4 mt-1"
            setSearchText={() => {  }}
          />
        </div>
        <div className="text-end w-full sm:w-auto">
          <button onClick={() => navigate('/users/add-new')} className="text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white">
            Add User
          </button>
        </div>
      </div>
      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <div className="flex items-center gap-2 cursor-pointer mb-10" onClick={() => navigate('/users')}>
          <LeftOutlined className="font-semibold text-[#344054]" />
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#344054]">{userDetail?.username}</p>
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
            className={`px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-2xl border-y border-r border-[#D0D5DD] ${activeTab === 'credentials' ? 'text-[#FCFCFC] bg-[#009FF5]' : 'text-[#344054]'}`}
            onClick={() => setActiveTab('credentials')}
          >
            Credentials
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

      {/* Join Group Modal */}
      <Modal
        title="Join Group"
        visible={isJoinGroupModalVisible}
        onOk={handleAddUserToGroup}
        onCancel={() => setIsJoinGroupModalVisible(false)}
        okText="Add"
      >
        <SelectBox
          labelTitle="Available Groups:"
          updateFormValue={(field) => setSelectedGroupId(field.value)}
          updateType="groupId"
          containerStyle="grid grid-cols-1 gap-4 items-center"
          // styleP='py-4'
          options={availableGroups.map(group => ({ value: group.id, label: group.name }))}
        />
      </Modal>
    </section>
  );
};

export default UserDetail;
