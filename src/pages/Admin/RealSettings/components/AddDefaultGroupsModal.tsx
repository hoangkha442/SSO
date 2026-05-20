import React, { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Modal, Input, Checkbox, Button, notification } from 'antd';
import axios from 'axios';
import { baseURL } from '../../../../api/AxiosGet';

interface Group {
  id: string;
  name: string;
}

interface AddDefaultGroupsModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddDefaultGroupsModal: React.FC<AddDefaultGroupsModalProps> = ({ visible, onClose }) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableGroups, setAvailableGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchAvailableGroups = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.get(`${baseURL}groups`, config);
        setAvailableGroups(response.data);
      } catch (error) {
        console.error('Error fetching available groups:', error);
        notification.error({
          message: 'Fetch Failed',
          description: 'An error occurred while fetching available groups.',
        });
      }
    };

    fetchAvailableGroups();
  }, []);

  const handleCheckboxChange = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredGroups = availableGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGroups = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      await axios.put(`${baseURL}/admin/realms/{realm}/default-groups`, selectedGroups, config);
      notification.success({
        message: 'Groups Added',
        description: 'The default groups have been successfully added.',
      });
      onClose();
    } catch (error) {
      console.error('Error adding groups:', error);
      notification.error({
        message: 'Add Groups Failed',
        description: 'An error occurred while adding default groups.',
      });
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={400}
      closeIcon={<CloseOutlined />}
    >
      <h2 className="text-xl font-semibold mb-4">Add Default Groups</h2>
      <Input
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />
      {filteredGroups.map((group) => (
        <div key={group.id} className="flex items-center mb-2">
          <Checkbox
            checked={selectedGroups.includes(group.id)}
            onChange={() => handleCheckboxChange(group.id)}
          >
            {group.name}
          </Checkbox>
        </div>
      ))}
      <Button
        type="primary"
        className="w-full mt-4"
        onClick={handleAddGroups}
      >
        Add
      </Button>
    </Modal>
  );
};

export default AddDefaultGroupsModal;
