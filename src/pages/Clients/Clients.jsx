import React from 'react';
import SearchBar from '../../components/Input/SearchBar';
import { FaEdit } from 'react-icons/fa';

export default function Clients() {
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
    
  ];

  return (
    <section className='px-8 py-6'>
      <div className="grid grid-cols-9 gap-5 items-center">
        <div className="col-span-7">
          <SearchBar 
            styleClass=''
            styleInput='py-4 pl-12 placeholder:font-semibold text-xl' 
            styleIcon='text-2xl top-4'
          />
        </div>
        <div className="col-span-2 text-end">
          <button className='text-xl py-4 px-7 bg-[#009FF5] rounded-lg text-white'>
            Create New Client
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-9">
        <p className='text-2xl font-semibold'>Clients</p>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Types
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Home URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientsData.map((client, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.clientId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.types}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.homeUrl}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <FaEdit className="text-gray-500 hover:text-gray-700 cursor-pointer" />
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
