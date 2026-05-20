import React from 'react';
import { Table } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

interface Member {
  key: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  membership: string;
}

interface MembersTableProps {
  membersData: Member[];
}

const MembersTable: React.FC<MembersTableProps> = ({ membersData }) => {
  const columns = [
    {
      title: <div className="leading-[65px]">Name</div>,
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">Email</div>,
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">FirstName</div>,
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">LastName</div>,
      dataIndex: 'lastName',
      key: 'lastName',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">Membership</div>,
      dataIndex: 'membership',
      key: 'membership',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="text-center leading-[65px]">Leave</div>,
      key: 'leave',
      render: (_: any) => (
        <div className='pl-2 bg-[#fccac9] h-[60px] flex justify-center items-center'>
          <LogoutOutlined
            className="text-[#1d232d] text-2xl font-semibold hover:text-gray-700 cursor-pointer"
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
        dataSource={membersData}
        pagination={{ pageSize: 10 }}
        rowClassName="bg-white divide-y divide-gray-200"
        rowKey="key"
      />
    </div>
  );
};

export default MembersTable;
