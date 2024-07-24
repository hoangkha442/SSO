import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/Input/SearchBar';
import { FaEdit } from 'react-icons/fa';

export default function Clients() {
  const navigate = useNavigate();

  const clientsData = [
    {
      clientId: 'SplunkTHDEntity',
      name: '{splunk}',
      types: 'OpenID',
      description: '--',
      homeUrl: 'abc.xyz',
    },
    {
      clientId: 'account',
      name: '{account}',
      types: 'OpenID',
      description: '--',
      homeUrl: 'abc.xyz',
    },
    {
      clientId: 'account',
      name: '{account}',
      types: 'OpenID',
      description: '--',
      homeUrl: 'abc.xyz',
    },
    {
      clientId: 'account',
      name: '{account}',
      types: 'OpenID',
      description: '--',
      homeUrl: 'abc.xyz',
    },
    {
      clientId: 'account',
      name: '{account}',
      types: 'OpenID',
      description: '--',
      homeUrl: 'abc.xyz',
    },
  ];

  const handleEditClick = (clientId) => {
    navigate(`/admin/clients/detail/${clientId}`);
  };

  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="flex gap-4 sm:gap-5 items-center">
        <div className="flex-1">
          <SearchBar 
            styleClass=''
            styleInput='py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl' 
            styleIcon='text-xl sm:text-2xl top-3 sm:top-4'
          />
        </div>
        <div className="text-center sm:text-end">
          <button className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white'>
            Create New Client
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <p className='text-xl sm:text-2xl font-semibold'>Clients</p>
        <div className="overflow-x-auto mt-4 sm:mt-6">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
            <thead>
              <tr >
                <th scope="col" className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-5">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>
                    Client ID
                  </div>
                </th>
                <th scope="col" className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>
                    Name
                  </div>
                </th>
                <th scope="col" className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>
                    Types
                  </div>
                </th>
                <th scope="col" className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>
                    Description
                  </div>
                </th>
                <th scope="col" className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>
                    Home URL
                  </div>
                </th>
                <th scope="col" className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2 pr-5">
                  <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>
                    Action
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientsData.map((client, index) => (
                <tr key={index} className='px-5'>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-5">
                    <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{client.clientId}</div>
                  </td>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{client.name}</div>
                  </td>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{client.types}</div>
                  </td>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{client.description}</div>
                  </td>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{client.homeUrl}</div>
                  </td>
                  <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pr-5 pl-2">
                    <div className='bg-[#fccac9] pl-2 h-[60px]'>
                      <FaEdit 
                        className="text-[#344054] text-2xl font-semibold hover:text-gray-700 cursor-pointer h-[60px]" 
                        onClick={() => handleEditClick(client.clientId)}
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
