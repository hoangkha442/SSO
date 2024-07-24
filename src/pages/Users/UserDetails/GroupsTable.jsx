import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const GroupsTable = ({ groupsData, handleDelete }) => (
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
              Path
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
        {groupsData.map((group, index) => (
          <tr key={index}>
            <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-5">
              <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{group.name}</div>
            </td>
            <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2">
              <div className='bg-[#fccac9] pl-2 h-[60px] leading-[60px]'>{group.path}</div>
            </td>
            <td className="whitespace-nowrap text-lg font-medium text-[#344054] h-full py-0 pl-2 pr-5">
              <div className='bg-[#fccac9] pl-2 h-[60px] flex justify-center'>
                <DeleteOutlined
                  className="text-[#1d232d] text-2xl font-semibold hover:text-gray-700 cursor-pointer"
                  onClick={() => handleDelete(group.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default GroupsTable;
