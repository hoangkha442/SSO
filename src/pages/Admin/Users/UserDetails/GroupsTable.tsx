import React from 'react';
import { Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Group {
  id: string;
  name: string;
  path: string;
}

interface GroupsTableProps {
  groupsData: Group[];
  handleDelete: (id: string) => void;
}

const GroupsTable: React.FC<GroupsTableProps> = ({ groupsData = [], handleDelete }) => {
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
      render: (_: any, record: Group) => (
        <div className='pl-2 bg-[#fccac9] h-[60px] flex justify-center items-center'>
          <DeleteOutlined
            className="text-[#1d232d] text-2xl font-semibold hover:text-gray-700 cursor-pointer"
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto mt-4 sm:mt-6">
      <Table
        bordered={true}
        columns={columns}
        dataSource={groupsData}
        pagination={false}
        rowClassName="bg-white divide-y divide-gray-200"
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default GroupsTable;
