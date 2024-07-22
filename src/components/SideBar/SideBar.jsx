import React from 'react';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineDown, AiOutlineUp, AiOutlinePlus } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { message } from 'antd';

export default function SideBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <section className='w-64 border-x border-[#D0D3D9]'>
      <div className="h-[100px] flex items-center justify-center p-4 border-b border-[#D0D3D9]">
        <div className="h-16 w-36">
          <img src={logo} alt="logo" className='w-full h-full object-cover'/>
        </div>
      </div>

      <div className="menu p-4" style={{ height: 'calc(100vh - 100px)' }}>
        <div className="flex flex-col">
          <div>
            <Link to='/home/my-apps' className={`flex items-center gap-4 rounded-lg p-3 w-full transition duration-300 ${isActive('/home/my-apps') ? 'bg-[#009FF5] text-white' : 'text-black'}`}>
              <AiOutlineHome className={`w-5 h-5 ${isActive('/home/my-apps') ? 'text-white' : 'text-[#344054]'}`} />
              <div className="text-start flex-1">
                <p className={`font-medium text-xl ${isActive('/home/my-apps') ? 'text-white' : 'text-[#344054]'}`}>My Apps</p>
              </div>
              {isActive('/home/my-apps') ? (
                <AiOutlineUp className="w-5 h-5 text-white transition duration-300" />
              ) : (
                <AiOutlineDown className="w-5 h-5 text-[#344054] transition duration-300" />
              )}
            </Link>
            {isActive('/home/my-apps') && (
              <div className="transition duration-300 ease-in-out transform">
                <p className='mt-2 text-xl font-medium ml-14 text-[#344054]'>Work</p>
                <div className="flex items-center mt-2 ml-14">
                  <button className="flex items-center gap-2 text-[#344054]" onClick={() => { message.warning('Tính năng chưa phát triển!'); }}>
                    Add section
                    <AiOutlinePlus className='w-5 h-5'/>
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link to='/home/my-account' className={`flex items-center gap-4 rounded-lg p-3 mt-4 transition duration-300 ${isActive('/home/my-account') ? 'bg-[#009FF5] text-white' : 'text-black'}`}>
            <FaUser className={`w-5 h-5 ${isActive('/home/my-account') ? 'text-white' : 'text-[#344054]'}`} />
            <p className='font-medium text-xl flex-1'>Account</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
