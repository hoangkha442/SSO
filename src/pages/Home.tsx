import React from 'react';
import SideBar from '../components/SideBar/SideBar';
import Header from '../components/Header/Header';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { rootState } from '../store/store';

const Home: React.FC = () => {
  const role = useSelector((state: rootState) => state.role.role);
  const navigate = useNavigate();
  const location = useLocation();

  setTimeout(() => {
      if (location.pathname === '/') {
        if (role === 'admin') {
          navigate('/clients');
        } else {
          navigate('/my-apps');
        }
      }
  }, 50);

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
};

export default Home;
