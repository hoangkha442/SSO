import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../../components/Input/SearchBar';
import InputText from '../../components/Input/InputText';
import { PlusOutlined, LeftOutlined } from '@ant-design/icons';

function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const updateFormValue = (updatedField) => {
    console.log(updatedField);
  };

  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="grid grid-cols-1 sm:grid-cols-9 gap-4 sm:gap-5 items-center">
        <div className="col-span-1 sm:col-span-7">
          <SearchBar 
            styleClass=''
            styleInput='py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl' 
            styleIcon='text-xl sm:text-2xl top-3 sm:top-4'
          />
        </div>
        <div className="col-span-1 sm:col-span-2 text-center sm:text-end">
          <button className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white'>
            Create New Client
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/admin/clients') }}>
          <LeftOutlined className='font-semibold text-[#344054]'/>
          <p className='text-xl sm:text-2xl font-semibold text-[#344054]'>{id}</p>
        </div>
        <form className="pt-0 rounded-[10px]">
          <p className='text-[#344054] text-xl font-semibold mt-4'>General Settings</p>
          <InputText
            labelTitle="Client ID"
            updateFormValue={updateFormValue}
            updateType="clientId"
            containerStyle="grid grid-cols-12 gap-4 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2"
            inputStyle="col-span-12 sm:col-span-10"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Name"
            updateFormValue={updateFormValue}
            updateType="name"
            containerStyle="grid grid-cols-12 gap-4 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2"
            inputStyle="col-span-12 sm:col-span-10"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Description"
            updateFormValue={updateFormValue}
            updateType="description"
            containerStyle="grid grid-cols-12 gap-4 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2"
            inputStyle="col-span-12 sm:col-span-10"
            styleP='py-[10px] rounded-[10px]'
          />
          
          <p className='text-[#344054] text-xl font-semibold mt-4'>Access Settings</p>
          <InputText
            labelTitle="Root URL"
            updateFormValue={updateFormValue}
            updateType="rootUrl"
            containerStyle="grid grid-cols-12 gap-4 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2"
            inputStyle="col-span-12 sm:col-span-10"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Home URL"
            updateFormValue={updateFormValue}
            updateType="homeUrl"
            containerStyle="grid grid-cols-12 gap-4 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2"
            inputStyle="col-span-12 sm:col-span-10"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Valid Redirect URIs"
            updateFormValue={updateFormValue}
            updateType="validRedirectUris"
            containerStyle="grid grid-cols-12 gap-4 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2"
            inputStyle="col-span-10"
            styleP='py-[10px] rounded-[10px]'
            showDeleteIcon={true}
          />
          <div className="grid grid-cols-12">
            <button className='col-span-12 sm:col-span-3 sm:col-start-3 flex justify-center gap-3 items-center bg-[#F9FAFB] hover:text-[#4a8aac] transition-all duration-500 input shadow custom-input-shadow py-3 appearance-none border border-[#D0D5DD] my-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] text-lg font-medium text-[#009FF5]'>
              <PlusOutlined /> Add a valid redirect URIs
            </button>
          </div>
          <InputText
            labelTitle="Post Logout Redirect URIs"
            updateFormValue={updateFormValue}
            updateType="postLogoutRedirectUris"
            containerStyle="grid grid-cols-12 gap-4 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2"
            inputStyle="col-span-12 sm:col-span-10"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Web Origins"
            updateFormValue={updateFormValue}
            updateType="webOrigins"
            containerStyle="grid grid-cols-12 gap-4 items-center"
            labelStyle="text-lg font-medium text-[#637D92] col-span-12 sm:col-span-2"
            inputStyle="col-span-12 sm:col-span-10"
            styleP='py-[10px] rounded-[10px]'
          />
          <div className="grid grid-cols-12">
            <button className='col-span-12 sm:col-span-3 sm:col-start-3 flex justify-center gap-3 items-center bg-[#F9FAFB] hover:text-[#4a8aac] transition-all duration-500 input shadow custom-input-shadow py-3 appearance-none border border-[#D0D5DD] my-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] text-lg font-medium text-[#009FF5]'>
              <PlusOutlined /> Add web origins
            </button>
          </div>

          <div className="grid grid-cols-12 text-center">
            <button type="submit" className="bg-[#009FF5] text-white px-4 py-2 rounded-[10px] hover:bg-blue-500 col-span-12 sm:col-span-1 sm:col-start-3 text-center text-[20px] mt-8">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ClientDetail;
