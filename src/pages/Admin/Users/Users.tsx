import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Modal, Dropdown, Menu, notification } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import axios from 'axios';
import SearchBar from '../../../components/Input/SearchBar';
import { baseURL } from '../../../api/AxiosGet';

interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  group: string;
}

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token'); 

      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.get(`${baseURL}/users`, config);
        const users = await Promise.all(
          response.data.map(async (user: any) => {
            // Fetch group for each user by user ID
            const groupResponse = await axios.get(`${baseURL}/users/${user.id}/groups`, config);
            const groupNames = groupResponse.data.map((group: any) => group.name).join(', ');

            return {
              id: user.id,
              username: user.username,
              firstname: user.firstName || '',
              lastname: user.lastName || '',
              email: user.email || '',
              group: groupNames || 'No Group',
            };
          })
        );

        setUsersData(users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, pageSize]);

  const handleEditClick = (userId: string) => {
    navigate(`/users/detail/${userId}`);
  };

  const handleDeleteClick = async (userId: string, username: string) => {
    Modal.confirm({
      title: `Are you sure you want to delete the user "${username}"?`,
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          };

          const response = await axios.delete(`${baseURL}/users/${userId}`, config);

          if (response.status === 204) {
            notification.success({
              message: 'User Deleted',
              description: `The user "${username}" has been successfully deleted.`,
            });

            setUsersData((prevUsers) => prevUsers.filter(user => user.id !== userId));
          } else {
            throw new Error('Failed to delete user');
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          notification.error({
            message: 'Delete Failed',
            description: 'An error occurred while deleting the user. Please try again.',
          });
        }
      },
      onCancel: () => {
        notification.info({
          message: 'Delete Canceled',
          description: `The deletion of the user "${username}" was canceled.`,
        });
      },
    });
  };

  const columns = [
    {
      title: <div className="leading-[65px]">Username</div>,
      dataIndex: 'username',
      key: 'username',
      width: 150,
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">FirstName</div>,
      dataIndex: 'firstname',
      key: 'firstname',
      width: 150,
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">LastName</div>,
      dataIndex: 'lastname',
      key: 'lastname',
      width: 150,
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">Email</div>,
      dataIndex: 'email',
      key: 'email',
      width: 250,
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="leading-[65px] w-[320px] xl:w-full">Group</div>,
      dataIndex: 'group',
      key: 'group',
      width: 300,
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="text-center leading-[65px]">Action</div>,
      key: 'action',
      width: 100,
      render: (_: any, record: User) => {
        const menu = (
          <Menu>
            <Menu.Item key="1" onClick={() => handleEditClick(record.id)}>
              Edit
            </Menu.Item>
            <Menu.Item key="2" onClick={() => handleDeleteClick(record.id, record.username)}>
              Delete
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown trigger={['click']} overlay={menu} placement="bottom" arrow>
            <div className="pl-2 bg-[#fccac9] h-[60px] flex justify-center items-center">
              <MoreOutlined
                className="text-[#1d232d] text-2xl font-semibold hover:text-gray-700 cursor-pointer"
              />
            </div>
          </Dropdown>
        );
      },
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="flex gap-4 sm:gap-5 items-center">
        <div className="flex-1">
          <SearchBar 
            searchText=""
            setSearchText={() => {}}
            styleClass=""
            styleInput='py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl'
            styleIcon='text-xl sm:text-2xl top-3 sm:top-4 mt-1'
          />
        </div>
        <div className="text-center sm:text-end">
          <button onClick={() => navigate('/users/add-new')} className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white'>
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9 overflow-x-auto">
        <p className='text-lg sm:text-xl md:text-2xl font-semibold'>Users</p>
        <div className="mt-4 sm:mt-6">
          <Table 
            bordered={true}
            columns={columns}
            dataSource={usersData}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: usersData.length,
              showSizeChanger: true,
              onChange: handleTableChange
            }} 
            rowClassName="bg-white divide-y divide-gray-200"
            rowKey="id"
            scroll={{ x: '100%' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Users;
