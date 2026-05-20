import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PlusOutlined, LeftOutlined } from '@ant-design/icons';
import { Form, notification } from 'antd';
import SearchBar from '../../../components/Input/SearchBar';
import InputText from '../../../components/Input/InputText';
import { baseURL, getData } from '../../../api/AxiosGet';



type DataType = {
  id: string,
  clientId: string,
  name: string,
  type: string,
  description: string,
  rootUrl: string,
  webOrigins: string[],
  redirectUris: string[],
  logoutRedirectUris: string,
}

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [data, setData] = useState<DataType | null>(null);
  console.log('data: ', data);
  const [clientId, setClientId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [rootUrl, setRootUrl] = useState<string | null>(null);
  const [logoutRedirectUri, setLogoutRedirectUri] = useState<string | null>(null);
  const [redirectURI, setReDirectURI] = useState<{ key: number; value: string }[]>([{ key: 0, value: '' }]);
  const [webOrigins, setWebOrigins] = useState<{ key: number; value: string }[]>([{ key: 0, value: '' }]);
  const { response } = getData({ endpoint: `clients/${id}`, url: "" });
  const [form] = Form.useForm();
  console.log('form: ', form);

  useEffect(() => {
    if (response && response.redirectUris) {
      setClientId(response.clientId || null);
      setData(response);
      
      setName(response.name || null);
      setDescription(response.description || null);
      setRootUrl(response.rootUrl || null);
      setLogoutRedirectUri(response?.attributes?.['post.logout.redirect.uris'] || null);

      const redirectUri = response.redirectUris.map((item: string, index: number) => ({
        key: index,
        value: item
      }));
      setReDirectURI(redirectUri);

      const webOrigins = response.webOrigins.map((item: string, index: number) => ({
        key: index,
        value: item
      }));
      setWebOrigins(webOrigins);
    }
  }, [response]);

  const openNotification = (type: 'success' | 'error', message: string, description: string) => {
    notification[type]({
      message: message,
      description: description,
      duration: 2,
    });
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')} `,
        'Content-Type': 'application/json'
      }
    };

    const data = {
      clientId: clientId,
      name: name,
      description: description,
      rootUrl: rootUrl,
      redirectUris: redirectURI.filter(item => item.value.trim() !== '').map(item => item.value),
      webOrigins: webOrigins.filter(item => item.value.trim() !== '').map(item => item.value)
    };

    try {
      const response = await axios.put(`${baseURL}clients/${id}`, JSON.stringify(data), config);
      if(response) {
        openNotification('success', 'Update Successful', 'Client information has been updated successfully.');
      }
    } catch (error) {
      console.log(error);
      openNotification('error', 'Update Failed', 'There was an error updating the client information.');
    }
  };

  const updateFormValue = (updatedField: { updateType: string; value: string }, index?: number) => {
    const { updateType, value } = updatedField;

    switch (updateType) {
      case 'clientId':
        setClientId(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'rootUrl':
        setRootUrl(value);
        break;
      case 'validRedirectUris':
        if (index !== undefined) {
          setReDirectURI(prev => prev.map((item, i) => i === index ? { ...item, value } : item));
        }
        break;
      case 'postLogoutRedirectUris':
        setLogoutRedirectUri(value);
        break;
      case 'webOrigins':
        if (index !== undefined) {
          setWebOrigins(prev => prev.map((item, i) => i === index ? { ...item, value } : item));
        }
        break;
      default:
        break;
    }
  };

  const addRedirectUriInput = () => {
    setReDirectURI(prev => [...prev, { key: prev.length, value: '' }]);
  };

  const addWebOriginsInput = () => {
    setWebOrigins(prev => [...prev, { key: prev.length, value: '' }]);
  };

  return (
    <section className='px-4 py-6 sm:px-8 sm:py-8'>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center">
        <div className="flex-1 w-full">
          <SearchBar
            styleClass=''
            searchText=""
            setSearchText={() => {}}
            styleInput='py-3 sm:py-4 pl-10 sm:pl-12 placeholder:font-semibold text-lg sm:text-xl'
            styleIcon='text-xl sm:text-2xl top-3 sm:top-4'
            placeholderText="Search"
          />
        </div>
        <div className="text-end w-full sm:w-auto">
          <button className='text-lg sm:text-xl py-3 sm:py-4 px-6 sm:px-7 bg-[#009FF5] rounded-lg text-white'>
            Create New Client
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#D0D3D9] rounded-xl mt-5 p-6 sm:p-9 overflow-x-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/clients') }}>
          <LeftOutlined className='font-semibold text-[#344054]'/>
          <p className='text-lg sm:text-xl font-semibold text-[#344054]'>{clientId}</p>
        </div>
        <form className="pt-0 rounded-[10px] min-w-[1000px]" onSubmit={handleSubmitForm}>
          <p className='text-[#344054] text-lg sm:text-xl font-semibold mt-4'>General Settings</p>
          <InputText
            labelTitle="Client ID"
            defaultValue={clientId || '-'}
            updateFormValue={updateFormValue}
            updateType="clientId"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Name"
            defaultValue={name || '-'}
            updateFormValue={updateFormValue}
            updateType="name"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            styleP='py-[10px] rounded-[10px]'
          />
          <InputText
            labelTitle="Description"
            defaultValue={description || '-'}
            updateFormValue={updateFormValue}
            updateType="description"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            styleP='py-[10px] rounded-[10px]'
          />
          
          <p className='text-[#344054] text-lg sm:text-xl font-semibold mt-4'>Access Settings</p>
          <InputText
            labelTitle="Root URL"
            defaultValue={rootUrl || '-'}
            updateFormValue={updateFormValue}
            updateType="rootUrl"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            styleP='py-[10px] rounded-[10px]'
          />
          {redirectURI.map((item, index) => (
            <InputText
              key={index}
              labelTitle={`Valid Redirect URI ${index + 1}`}
              defaultValue={item.value || '-'}
              updateFormValue={(updatedField) => updateFormValue(updatedField, index)}
              updateType="validRedirectUris"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              styleP='py-[10px] rounded-[10px]'
              showDeleteIcon={true}
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
          <InputText
            labelTitle="Post Logout Redirect URIs"
            defaultValue={logoutRedirectUri || '-'}
            updateFormValue={updateFormValue}
            updateType="postLogoutRedirectUris"
            containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
            styleP='py-[10px] rounded-[10px]'
          />
          {webOrigins.map((item, index) => (
            <InputText
              key={index}
              labelTitle={`Web Origin ${index + 1}`}
              defaultValue={item.value || '-'}
              updateFormValue={(updatedField) => updateFormValue(updatedField, index)}
              updateType="webOrigins"
              containerStyle="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              labelStyle="text-sm sm:text-lg font-medium text-[#637D92] col-span-12 md:col-span-2"
              styleP='py-[10px] rounded-[10px]'
              showDeleteIcon={true}
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

export default ClientDetail;
