import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Modal, Checkbox, Table, notification } from 'antd';
import SelectBox from '../../../components/Input/SelectBox';
import InputText from '../../../components/Input/InputText';
import SearchBar from '../../../components/Input/SearchBar';
import { baseURL, getGroups } from '../../../api/AxiosGet';

interface FormData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  requiredAction: string;
}

const AddNewUser: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    requiredAction: ''
  });
  const [viewJoinGroupModal, setViewJoinGroupModal] = useState(false);
  const [groupsRender, setGroupsRender] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  const updateFormValue = (updatedField: { updateType: string; value: string }) => {
    setFormData(prevState => ({
      ...prevState,
      [updatedField.updateType]: updatedField.value
    }));
  };

  const { response, error, fetchData } = getGroups({
    endpoint: "groups",
    url: ""
  });
  console.log('error: ', error);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (viewJoinGroupModal) {
      fetchGroups();
    }
  }, [viewJoinGroupModal]);

  const openNotification = (type: 'success' | 'error', message: string, description: string) => {
    notification[type]({
      message: message,
      description: description,
      duration: 2,
    });
  };

  const fetchGroups = async () => {
    try {
      const filteredGroups = response.filter((item: any) => !item.name.includes('title')).map((item: any, index: number) => ({
        group_id: item.id,
        group_name: item.name,
        key: index
      }));
      setGroupsRender(filteredGroups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleGroupSelection = (groupId: string) => {
    const selected = groupsRender.find(group => group.group_id === groupId);
    setSelectedGroup(selected);
    setViewJoinGroupModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const userPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: 'admin',
          temporary: false
        }
      ],
      username: formData.username
    };

    try {
      const userResponse = await axios.post(`${baseURL}/users`, userPayload, config);
      const userId = userResponse.data.id;

      if (selectedGroup && userId) {
        await axios.put(`${baseURL}/users/${userId}/groups/${selectedGroup.group_id}`, {}, config);
      }

      openNotification('success', 'Add Successful', 'User information has been added successfully.');
      navigate('/users');
    } catch (error) {
      console.error('Error creating user or assigning group:', error);
      openNotification('error', 'Add Failed', 'An error occurred while adding the user.');
    }
  };

  const columnsGroups = [
    {
      title: '',
      dataIndex: 'select',
      width: 30,
      render: (_: any, record: any) => (
        <Checkbox
          checked={selectedGroup && selectedGroup.group_id === record.group_id}
          onChange={() => handleGroupSelection(record.group_id)}
        />
      )
    },
    {
      title: 'Name',
      dataIndex: 'group_name',
      width: 300,
      render: (text: string) => (
        <div className='font-semibold'>{text}</div>
      )
    }
  ];

  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center">
        <div className="flex-1 w-full">
          <SearchBar
            searchText=""
            setSearchText={() => { }}
            styleClass=""
            styleInput='py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl'
            styleIcon='text-xl sm:text-2xl top-3 sm:top-4'
          />
        </div>
        <div className="text-end w-full sm:w-auto">
          <button className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white' onClick={handleSubmit}>
            Create New User
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/users') }}>
          <LeftOutlined className='font-semibold text-[#344054]' />
          <p className='text-lg sm:text-xl md:text-2xl font-semibold text-[#344054]'>Add User</p>
        </div>
        <form className="pt-0 rounded-[10px]" onSubmit={handleSubmit}>
          <SelectBox
            labelTitle="Required Action:"
            updateFormValue={updateFormValue}
            updateType="requiredAction"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
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
            defaultValue={formData.username}
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Email:"
            updateFormValue={updateFormValue}
            updateType="email"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            defaultValue={formData.email}
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="First Name:"
            updateFormValue={updateFormValue}
            updateType="firstName"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            defaultValue={formData.firstName}
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Last Name:"
            updateFormValue={updateFormValue}
            updateType="lastName"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            defaultValue={formData.lastName}
            styleP='py-[10px] rounded-[10px]'
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <label className='text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2' htmlFor="">Groups:</label>
            <button
              type="button"
              onClick={() => setViewJoinGroupModal(true)}
              className='col-span-12 md:col-span-3 md:col-start-3 flex justify-center gap-3 items-center bg-[#F9FAFB] hover:text-[#4a8aac] transition-all duration-500 input shadow custom-input-shadow py-3 appearance-none border border-[#D0D5DD] my-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] text-sm sm:text-lg font-medium text-[#009FF5]'>
              <PlusOutlined /> Join Group
            </button>
          </div>

          {/* Display the selected group */}
          {selectedGroup && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mt-4">
              <label className='text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2'>Selected Group:</label>
              <div className='col-span-12 md:col-span-10'>{selectedGroup.group_name}</div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 text-center gap-4">
            <button type="submit" className="bg-[#009FF5] text-white px-4 py-2 rounded-[10px] hover:bg-blue-500 col-span-1 md:col-span-1 md:col-start-1 text-center text-sm sm:text-lg mt-8">
              Save
            </button>
            <button type="button" className="bg-[#F9FAFB] text-[#344054] px-4 py-2 rounded-[10px] hover:bg-gray-200 col-span-1 md:col-span-2 text-center text-sm sm:text-lg mt-8 border border-[#D0D5DD]" onClick={() => navigate('/users')}>
              Revert
            </button>
          </div>
        </form>
      </div>

      <Modal title="Assign to Groups" open={viewJoinGroupModal} onOk={() => setViewJoinGroupModal(false)} onCancel={() => setViewJoinGroupModal(false)} centered>
        <div className=''>
          <Table columns={columnsGroups} dataSource={groupsRender} />
        </div>
      </Modal>
    </section>
  );
};

export default AddNewUser;
