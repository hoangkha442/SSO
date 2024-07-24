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
        <div className="grid grid-cols-1 sm:grid-cols-9">
        <div className="col-span-1 sm:col-span-9">
          <SearchBar 
            styleClass=''
            styleInput='py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl' 
            styleIcon='text-xl sm:text-2xl top-10 sm:top-4 mt-1'
          />
        </div>
        </div>
      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <div className="flex items-center gap-2 cursor-pointer mb-10" onClick={() => { navigate('/admin/users') }}>
          <LeftOutlined className='font-semibold text-[#344054]' />
          <p className='text-xl sm:text-2xl font-semibold text-[#344054]'>Add User</p>
        </div>
        <form className="pt-0 rounded-[10px]">
          <SelectBox
            labelTitle="Required Action:"
            updateFormValue={updateFormValue}
            updateType="requiredAction"
            containerStyle="grid grid-cols-12 gap-7 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2 text-end"
            inputStyle="col-span-10 sm:col-span-8"
            styleP='py-[10px] rounded-[10px]'
            options={[
              { value: '', label: 'Select action' },
              { value: 'action1', label: 'Action 1' },
              { value: 'action2', label: 'Action 2' },
            ]}
          />
          <p className='text-[#344054] text-xl font-semibold mt-4'>General Settings</p>
          <InputText
            labelTitle="User Name:"
            updateFormValue={updateFormValue}
            updateType="username"
            containerStyle="grid grid-cols-12 gap-7 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2 text-end"
            inputStyle="col-span-12 sm:col-span-8"
            defaultValue="anh_tt"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Email:"
            updateFormValue={updateFormValue}
            updateType="email"
            containerStyle="grid grid-cols-12 gap-7 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2 text-end"
            inputStyle="col-span-12 sm:col-span-8"
            defaultValue="anhtt.thd@email.com"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="First Name:"
            updateFormValue={updateFormValue}
            updateType="firstName"
            containerStyle="grid grid-cols-12 gap-7 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2 text-end"
            inputStyle="col-span-12 sm:col-span-8"
            defaultValue="The Anh"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Last Name:"
            updateFormValue={updateFormValue}
            updateType="lastName"
            containerStyle="grid grid-cols-12 gap-7 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2 text-end"
            inputStyle="col-span-12 sm:col-span-8"
            defaultValue="Tran"
            styleP='py-[10px] rounded-[10px]'
          />

          <div className="grid grid-cols-12 items-center gap-7">
            <label className='text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2 text-end' htmlFor="">Groups:</label>
            <button className='col-span-12 sm:col-span-2 flex justify-center gap-3 items-center bg-[#F9FAFB] hover:text-[#4a8aac] transition-all duration-500 input shadow custom-input-shadow py-3 appearance-none border border-[#D0D5DD] my-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] text-lg font-medium text-[#009FF5]'>
              <PlusOutlined /> Join Group
            </button>
          </div>

          <div className="grid grid-cols-12 text-center gap-7">
            <button type="submit" className="bg-[#009FF5] text-white px-4 py-2 rounded-[10px] hover:bg-blue-500 col-span-12 sm:col-span-1 sm:col-start-2 text-center text-[20px] mt-8">
              Save
            </button>
            <button type="button" className="bg-[#F9FAFB] text-[#344054] px-4 py-2 rounded-[10px] hover:bg-gray-200 col-span-12 sm:col-span-2 text-center text-[20px] mt-8 border border-[#D0D5DD]">
              Revert
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddNewUser;
