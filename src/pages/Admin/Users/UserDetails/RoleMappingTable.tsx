import React, { useState } from 'react';
import { Table } from 'antd';

interface Role {
  id: string;
  name: string;
  description: string;
}

interface RoleMappingTableProps {
  roleMappingData: Role[];
}

const RoleMappingTable: React.FC<RoleMappingTableProps> = ({ roleMappingData = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
  const columns = [
    {
      title: <div className="leading-[65px]">Role</div>,
      dataIndex: 'name',
      key: 'name',
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
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: roleMappingData.length,
          showSizeChanger: true,
          onChange: handleTableChange
        }} 
        rowClassName="bg-white divide-y divide-gray-200"
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default RoleMappingTable;
