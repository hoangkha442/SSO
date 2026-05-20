import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { AiOutlineDown, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import UserService from '../../SSOAuth/UserService';

const Profile: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access-token');
    navigate('/');
    UserService.doLogout();
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="relative">
      <div className="flex items-center pb-0 bg-white lg:flex-row flex-col">
        <div className="lg:flex hidden items-center w-full lg:w-auto cursor-pointer">
          <Dropdown overlay={menu} trigger={['click']}>
            <div className="flex items-center cursor-pointer">
              <img 
                src="https://via.placeholder.com/40" 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover mr-4" 
              />
              <div className="flex flex-col flex-grow">
                <span className="font-semibold text-gray-900">Nguyen Van A</span>
                <span className="text-sm text-gray-500">NguyenVanA@gmail.com</span>
              </div>
              <AiOutlineDown className="text-xl ml-2 hidden lg:block cursor-pointer" />
            </div>
          </Dropdown>
        </div>
        <AiOutlineMenu 
          className="text-2xl ml-4 lg:hidden cursor-pointer" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 z-10 lg:hidden">
          <img 
            src="https://via.placeholder.com/40" 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover mr-4" 
          />
          <div className="flex items-center w-full lg:w-auto">
            <div className="flex flex-col flex-grow">
              <span className="font-semibold text-gray-900">Nguyen Van A</span>
              <span className="text-sm text-gray-500">NguyenVanA@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center p-2">
            <span className="text-gray-900">Notifications</span>
          </div>
          <button className="w-full text-left p-2 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
