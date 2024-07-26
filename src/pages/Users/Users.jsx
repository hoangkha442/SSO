import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/Input/SearchBar';
import { MoreOutlined } from '@ant-design/icons';

export default function Users() {
  const navigate = useNavigate();

  const usersData = [
    {
      id: '1',
      username: 'user1',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      group: 'QLVBCC',
    },
    {
      id: '2',
      username: 'user2',
      firstname: 'Jane',
      lastname: 'Doe',
      email: 'jane.doe@example.com',
      group: 'CaMauApp',
    },
    {
      id: '3',
      username: 'user3',
      firstname: 'Alice',
      lastname: 'Smith',
      email: 'alice.smith@example.com',
      group: 'Eximbank',
    },
  ];

  const handleEditClick = (userId) => {
    navigate(`/admin/users/detail/${userId}`);
  };

  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="flex gap-4 sm:gap-5 items-center">
        <div className="flex-1">
          <SearchBar 
            styleClass=''
            styleInput='py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl' 
            styleIcon='text-xl sm:text-2xl top-3 sm:top-4 mt-1'
          />
        </div>
        <div className="text-center sm:text-end">
          <button onClick={() => navigate('/admin/users/add-new')} className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white'>
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <p className='text-lg sm:text-xl md:text-2xl font-semibold'>Users</p>
        <div className="overflow-x-auto mt-4 sm:mt-6">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
            <thead>
              <tr>
                <th scope="col" className="text-left text-xs sm:text-base md:text-lg font-semibold text-[#344054] tracking-wider py-0 pl-5">
                  <div className='pl-2 bg-[#fccac9] h-[60px] md:h-[80px] leading-[60px] md:leading-[80px] whitespace-nowrap'>
                    Username
                  </div>
                </th>
                <th scope="col" className="text-left text-xs sm:text-base md:text-lg font-semibold text-[#344054] tracking-wider py-0 pl-2">
                  <div className='pl-2 bg-[#fccac9] h-[60px] md:h-[80px] leading-[60px] md:leading-[80px] whitespace-nowrap'>
                    First Name
                  </div>
                </th>
                <th scope="col" className="text-left text-xs sm:text-base md:text-lg font-semibold text-[#344054] tracking-wider py-0 pl-2">
                  <div className='pl-2 bg-[#fccac9] h-[60px] md:h-[80px] leading-[60px] md:leading-[80px] whitespace-nowrap'>
                    Last Name
                  </div>
                </th>
                <th scope="col" className="text-left text-xs sm:text-base md:text-lg font-semibold text-[#344054] tracking-wider py-0 pl-2">
                  <div className='pl-2 bg-[#fccac9] h-[60px] md:h-[80px] leading-[60px] md:leading-[80px] whitespace-nowrap'>
                    Email
                  </div>
                </th>
                <th scope="col" className="text-left text-xs sm:text-base md:text-lg font-semibold text-[#344054] tracking-wider py-0 pl-2">
                  <div className='pl-2 bg-[#fccac9] h-[60px] md:h-[80px] leading-[60px] md:leading-[80px] whitespace-nowrap'>
                    Group
                  </div>
                </th>
                <th scope="col" className="text-left text-xs sm:text-base md:text-lg font-semibold text-[#344054] tracking-wider py-0 pr-5">
                  <div className='pl-2 bg-[#fccac9] h-[60px] md:h-[80px] leading-[60px] md:leading-[80px] whitespace-nowrap'>
                    Action
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersData.map((user, index) => (
                <tr key={index} className='px-5'>
                  <td className="whitespace-nowrap text-xs sm:text-base md:text-lg font-medium text-[#344054] h-full py-0 pl-5">
                    <div className='bg-[#fccac9] pl-2 h-[60px] md:h-[80px] leading-[60px] md:leading-[80px]'>{user.username}</div>
                  </td>
                  <td className="whitespace-nowrap text-xs sm:text-base md:text-lg font-medium text-[#344054] h-full py-0 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] md:h-[80px] leading-[60px] md:leading-[80px]'>{user.firstname}</div>
                  </td>
                  <td className="whitespace-nowrap text-xs sm:text-base md:text-lg font-medium text-[#344054] h-full py-0 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] md:h-[80px] leading-[60px] md:leading-[80px]'>{user.lastname}</div>
                  </td>
                  <td className="whitespace-nowrap text-xs sm:text-base md:text-lg font-medium text-[#344054] h-full py-0 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] md:h-[80px] leading-[60px] md:leading-[80px]'>{user.email}</div>
                  </td>
                  <td className="whitespace-nowrap text-xs sm:text-base md:text-lg font-medium text-[#344054] h-full py-0 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] md:h-[80px] leading-[60px] md:leading-[80px]'>{user.group}</div>
                  </td>
                  <td className="whitespace-nowrap text-xs sm:text-base md:text-lg font-medium text-[#344054] h-full py-0 pr-5">
                    <div className='bg-[#fccac9] pr-2 h-[60px] md:h-[80px] text-end'>
                      <MoreOutlined  
                        className="text-[#1d232d] text-xl sm:text-2xl md:text-3xl font-semibold hover:text-gray-700 cursor-pointer h-[60px] md:h-[80px]" 
                        onClick={() => handleEditClick(user.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
