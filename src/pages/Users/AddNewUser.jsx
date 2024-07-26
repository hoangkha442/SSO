import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputText from '../../components/Input/InputText';
import SelectBox from '../../components/Input/SelectBox';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import SearchBar from '../../components/Input/SearchBar';

function AddNewUser() {
  const navigate = useNavigate();

  const updateFormValue = (updatedField) => {
    console.log(updatedField);
  };

  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center">
        <div className="flex-1 w-full">
          <SearchBar 
            styleClass=''
            styleInput='py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl' 
            styleIcon='text-xl sm:text-2xl top-3 sm:top-4'
          />
        </div>
        <div className="text-end w-full sm:w-auto">
          <button className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white'>
            Create New User
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/admin/users') }}>
          <LeftOutlined className='font-semibold text-[#344054]'/>
          <p className='text-lg sm:text-xl md:text-2xl font-semibold text-[#344054]'>Add User</p>
        </div>
        <form className="pt-0 rounded-[10px]">
          <SelectBox
            labelTitle="Required Action:"
            updateFormValue={updateFormValue}
            updateType="requiredAction"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            inputStyle="col-span-12 md:col-span-10"
            styleP='py-[10px] rounded-[10px]'
            options={[
              { value: '', label: 'Select action' },
              { value: 'action1', label: 'Action 1' },
              { value: 'action2', label: 'Action 2' },
            ]}
          />
          <p className='text-[#344054] text-lg sm:text-xl md:text-2xl font-semibold mt-4'>General Settings</p>
          <InputText
            labelTitle="User Name:"
            updateFormValue={updateFormValue}
            updateType="username"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            inputStyle="col-span-12 md:col-span-10"
            defaultValue="anh_tt"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Email:"
            updateFormValue={updateFormValue}
            updateType="email"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            inputStyle="col-span-12 md:col-span-10"
            defaultValue="anhtt.thd@email.com"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="First Name:"
            updateFormValue={updateFormValue}
            updateType="firstName"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            inputStyle="col-span-12 md:col-span-10"
            defaultValue="The Anh"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Last Name:"
            updateFormValue={updateFormValue}
            updateType="lastName"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            inputStyle="col-span-12 md:col-span-10"
            defaultValue="Tran"
            styleP='py-[10px] rounded-[10px]'
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <label className='text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2' htmlFor="">Groups:</label>
            <button className='col-span-12 md:col-span-3 md:col-start-3 flex justify-center gap-3 items-center bg-[#F9FAFB] hover:text-[#4a8aac] transition-all duration-500 input shadow custom-input-shadow py-3 appearance-none border border-[#D0D5DD] my-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] text-sm sm:text-lg font-medium text-[#009FF5]'>
              <PlusOutlined /> Join Group
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 text-center gap-4">
            <button type="submit" className="bg-[#009FF5] text-white px-4 py-2 rounded-[10px] hover:bg-blue-500 col-span-1 md:col-span-1 md:col-start-1 text-center text-sm sm:text-lg mt-8">
              Save
            </button>
            <button type="button" className="bg-[#F9FAFB] text-[#344054] px-4 py-2 rounded-[10px] hover:bg-gray-200 col-span-1 md:col-span-2 text-center text-sm sm:text-lg mt-8 border border-[#D0D5DD]">
              Revert
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddNewUser;
