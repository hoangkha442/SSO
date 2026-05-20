import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Dropdown, Menu, Button, Modal, notification } from 'antd';
import { FaEllipsisV } from 'react-icons/fa';
import SearchBar from '../../../components/Input/SearchBar';
import { getData } from '../../../api/AxiosGet';
import axios from 'axios';
import { baseURL } from '../../../api/AxiosDelete';

interface Client {
  id: any;
  clientId: string;
  name: string;
  types: string;
  description: string;
  homeUrl: string;
}

const Clients: React.FC = () => {
  const navigate = useNavigate();
  const [clientList, setClientList] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const { response } = getData({
    endpoint: 'clients',
    url: ''
  });

  useEffect(() => {
    if (response && response.length) {
      let data = response.map((item: any) => ({
        id: item.id || '---',
        clientId: item.clientId || '---',
        name: item.name || '---',
        types: item.protocol || '---',
        description: item.description || '---',
        homeUrl: item.baseUrl || '---',
        rootUrl: item.rootUrl || '---',
        webOrigins: item.webOrigins || '---',
        redirectUris: item.redirectUris || '-'
      }));
      setClientList(data);
    }
  }, [response]);

  const handleEditClick = (id: string) => {
    navigate(`/clients/detail/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this client?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          };
          await axios.delete(`${baseURL}clients/${id}`, config);
          notification.success({
            message: 'Delete Successful',
            description: 'Client has been deleted successfully.',
          });
          setClientList(clientList.filter(client => client.id !== id));
        } catch (error) {
          console.error('Error deleting client:', error);
          notification.error({
            message: 'Delete Failed',
            description: 'An error occurred while deleting the client.',
          });
        }
      },
    });
  };

  const menu = (id: string) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleEditClick(id)}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleDeleteClick(id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: <div className="leading-[65px]">Client ID</div>,
      dataIndex: 'clientId',
      key: 'clientId',
      width: '150px',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center text-custome'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">Name</div>,
      dataIndex: 'name',
      key: 'name',
      width: '150px',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center text-custome'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">Types</div>,
      dataIndex: 'types',
      key: 'types',
      width: '150px',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center text-custome'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">Description</div>,
      dataIndex: 'description',
      key: 'description',
      width: '600px',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center text-custome'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">HomeURL</div>,
      dataIndex: 'homeUrl',
      key: 'homeUrl',
      width: '150px',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center whitespace-nowrap text-custome'>{text}</div>,
    },
    {
      title: <div className="text-center leading-[65px]">Action</div>,
      key: 'action',
      width: '150px',
      render: (_: any, record: Client) => (
        <div className='pl-2 bg-[#fccac9] h-[60px] flex justify-center items-center'>
          <Dropdown overlay={menu(record.id)} trigger={['click']}>
            <Button type="text" icon={<FaEllipsisV className="text-[#344054] text-2xl font-semibold hover:text-gray-700 cursor-pointer" />} />
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center">
        <div className="flex-1 w-full">
          <SearchBar 
            styleClass=''
            searchText=""
            setSearchText={() => {}}
            styleInput='py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl' 
            styleIcon='text-xl sm:text-2xl top-3 sm:top-4'
            placeholderText="Search"
          />
        </div>
        <div className="text-end w-full sm:w-auto">
          <button onClick={() => { navigate('/clients/add-new') }} className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white'>
            Create New Client
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <p className='text-xl sm:text-2xl font-semibold'>Clients</p>
        <div className="overflow-x-auto mt-4 sm:mt-6">
          <Table 
            bordered={true}
            columns={columns} 
            dataSource={clientList} 
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: clientList.length,
              onChange: (page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              }
            }}
            rowClassName="bg-white divide-y divide-gray-200"
            rowKey="clientId"
          />
        </div>
      </div>
    </section>
  );
}

export default Clients;
