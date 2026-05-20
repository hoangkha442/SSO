import React from 'react';
import logo from '../../assets/logo.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineDown, AiOutlineUp, AiOutlinePlus } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { rootState } from '../../store/store';

interface MenuLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isDropdown?: boolean;
}

interface SubMenuLinkProps {
  to: string;
  label: string;
  onClick?: () => void;
}

const SideBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const currentRole = useSelector((state: rootState) => state.role.role);
  const handleChangePath = () => { 
    if(currentRole === 'user'){
      navigate('/my-apps')
    }else{
      navigate('/clients')
    }
   }
  const isActive = (paths: string[]) => {
    return paths.some(path => location.pathname.startsWith(path));
  };

  const MenuLink: React.FC<MenuLinkProps> = ({ to, icon: Icon, label, isDropdown }) => {
    const activePaths = [to];
    if (to === '/clients') activePaths.push('/clients/detail');
    if (to === '/groups') activePaths.push('/groups/detail');
    if (to === '/users') activePaths.push('/users/detail');
    if (to === '/real-settings') activePaths.push('/real-settings/registration');
    
    return (
      <div className="relative mt-2 sm:mt-4">
        <NavLink to={to} className={`flex items-center gap-2 sm:gap-4 rounded-lg p-2 sm:p-3 w-full transition duration-300 ${isActive(activePaths) ? 'bg-[#009FF5] text-white' : 'text-black'}`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive(activePaths) ? 'text-white' : 'text-[#344054]'}`} />
          <div className="block text-start flex-1">
            <p className={`font-normal text-xs sm:text-sm md:text-xl ${isActive(activePaths) ? 'text-white' : 'text-[#344054]'}`}>{label}</p>
          </div>
          {isDropdown && (isActive(activePaths) ? (
            <AiOutlineUp className="hidden sm:block w-4 h-4 sm:w-5 sm:h-5 text-white transition duration-300" />
          ) : (
            <AiOutlineDown className="hidden sm:block w-4 h-4 sm:w-5 sm:h-5 text-[#344054] transition duration-300" />
          ))}
        </NavLink>
      </div>
    );
  };

  const SubMenuLink: React.FC<SubMenuLinkProps> = ({ to, label, onClick }) => (
    <NavLink to={to} onClick={onClick} className={`sm:mt-2 sm:text-sm md:text-xl text-xs font-normal sm:ml-14 ml-2 mt-1 ${isActive([to]) ? 'text-[#009FF5]' : 'text-[#344054]'}`}>
      {label}
    </NavLink>
  );

  const renderAdminLinks = () => (
    <>
      <MenuLink to="/clients" icon={AiOutlineHome} label="Clients" />
      <MenuLink to="/groups" icon={FaUser} label="Groups" />
      <MenuLink to="/users" icon={FaUser} label="Users" />
      <div>
        <MenuLink to="/real-settings/registration" icon={AiOutlineHome} label="Real Settings" isDropdown />
        {isActive(['/real-settings', '/real-settings/registration']) && (
          <div className="transition duration-300 ease-in-out transform flex flex-col">
            <SubMenuLink to="#" onClick={() => { message.warning('Tính năng chưa phát triển!') }} label="Login" />
            <SubMenuLink to="#" onClick={() => { message.warning('Tính năng chưa phát triển!') }} label="Themes" />
            <SubMenuLink to="/real-settings/registration" label="Registration" />
          </div>
        )}
      </div>
    </>
  );

  const renderUserLinks = () => (
    <>
      <div>
        <MenuLink to="/my-apps" icon={AiOutlineHome} label="My Apps" />
        {isActive(['/']) && (
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
      <MenuLink to="/my-account" icon={FaUser} label="Account" />
    </>
  );

  return (
    <section className='w-[160px] sm:w-64 border-x border-[#D0D3D9]'>
      <div className="sm:h-[100px] h-16 flex items-center justify-center sm:p-4 border-b border-[#D0D3D9] sm:w-[260px] w-full">
        <div className="h-10 w-24 sm:h-16 sm:w-36 cursor-pointer" onClick={() => { handleChangePath() }}>
          <img src={logo} alt="logo" className='w-full h-full object-cover' />
        </div>
      </div>
      <div className="menu sm:p-4 p-2 sm:w-[260px] w-[140px]" style={{ height: 'calc(100vh - 100px)' }}>
        <div className="flex flex-col">
          {currentRole === 'admin' ? renderAdminLinks() : renderUserLinks()}
        </div>
      </div>
    </section>
  );
};

export default SideBar;
