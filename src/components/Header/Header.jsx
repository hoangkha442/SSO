import React from 'react'
import SearchBar from '../Input/SearchBar'
import Profile from './Profile'

export default function Header() {
  return (
    <section className='h-[100px] px-8 w-full border-b border-[#D0D3D9]'>
        <div className="flex items-center justify-between h-full">
            <SearchBar placeholderText='Tìm kiếm' styleClass={'w-1/3'} styleInput='py-[10px]  pl-8' styleIcon={'top-[12px] text-xl'}/>
            <Profile/>
        </div>
    </section>
  )
}
