import React, { useState } from 'react';
import bgLogin from '../../assets/bg-login.png';
import avatar from '../../assets/AvatarImage.png';
import InputText from '../../components/Input/InputText';

const Account = () => {
  const [formValues, setFormValues] = useState({
    name: 'Charlies Puth',
    jobTitle: 'UI UX Designer',
    email: 'abc@email.com',
    phone: '098765678',
    password: '1233456789',
    address: '12 ABC, XYZ City',
  });

  const updateFormValue = ({ updateType, value }) => {
    setFormValues({ ...formValues, [updateType]: value });
  };

  return (
    <section className="container max-w-[80%] mx-auto" style={{ height: 'calc(100vh - 100px)' }}>
      <div className="py-10">
        <p className="font-bold text-[28px] text-[#344054]">Account Settings</p>
        <div className="grid grid-cols-12 gap-8 mt-8">
          <div className="col-span-4">
            <div className="bg-white rounded-[10px] overflow-hidden shadow-lg">
              <div className="h-28">
                <img 
                  src={bgLogin}
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center -mt-12">
                <img 
                  src={avatar}
                  alt="Profile" 
                  className="w-[200] h-[200] object-cover rounded-full border-4 border-white"
                />
              </div>
              <div className="text-center px-6 p-8">
                <h2 className="font-medium text-[40px] text-[#344054]">Hi Sara James!</h2>
              </div>
            </div>
          </div>

          <div className="col-span-8">
            <form className="p-8 pt-0 pl-[125px] rounded-[10px]">
              <InputText
                labelTitle="Name:"
                updateFormValue={updateFormValue}
                updateType="name"
                containerStyle="grid grid-cols-12 gap-4 items-center"
                placeholder={formValues.name}
                labelStyle="text-lg font-medium text-[#344054]"
                styleP='py-[10px] rounded-[10px]'
              />
              <InputText
                labelTitle="Job Title:"
                updateFormValue={updateFormValue}
                updateType="jobTitle"
                containerStyle="grid grid-cols-12 gap-4 items-center"
                placeholder={formValues.jobTitle}
                labelStyle="text-lg font-medium text-[#344054]"
                styleP='py-[10px] rounded-[10px]'
              />
              <InputText
                labelTitle="Email:"
                type="email"
                containerStyle="grid grid-cols-12 gap-4 items-center"
                placeholder={formValues.email}
                labelStyle="text-lg font-medium text-[#344054]"
                updateFormValue={updateFormValue}
                updateType="email"
                styleP='py-[10px] rounded-[10px]'
              />
              <InputText
                labelTitle="Phone:"
                type="tel"
                containerStyle="grid grid-cols-12 gap-4 items-center"
                placeholder={formValues.phone}
                labelStyle="text-lg font-medium text-[#344054]"
                updateFormValue={updateFormValue}
                updateType="phone"
                styleP='py-[10px] rounded-[10px]'
              />
              <InputText
                labelTitle="Password:"
                type="password"
                containerStyle="grid grid-cols-12 gap-4 items-center"
                placeholder={formValues.password}
                labelStyle="text-lg font-medium text-[#344054]"
                updateFormValue={updateFormValue}
                updateType="password"
                styleP='py-[10px] rounded-[10px]'
              />
              <InputText
                labelTitle="Address:"
                containerStyle="grid grid-cols-12 gap-4 items-center"
                placeholder={formValues.address}
                labelStyle="text-lg font-medium text-[#344054]"
                updateFormValue={updateFormValue}
                updateType="address"
                styleP='py-[10px] rounded-[10px]'
              />
              <div className="grid grid-cols-12 text-center">
                <button type="submit" className="bg-[#009FF5] text-white px-4 py-1 rounded-[10px] hover:bg-blue-500 col-span-2 col-start-3 text-center text-[20px] mt-8">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
