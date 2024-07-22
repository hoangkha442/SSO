import React from 'react'
import { Collapse } from 'antd';
import { AiOutlineHome, AiOutlineDown, AiOutlineUp, AiOutlinePlus } from 'react-icons/ai';

export default function MyApps() {
  const statsData = [
    { imageTitle: "Tổng tài khoản", value: 123, imageIcon: <AiOutlineHome />, description: ` Admin -  Khách hàng` },
    { imageTitle: "Tổng doanh thu", value: 123, imageIcon:<AiOutlineHome /> , description: "Tháng này" },
    { imageTitle: "Đang chờ xử lý", value: 123, imageIcon: <AiOutlineHome />, description: `Trên  đơn hàng` },
    { imageTitle: "Đã đặt hàng", value: 123, imageIcon: <AiOutlineHome />, description: `Trên người dùng` },
  ];
  return (
    <section className='max-w-[80%] mx-auto'>
      <div className="py-10">
        <p className='font-bold text-[28px] text-[#344054]'>My Apps</p>
        <div className="mt-14">
          <Collapse
            items={[
              {
                key: '1',
                label: <p className='text-[#344054] text-2xl'>
                  Recently used
                </p>,
                children:
                  <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                    {statsData.map((d, k) => (
                      <div key={k} className={`bg-white shadow-md rounded-lg p-4 flex items-center ${k % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}`}>
                        <div className="flex-shrink-0">{d.imageIcon}</div>
                        <div className="ml-4">
                          <div className="text-lg font-medium">{d.imageTitle}</div>
                          <div className="text-2xl font-bold">{d.value}</div>
                          <div className="text-sm text-gray-500">{d.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>,
              },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
