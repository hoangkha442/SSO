import React from 'react';
import { Table, Dropdown, Menu, notification } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

interface Group {
  name: string;
  path: string;
}

interface DefaultGroupsTableProps {
  data: Group[];
}

const DefaultGroupsTable: React.FC<DefaultGroupsTableProps> = ({ data }) => {
  const handleUnassign = (name: string) => {
    console.log('name: ', name);
    notification.info({
      message: 'Feature Under Development',
      description: 'This feature is under development.',
      placement: 'topRight',
      duration: 2,
    });
  };

  const columns = [
    {
      title: <div className="leading-[65px]">Name</div>,
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">Path</div>,
      dataIndex: 'path',
      key: 'path',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="text-center leading-[65px]">Action</div>,
      key: 'action',
      render: (record: Group) => (
        <div className='pl-2 bg-[#fccac9] h-[60px] flex justify-center items-center'>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="unassign" onClick={() => handleUnassign(record.name)}>
                  Unassign
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <MoreOutlined
              className="text-[#1d232d] text-2xl font-semibold hover:text-gray-700 cursor-pointer"
            />
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto mt-4 sm:mt-6">
      <Table
        bordered={true}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        rowClassName="bg-white divide-y divide-gray-200"
        rowKey="name"
      />
    </div>
  );
};

export default DefaultGroupsTable;
