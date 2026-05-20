import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, notification, Modal, Input } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import { baseURL } from '../../../../api/AxiosGet';

type Credential = {
  id: string;
  type: string;
  createdDate: number;
  userLabel: string;
  temporary: boolean;
  credentialData: string;
};

type CredentialsProps = {
  userId: string;
};

const Credentials: React.FC<CredentialsProps> = ({ userId }) => {
  const [credentialsData, setCredentialsData] = useState<Credential[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [editedLabel, setEditedLabel] = useState<string>('');
  const [visibleData, setVisibleData] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchCredentials();
    }
  }, [userId]);

  const fetchCredentials = async () => {
    const token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(`${baseURL}/users/${userId}/credentials`, config);
      setCredentialsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching credentials:', error);
      notification.error({
        message: 'Fetch Credentials Failed',
        description: 'An error occurred while fetching credentials.',
      });
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      notification.error({
        message: 'Password Mismatch',
        description: 'The new password and confirmation password do not match.',
      });
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const payload = {
        type: 'password',
        value: newPassword,
        temporary: false,
      };

      await axios.put(`${baseURL}/users/${userId}/reset-password`, payload, config);
      notification.success({
        message: 'Password Reset Successful',
        description: 'The user\'s password has been successfully reset.',
      });
      setIsModalVisible(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error resetting password:', error);
      notification.error({
        message: 'Reset Password Failed',
        description: 'An error occurred while resetting the password.',
      });
    }
  };

  const handleEditLabel = (credentialId: string, currentLabel: string) => {
    setEditingLabelId(credentialId);
    setEditedLabel(currentLabel);
  };

  const handleSaveLabel = async (credentialId: string) => {
    console.log('credentialId: ', credentialId);
    notification.warning({
      message: 'Undeveloped feature', 
      description: 'We will develop this feature soon.',
    })
    // const token = localStorage.getItem('token');
    // try {
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'application/json',
    //     },
    //   };
    //   const payload = { userLabel: editedLabel };
    //   const response = await axios.put(`${baseURL}/users/${userId}/credentials/${credentialId}`, payload, config);
  
    //   if (response.status === 204) {
    //     notification.success({
    //       message: 'Label Updated',
    //       description: 'The credential label has been successfully updated.',
    //     });
    //     setEditingLabelId(null);
    //     fetchCredentials();
    //   } else {
    //     throw new Error('Failed to update label');
    //   }
    // } catch (error) {
    //   console.error('Error updating label:', error);
  
    //   if (axios.isAxiosError(error) && error.response?.status === 404) {
    //     notification.error({
    //       message: 'Update Label Failed',
    //       description: 'The update operation is not supported or the endpoint was not found.',
    //     });
    //   } else {
    //     notification.error({
    //       message: 'Update Label Failed',
    //       description: 'An error occurred while updating the label.',
    //     });
    //   }
    // }
  };

  const handleCancelEdit = () => {
    setEditingLabelId(null);
    setEditedLabel('');
  };

  const showResetPasswordModal = () => {
    setIsModalVisible(true);
  };

  const handleToggleDataVisibility = (data: string) => {
    setVisibleData(data);
  };

  const columns = [
    {
      title: <div className="leading-[65px]">Type</div>,
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
    },
    {
      title: <div className="leading-[65px]">CreatedDate</div>,
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date: number) => (
        <div className="pl-2 bg-[#fccac9] h-[60px] flex items-center">
          {moment(date).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      ),
    },
    {
      title: <div className="leading-[65px]">Label</div>,
      dataIndex: 'userLabel',
      key: 'userLabel',
      render: (_: any, record: Credential) => (
        <div className="pl-2 bg-[#fccac9] h-[60px] flex items-center">
          {editingLabelId === record.id ? (
            <>
              <Input
                value={editedLabel}
                onChange={(e) => setEditedLabel(e.target.value)}
                style={{ width: 200, marginRight: 10 }}
              />
              <Button
                icon={<SaveOutlined />}
                onClick={() => handleSaveLabel(record.id)}
                style={{ marginRight: 10 }}
              />
              <Button
                icon={<CloseOutlined />}
                onClick={handleCancelEdit}
              />
            </>
          ) : (
            <>
              {record.userLabel}
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEditLabel(record.id, record.userLabel)}
                style={{ marginLeft: 10 }}
              />
            </>
          )}
        </div>
      ),
    },
    {
      title: <div className="leading-[65px]">Temporary</div>,
      dataIndex: 'temporary',
      key: 'temporary',
      render: (temp: boolean) => (
        <div className="pl-2 bg-[#fccac9] h-[60px] flex items-center">
          {temp ? 'Yes' : 'No'}
        </div>
      ),
    },
    {
      title: <div className="leading-[65px]">Data</div>,
      key: 'data',
      render: (_: any, record: Credential) => (
        <div className="pl-2 bg-[#fccac9] h-[60px] flex justify-center items-center">
          <Button style={{ marginLeft: '10px' }} onClick={() => handleToggleDataVisibility(record.credentialData)}>
            Show Data
          </Button>
        </div>
      ),
    },
    {
      title: <div className="leading-[65px]">Action</div>,
      key: 'action',
      render: (_: any) => (
        <div className="pl-2 bg-[#fccac9] h-[60px] flex justify-center items-center">
          <Button onClick={showResetPasswordModal}>Reset Password</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-auto mt-4 sm:mt-6">
        <Table
          bordered={true}
          columns={columns}
          dataSource={credentialsData}
          loading={loading}
          rowClassName="bg-white divide-y divide-gray-200"
          rowKey="id"
          pagination={false}
        />
      </div>

      {/* Modal for Credential Data */}
      <Modal
        title="Credential Data"
        visible={!!visibleData}
        onCancel={() => setVisibleData(null)}
        footer={[
            <Button key="close" onClick={() => setVisibleData(null)}>
            Close
            </Button>,
        ]}
        >
        <Table
            bordered
            dataSource={Object.entries(JSON.parse(visibleData || '{}')).map(([key, value]) => ({
            name: key,
            value: typeof value === 'object' ? JSON.stringify(value) : value,
            }))}
            columns={[
            {
                title: <div className="leading-[65px]">Name</div>,
                dataIndex: 'name',
                key: 'name',
                render: (text) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
            },
            {
                title: <div className="leading-[65px]">Value</div>,
                dataIndex: 'value',
                key: 'value',
                render: (text) => <div className='pl-2 bg-[#fccac9] h-[60px] flex items-center'>{text}</div>,
            },
            ]}
            pagination={false}
            rowClassName="bg-white divide-y divide-gray-200"
        />
        </Modal>



      {/* Modal for Reset Password */}
      <Modal
        title="Reset Password"
        visible={isModalVisible}
        onOk={handleResetPassword}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input.Password
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input.Password
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default Credentials;
