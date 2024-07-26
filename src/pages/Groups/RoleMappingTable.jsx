import React from 'react';

const RoleMappingTable = ({ roleMappingData }) => (
  <div className="overflow-x-auto mt-4 sm:mt-6">
    <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
      <thead>
        <tr>
          <th scope="col" className="text-left text-xs sm:text-base md:text-lg font-semibold text-[#344054] tracking-wider py-0 pl-5">
            <div className='pl-2 bg-[#fccac9] h-[60px] md:h-[80px] leading-[60px] md:leading-[80px]'>
              Role
            </div>
          </th>
          <th scope="col" className="text-left text-xs sm:text-base md:text-lg font-semibold text-[#344054] tracking-wider py-0 pl-2">
            <div className='pl-2 bg-[#fccac9] h-[60px] md:h-[80px] leading-[60px] md:leading-[80px]'>
              Description
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {roleMappingData.map((role, index) => (
          <tr key={index}>
            <td className="whitespace-nowrap text-xs sm:text-base md:text-lg font-medium text-[#344054] h-full py-0 pl-5">
              <div className='bg-[#fccac9] pl-2 h-[60px] md:h-[80px] leading-[60px] md:leading-[80px]'>{role.role}</div>
            </td>
            <td className="whitespace-nowrap text-xs sm:text-base md:text-lg font-medium text-[#344054] h-full py-0 pl-2">
              <div className='bg-[#fccac9] pl-2 h-[60px] md:h-[80px] leading-[60px] md:leading-[80px]'>{role.description}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RoleMappingTable;
