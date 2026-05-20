import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Modal, Input, Dropdown, Menu, notification } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import SearchBar from '../../../components/Input/SearchBar';
import { getGroups } from '../../../api/AxiosGet';
import { useUpdate } from '../../../api/AxiosPut';
import { useDelete } from '../../../api/AxiosDelete'; 
import { useCreateGroup } from '../../../api/AxiosPost'; 

type DataType = {
  id: string,
  name: string,
  subGroup: number
}

const Groups: React.FC = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedGroupName, setSelectedGroupName] = useState<string | null>(null);

  const { response, fetchData } = getGroups({
    endpoint: "groups",
    url: ""
  });

  const { update, updateResponse } = useUpdate(); 
  const { remove } = useDelete();
  const { create } = useCreateGroup();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (response && response.length) {
      const groupsData = response.map((item: any) => ({
        id: item.id,
        name: item.name,
        subGroup: item.subGroupCount
      }));
      setGroups(groupsData);
    }
  }, [response]);

  const handleEditClick = (groupId: string) => {
    navigate(`/groups/detail/${groupId}`);
  };

  const handleRenameClick = (groupId: string, groupName: string) => {
    setSelectedGroupId(groupId);
    setSelectedGroupName(groupName);
    setIsRenameModalVisible(true);
  };

  const handleDeleteClick = async (groupId: string, groupName: string) => {
    Modal.confirm({
        title: `Are you sure you want to delete the group "${groupName}"?`,
        content: 'This action cannot be undone.',
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
            const response = await remove({ endpoint: `groups/${groupId}` });

            if (response && response.status === 204) {
                notification.success({
                    message: 'Group Deleted',
                    description: `The group "${groupName}" has been successfully deleted.`,
                });

                setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
            } else {
                console.log('deleteResponse.status: ', response?.status);
                notification.error({
                    message: 'Delete Failed',
                    description: 'An error occurred while deleting the group. Please try again.',
                });
            }
        },
        onCancel: () => {
            notification.info({
                message: 'Delete Canceled',
                description: `The deletion of the group "${groupName}" was canceled.`,
            });
        },
    });
  };

  const handleAcceptRename = () => {
    if (selectedGroupId && selectedGroupName) {
        const data = { name: newGroupName };
        const endpoint = `groups/${selectedGroupId}`;

        update({ data, endpoint });

        setTimeout(() => {
            if (updateResponse?.status === 204) { 
                notification.success({
                    message: 'Group Renamed',
                    description: `The group "${selectedGroupName}" has been renamed to "${newGroupName}".`,
                });
                
                setGroups(prevGroups => prevGroups.map(group =>
                    group.id === selectedGroupId ? { ...group, name: newGroupName } : group
                ));
                
                setIsRenameModalVisible(false);
            } else {
                notification.error({
                    message: 'Rename Failed',
                    description: 'An error occurred while renaming the group. Please try again.',
                });
            }
        }, 200);
    }
};

  const handleCreateNewGroup = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateGroup = async () => {
    const data = { name: newGroupName };
    const response = await create({ data, endpoint: 'groups' });

    if (response && response.status === 201) { 
        notification.success({
            message: 'Group Created',
            description: `The group "${newGroupName}" has been successfully created.`,
        });

        setGroups(prevGroups => [...prevGroups]);
        setIsCreateModalVisible(false);
        setNewGroupName(''); 
        setTimeout(() => {
          window.location.reload();
        }, 500);
    } else {
        notification.error({
            message: 'Creation Failed',
            description: 'An error occurred while creating the group. Please try again.',
        });
    }
};

  const handleCancel = () => {
    setIsRenameModalVisible(false);
    setIsCreateModalVisible(false);
  };

  const columns = [
    {
      title: <div className="leading-[65px]">Name</div>,
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: DataType) => (
        <div
          className='pl-2 bg-[#fccac9] h-[60px] flex items-center text-custome cursor-pointer'
          onClick={() => handleEditClick(record.id)}
        >
          {text}
        </div>
      ),
    },
    {
      title: <div className="leading-[65px]">SubGroup</div>,
      dataIndex: 'subGroup',
      key: 'subGroup',
      render: (text: number, record: DataType) => (
        <div
          className='pl-2 bg-[#fccac9] h-[60px] flex items-center text-custome cursor-pointer'
          onClick={() => handleEditClick(record.id)}
        >
          {text}
        </div>
      ),
    },
    {
      title: <div className="text-center leading-[65px]">Action</div>,
      key: 'action',
      render: (_: any, record: DataType) => {
        const menu = (
          <Menu>
            <Menu.Item key="1" onClick={() => handleRenameClick(record.id, record.name)}>
              Rename
            </Menu.Item>
            <Menu.Item key="2" onClick={() => handleDeleteClick(record.id, record.name)}>
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

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

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
          <button className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white' onClick={handleCreateNewGroup}>
            Create New Group
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <p className='text-xl sm:text-2xl font-semibold'>Groups</p>
        <div className="overflow-x-auto mt-4 sm:mt-6">
          <Table 
            bordered={true}
            columns={columns} 
            dataSource={groups} 
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: groups.length,
              showSizeChanger: true,
              onChange: handleTableChange
            }} 
            rowClassName="bg-white divide-y divide-gray-200"
            rowKey="id"
          />
        </div>
      </div>

      <Modal title="Rename Group" visible={isRenameModalVisible} onOk={handleAcceptRename} onCancel={handleCancel}>
        <Input
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Enter new group name"
        />
      </Modal>

      <Modal title="Create New Group" visible={isCreateModalVisible} onOk={handleCreateGroup} onCancel={handleCancel}>
        <Input
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Enter new group name"
        />
      </Modal>
    </section>
  );
}

export default Groups;
