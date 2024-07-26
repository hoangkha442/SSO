import React, { useState } from 'react';
import { MinusOutlined } from '@ant-design/icons';
import logo from '../assets/logo.png';
import helpIcon from '../assets/HelpIcon.svg';
import AlertCircle from '../assets/alert-circle.svg';
import { Switch } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [productObj, setProductObj] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  
  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setProductObj((prev) => ({ ...prev, [updateType]: value }));
  };
  
  const handleLogin = () => {
    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }
    
    localStorage.setItem('ADMIN_TOKEN', JSON.stringify('ADMIN_TOKEN'));
    navigate('/home/my-apps');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login p-14">
      <div className="bg-white rounded-[50px] p-5 flex w-full gap-6">
        {/* LEFT LOGIN */}
        <div className="hidden lg:block w-1/2 bg-cover bg-login relative rounded-[30px]">
          <div className="flex items-center justify-center h-full rounded-[30px]">
            <figure className="relative w-full h-full">
              <figcaption className="text-white absolute lg:text-[96px] leading-[96px] text-5xl font-bold left-14 bottom-1/4">
                One Click,<br />To Everything
              </figcaption>
            </figure>
          </div>
        </div>
        {/* RIGHT LOGIN */}
        <div className="w-full lg:w-1/2 pt-[31px] container px-5 2xl:pb-[257px] 2xl:pl-[179px] 2xl:pr-[215px] pb-10">
          <div className="flex justify-center mb-[50px] md:mb-[150px]">
            <img src={logo} alt="Logo" className="h-[75px] w-[200px]" />
          </div>
          <div className="text-center mb-[52px]">
            <h2 className="md:text-[44px] text-3xl font-bold mb-2 text-center mt-[50px] md:leading-[44px]">Welcome to SSO Portal</h2>
            <p className="text-center text-[#344054]">Enter your email and password to access your account</p>
          </div>
          <form>
            <div className="form-control w-full mb-4">
              <label className="label col-span-2 text-base">Email</label>
              <div className="col-span-10 flex items-center relative">
                <input
                  type="text"
                  value={email}
                  placeholder="olivia@untitledui.com"
                  onChange={(e) => { setEmail(e.target.value); updateFormValue({ updateType: 'email', value: e.target.value }); setEmailError(false); }}
                  className={`input shadow custom-input-shadow appearance-none border ${emailError ? 'border-[#FDA29B]' : 'border-[#D0D5DD]'} w-full px-3 text-gray-700 my-2 leading-tight focus:outline-none focus:shadow-outline py-[10px] rounded-lg text-base`}
                />
                <button className='absolute right-3 top-1/3'>
                  <img src={emailError ? AlertCircle : helpIcon} alt="" />
                </button>
              </div>
            </div>
            <div className="form-control w-full">
              <label className="label col-span-2 text-base">Password</label>
              <div className="col-span-10 flex items-center relative">
                <input
                  type="password"
                  value={password}
                  placeholder="*********"
                  onChange={(e) => { setPassword(e.target.value); updateFormValue({ updateType: 'password', value: e.target.value }); setPasswordError(false); }}
                  className={`input flex-1 shadow custom-input-shadow appearance-none border ${passwordError ? 'border-[#FDA29B]' : 'border-[#D0D5DD]'} w-full px-3 text-gray-700 my-2 leading-tight focus:outline-none focus:shadow-outline py-[10px] rounded-lg text-base`}
                />
                <button className='absolute right-3 top-1/3'>
                  <img src={passwordError ? AlertCircle : helpIcon} alt="" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Switch defaultChecked onChange={onChange} />
              <p className='text-[#344054]'>Remember me?</p>
            </div>
            <div className="flex items-center justify-between mt-[52px]">
              <button
                className="bg-[#009FF5] hover:bg-blue-700 text-base uppercase text-white font-bold py-[10px] px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
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
