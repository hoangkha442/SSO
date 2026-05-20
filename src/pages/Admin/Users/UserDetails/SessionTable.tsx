import React from 'react';
import { Table } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import moment from 'moment';

interface Session {
  started: number;  
  lastAccess: number; 
  ipAddress: string;
  clients: string;
}

interface SessionTableProps {
  sessionData: Session[];
}

const SessionTable: React.FC<SessionTableProps> = ({ sessionData = [] }) => {
  const columns = [
    {
      title: <div className="leading-[65px]">Started</div>,
      dataIndex: 'started',
      key: 'started',
      render: (timestamp: number) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}</div>,
    },
    {
      title: <div className="leading-[65px]">Last-Access</div>,
      dataIndex: 'lastAccess',
      key: 'lastAccess',
      render: (timestamp: number) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}</div>,
    },
    {
      title: <div className="leading-[65px]">IP-Address</div>,
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">Clients</div>,
      dataIndex: 'clients',
      key: 'clients',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="text-center leading-[65px]">Action</div>,
      key: 'action',
      render: (_: any) => (
        <div className='pl-2 bg-[#fccac9] h-[60px] flex justify-center items-center'>
          <LogoutOutlined className="text-[#1d232d] text-2xl font-semibold hover:text-gray-700 cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto mt-4 sm:mt-6">
      <Table
        bordered={true}
        columns={columns}
        dataSource={sessionData}
        pagination={false}
        rowClassName="bg-white divide-y divide-gray-200"
        rowKey={(record) => `${record.started}-${record.ipAddress}`}
      />
    </div>
  );
};

export default SessionTable;
