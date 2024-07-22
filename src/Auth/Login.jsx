import React, { useState } from 'react';
import logo from '../assets/logo.png';
import InputText from '../components/Input/InputText';
import { Switch } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [productObj, setProductObj] = useState({});
  const navigate = useNavigate()
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setProductObj((prev) => ({ ...prev, [updateType]: value }));
  };
  const handleLogin = () => {
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-login">
      <div className="bg-white rounded-[50px] p-5 flex w-[90%] gap-6">
        {/* LEFT LOGIN */}
        <div className="hidden md:block w-1/2 bg-cover bg-login relative rounded-[30px]">
          <div className="flex items-center justify-center h-full rounded-[30px]">
            <figure className="relative w-full h-full">
              <figcaption className="text-white absolute text-[68px] font-bold left-14 bottom-40  ">
                One Click,<br />To Everything
              </figcaption>
            </figure>
          </div>
        </div>
        {/* RIGHT LOGIN */}
        <div className="w-full md:w-1/2 pt-4 pb-20 container px-20">
          <div className="mb-4 flex justify-center">
            <img src={logo} alt="Logo" className="h-[75px] w-[200px]" />
          </div>
          <div className="text-center">
            <h2 className="text-[44px] font-bold mb-2 text-center mt-[50px]">Welcome to SSO Portal</h2>
            <p className="mb-6 text-center text-[344054]">Enter your email and password to access your account</p>
          </div>
          <form>
            <InputText
              defaultValue=""
              updateType="email"
              labelTitle="Email"
              updateFormValue={updateFormValue}
              containerStyle=""
              placeholder="olivia@untitledui.com"
            />
            <InputText
              defaultValue=""
              updateType="password"
              labelTitle="Password"
              updateFormValue={updateFormValue}
              containerStyle=""
              placeholder="*********"
              type="password"
            />
            <div className="flex items-center gap-2 ">
              <Switch defaultChecked onChange={onChange} />
              <p className='text-[#344054]'>Remember me?</p>
            </div>
            <div className="flex items-center justify-between mt-[52px]">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
                type="button"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
