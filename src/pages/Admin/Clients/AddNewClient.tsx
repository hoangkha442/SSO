import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import InputText from '../../../components/Input/InputText';
import SearchBar from '../../../components/Input/SearchBar';
import { baseURL } from '../../../api/AxiosGet';
import { notification } from 'antd';

const AddNewClient: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientId: '',
    name: '',
    description: '',
    rootUrl: '',
    redirectUris: [{ key: 0, value: '' }],
    webOrigins: [{ key: 0, value: '' }],
  });

  const updateFormValue = (updatedField: { updateType: string, value: string }, index?: number) => {
    if (index !== undefined && updatedField.updateType === 'redirectUris') {
      setFormData(prevState => ({
        ...prevState,
        redirectUris: prevState.redirectUris.map((item, i) => i === index ? { ...item, value: updatedField.value } : item)
      }));
    } else if (index !== undefined && updatedField.updateType === 'webOrigins') {
      setFormData(prevState => ({
        ...prevState,
        webOrigins: prevState.webOrigins.map((item, i) => i === index ? { ...item, value: updatedField.value } : item)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [updatedField.updateType]: updatedField.value
      }));
    }
  };

  const openNotification = (type: 'success' | 'error', message: string, description: string) => {
    notification[type]({
      message: message,
      description: description,
      duration: 2,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const clientPayload = {
      clientId: formData.clientId,
      name: formData.name,
      description: formData.description,
      rootUrl: formData.rootUrl,
      redirectUris: formData.redirectUris.filter(item => item.value.trim() !== '').map(item => item.value),
      webOrigins: formData.webOrigins.filter(item => item.value.trim() !== '').map(item => item.value),
      protocol: "openid-connect",
      publicClient: true,
      standardFlowEnabled: true,
    };

    try {
      await axios.post(`${baseURL}/clients`, clientPayload, config);
      openNotification('success', 'Add Successful', 'Client information has been added successfully.');
      navigate('/clients');
    } catch (error) {
      console.error('Error creating client:', error);
      openNotification('error', 'Add Failed', 'An error occurred while adding the client.');
    }
  };

  const addRedirectUriInput = () => {
    setFormData(prevState => ({
      ...prevState,
      redirectUris: [...prevState.redirectUris, { key: prevState.redirectUris.length, value: '' }]
    }));
  };

  const addWebOriginsInput = () => {
    setFormData(prevState => ({
      ...prevState,
      webOrigins: [...prevState.webOrigins, { key: prevState.webOrigins.length, value: '' }]
    }));
  };

  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center">
        <div className="flex-1 w-full">
          <SearchBar
            searchText=""
            setSearchText={() => { }}
            styleClass=""
            styleInput='py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl'
            styleIcon='text-xl sm:text-2xl top-3 sm:top-4'
          />
        </div>
        <div className="text-end w-full sm:w-auto">
          <button className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white' onClick={handleSubmit}>
            Create New Client
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/clients') }}>
          <LeftOutlined className='font-semibold text-[#344054]' />
          <p className='text-lg sm:text-xl md:text-2xl font-semibold text-[#344054]'>Add Client</p>
        </div>
        <form className="pt-0 rounded-[10px]" onSubmit={handleSubmit}>
          <InputText
            labelTitle="Client ID"
            defaultValue={formData.clientId}
            updateFormValue={updateFormValue}
            updateType="clientId"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Name"
            defaultValue={formData.name}
            updateFormValue={updateFormValue}
            updateType="name"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Description"
            defaultValue={formData.description}
            updateFormValue={updateFormValue}
            updateType="description"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            styleP='py-[10px] rounded-[10px]'
          />
          
          <p className='text-[#344054] text-lg sm:text-xl font-semibold mt-4'>Access Settings</p>
          <InputText
            labelTitle="Root URL"
            defaultValue={formData.rootUrl}
            updateFormValue={updateFormValue}
            updateType="rootUrl"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            styleP='py-[10px] rounded-[10px]'
          />
          {formData.redirectUris.map((item, index) => (
            <InputText
              key={index}
              labelTitle={`Valid Redirect URI ${index + 1}`}
              defaultValue={item.value}
              updateFormValue={(updatedField) => updateFormValue(updatedField, index)}
              updateType="redirectUris"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              styleP='py-[10px] rounded-[10px]'
            />
          ))}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <button type="button" 
              className='col-span-1 md:col-span-3 md:col-start-3 flex justify-center gap-3 items-center bg-[#F9FAFB] hover:text-[#4a8aac] transition-all duration-500 input shadow custom-input-shadow py-3 appearance-none border border-[#D0D5DD] my-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] text-sm sm:text-lg font-medium text-[#009FF5]'
              onClick={addRedirectUriInput}
            >
              <PlusOutlined /> Add a valid redirect URI
            </button>
          </div>
          {formData.webOrigins.map((item, index) => (
            <InputText
              key={index}
              labelTitle={`Web Origin ${index + 1}`}
              defaultValue={item.value}
              updateFormValue={(updatedField) => updateFormValue(updatedField, index)}
              updateType="webOrigins"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              styleP='py-[10px] rounded-[10px]'
            />
          ))}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <button type="button" 
              className='col-span-1 md:col-span-3 md:col-start-3 flex justify-center gap-3 items-center bg-[#F9FAFB] hover:text-[#4a8aac] transition-all duration-500 input shadow custom-input-shadow py-3 appearance-none border border-[#D0D5DD] my-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] text-sm sm:text-lg font-medium text-[#009FF5]'
              onClick={addWebOriginsInput}
            >
              <PlusOutlined /> Add web origins
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 text-center">
            <button type="submit" className="bg-[#009FF5] text-white px-4 py-2 rounded-[10px] hover:bg-blue-500 col-span-1 md:col-span-1 md:col-start-1 text-center text-sm sm:text-lg mt-8">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddNewClient;
