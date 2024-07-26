import React from 'react';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineDown, AiOutlineUp, AiOutlinePlus } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { message } from 'antd';

export default function SideBar() {
  const location = useLocation();
  const token = localStorage.getItem('ADMIN_TOKEN');

  const isActive = (path) => location.pathname === path;

  const MenuLink = ({ to, icon: Icon, label, isDropdown }) => (
    <div className="relative mt-2 sm:mt-4">
      <Link to={to} className={`flex items-center gap-2 sm:gap-4 rounded-lg p-2 sm:p-3 w-full transition duration-300 ${isActive(to) ? 'bg-[#009FF5] text-white' : 'text-black'}`}>
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive(to) ? 'text-white' : 'text-[#344054]'}`} />
        <div className="block text-start flex-1">
          <p className={`font-normal text-xs sm:text-sm md:text-xl ${isActive(to) ? 'text-white' : 'text-[#344054]'}`}>{label}</p>
        </div>
        {isDropdown && (isActive(to) ? (
          <AiOutlineUp className="hidden sm:block w-4 h-4 sm:w-5 sm:h-5 text-white transition duration-300" />
        ) : (
          <AiOutlineDown className="hidden sm:block w-4 h-4 sm:w-5 sm:h-5 text-[#344054] transition duration-300" />
        ))}
      </Link>
    </div>
  );

  const SubMenuLink = ({ to, label, onClick }) => (
    <Link to={to} onClick={onClick} className='sm:mt-2 sm:text-sm md:text-xl text-xs font-normal sm:ml-14 text-[#344054] ml-2 mt-1'>
      {label}
    </Link>
  );

  const renderAdminLinks = () => (
    <>
      <MenuLink to="/admin/clients" icon={AiOutlineHome} label="Clients" />
      <MenuLink to="/admin/groups" icon={FaUser} label="Groups" />
      <MenuLink to="/admin/users" icon={FaUser} label="Users" />
      <div className="">
        <MenuLink to="/admin/real-settings" icon={AiOutlineHome} label="Real Settings" isDropdown />
        {isActive('/admin/real-settings') && (
          <div className="transition duration-300 ease-in-out transform flex flex-col">
            <SubMenuLink to="#" onClick={() => { message.warning('Tính năng chưa phát triển!') }} label="Login" />
            <SubMenuLink to="#" onClick={() => { message.warning('Tính năng chưa phát triển!') }} label="Themes" />
            <SubMenuLink to="/admin/real-settings/registration" label="Registration" />
          </div>
        )}
      </div>
    </>
  );

  const renderUserLinks = () => (
    <>
      <div>
        <MenuLink to="/home/my-apps" icon={AiOutlineHome} label="My Apps" isDropdown />
        {isActive('/home/my-apps') && (
          <div className="transition duration-300 ease-in-out transform">
            <p className='mt-2 sm:text-sm md:text-xl text-xs font-normal ml-2 sm:ml-14 text-[#344054]'>Work</p>
            <div className="flex items-center mt-2 ml-2 sm:ml-14">
              <button className="flex items-center gap-1 sm:gap-2 text-[#344054] text-xs sm:text-sm md:text-xl" onClick={() => { message.warning('Tính năng chưa phát triển!'); }}>
                Add section
                <AiOutlinePlus className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5' />
              </button>
            </div>
          </div>
        )}
      </div>
      <MenuLink to="/home/my-account" icon={FaUser} label="Account" className="mt-4" />
    </>
  );

  return (
    <section className='w-[160px] sm:w-64 border-x border-[#D0D3D9]'>
      <div className="sm:h-[100px] h-16 flex items-center justify-center sm:p-4 border-b border-[#D0D3D9] sm:w-[260px] w-full">
        <div className="h-10 w-24 sm:h-16 sm:w-36">
          <img src={logo} alt="logo" className='w-full h-full object-cover' />
        </div>
      </div>
      <div className="menu sm:p-4 p-2 sm:w-[260px] w-[140px]" style={{ height: 'calc(100vh - 100px)' }}>
        <div className="flex flex-col">
          {token ? renderAdminLinks() : renderUserLinks()}
        </div>
      </div>
    </section>
  );
}
