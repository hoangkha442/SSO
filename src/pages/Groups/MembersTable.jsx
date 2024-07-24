import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';

const MembersTable = ({ membersData }) => (
  <div className="overflow-x-auto mt-4 sm:mt-6">
    <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
      <thead>
        <tr>
          <th scope="col" className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-5">
            <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>
              Name
            </div>
          </th>
          <th scope="col" className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2">
            <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>
              Email
            </div>
          </th>
          <th scope="col" className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2">
            <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>
              First Name
            </div>
          </th>
          <th scope="col" className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2">
            <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>
              Last Name
            </div>
          </th>
          <th scope="col" className="text-left text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2">
            <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>
              Membership
            </div>
          </th>
          <th scope="col" className="text-center text-xs sm:text-xl font-semibold text-[#344054] tracking-wider py-0 pl-2 pr-5">
            <div className='pl-2 bg-[#fccac9] h-[80px] leading-[80px]'>
              Leave
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {membersData.map((member, index) => (
          <tr key={index}>
            <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-5">
              <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{member.name}</div>
            </td>
            <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2">
              <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{member.email}</div>
            </td>
            <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2">
              <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{member.firstName}</div>
            </td>
            <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2">
              <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{member.lastName}</div>
            </td>
            <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2">
              <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{member.membership}</div>
            </td>
            <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pr-5 pl-2">
              <div className='bg-[#fccac9] h-[60px] text-center'>
                <LogoutOutlined
                  className="text-[#1d232d] text-2xl font-semibold hover:text-gray-700 cursor-pointer h-[60px]"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MembersTable;
