import React from 'react';
import { Table } from 'antd';

interface RoleMapping {
  key: string;
  role: string;
  description: string;
}

interface RoleMappingTableProps {
  roleMappingData: RoleMapping[];
}

const RoleMappingTable: React.FC<RoleMappingTableProps> = ({ roleMappingData }) => {
  const columns = [
    {
      title: <div className="leading-[65px]">Role</div>,
      dataIndex: 'role',
      key: 'role',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">Description</div>,
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
  ];

  return (
    <div className="overflow-x-auto mt-4 sm:mt-6">
      <Table
        bordered={true}
        columns={columns}
        dataSource={roleMappingData}
        pagination={{ pageSize: 10 }}
        rowClassName="bg-white divide-y divide-gray-200"
        rowKey="key"
      />
    </div>
  );
};

export default RoleMappingTable;
