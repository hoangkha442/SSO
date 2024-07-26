import React from 'react';
import SideBar from '../components/SideBar/SideBar';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div className='flex'>
      <SideBar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="bg-[#F5F5F6] p-[2px]" style={{ height: 'calc(100% - 100px)'}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
