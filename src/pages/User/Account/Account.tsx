import React, { useState, useEffect } from 'react';
import bgLogin from '../../../assets/bg-login.png';
import avatar from '../../../assets/AvatarImage.png';
import InputText from '../../../components/Input/InputText';
import { jwtDecode } from 'jwt-decode';
import { getData } from '../../../api/AxiosGet';
import { useUpdate } from '../../../api/AxiosPut';
import { notification } from 'antd';

const Account: React.FC = () => {
    const { update, updateResponse } = useUpdate();

    const [formValues, setFormValues] = useState({
        name: '',
        jobTitle: '',
        email: '',
        phone: '',
        password: '',
        address: '',
    });

    const token = localStorage.getItem('token') || "";
    const dataUser: any = jwtDecode(token);

    const { response, error, fetchData } = getData({
        endpoint: `users/${dataUser.sub}`,
        url: ''
    });

    useEffect(() => {
        fetchData(`users/${dataUser.sub}`);
    }, []);

    useEffect(() => {
        if (response) {
            setFormValues({
                name: response.username || '',
                jobTitle: response.jobTitle || '',
                email: response.email || '',
                phone: response.phone || '',
                password: '',
                address: response.address || '',
            });
        }
    }, [response]);

    const updateFormValue = ({ updateType, value }: { updateType: string; value: string }) => {
        setFormValues({ ...formValues, [updateType]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await update({
                data: {
                    email: formValues.email,
                },
                endpoint: `/users/${dataUser.sub}`,
            });
            notification.success({
                message: 'Update Successful',
                description: 'Your account information has been successfully updated.',
            });
        } catch (error) {
            notification.error({
                message: 'Update Failed',
                description: 'An error occurred while updating your account information.',
            });
        }
    };

    useEffect(() => {
        if (updateResponse !== null && updateResponse === 204) {
            notification.success({
                message: 'Update Successful',
                description: 'Your account information has been successfully updated.',
            });
        }
    }, [updateResponse]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="container max-w-[90%] lg:max-w-[80%] mx-auto" style={{ height: 'calc(100% - 100px)' }}>
            <div className="py-6 sm:py-8 md:py-10">
                <p className="font-bold text-xl sm:text-2xl md:text-3xl text-[#344054]">Account Settings</p>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 sm:mt-8 md:mt-10">
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-[10px] overflow-hidden shadow-lg">
                            <div className="h-28">
                                <img src={bgLogin} alt="Background" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex justify-center -mt-12">
                                <img src={avatar} alt="Profile" className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] object-cover rounded-full border-4 border-white" />
                            </div>
                            <div className="text-center px-4 sm:px-6 p-6 sm:p-8">
                                <h2 className="font-medium text-lg sm:text-xl md:text-2xl text-[#344054]">Hi {formValues.name}!</h2>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 lg:pl-[125px]">
                        <form className="rounded-[10px] p-0" onSubmit={handleSubmit}>
                            <InputText
                                labelTitle="Name:"
                                updateFormValue={updateFormValue}
                                updateType="name"
                                containerStyle="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                                defaultValue={formValues.name || ""}
                                placeholder="Enter your name"
                                labelStyle="text-sm sm:text-lg font-medium text-[#344054] col-span-2"
                                styleP="py-2 sm:py-[10px] rounded-[10px] bg-gray-200"
                            />
                            <InputText
                                labelTitle="Job Title:"
                                updateFormValue={updateFormValue}
                                updateType="jobTitle"
                                containerStyle="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                                defaultValue={formValues.jobTitle}
                                placeholder="Enter your job title"
                                labelStyle="text-sm sm:text-lg font-medium text-[#344054] col-span-2"
                                styleP="py-2 sm:py-[10px] rounded-[10px]"
                            />
                            <InputText
                                labelTitle="Email:"
                                type="email"
                                containerStyle="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                                defaultValue={formValues.email}
                                placeholder="Enter your email"
                                labelStyle="text-sm sm:text-lg font-medium text-[#344054] col-span-2"
                                updateFormValue={updateFormValue}
                                updateType="email"
                                styleP="py-2 sm:py-[10px] rounded-[10px]"
                            />
                            <InputText
                                labelTitle="Phone:"
                                type="tel"
                                containerStyle="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                                defaultValue={formValues.phone}
                                placeholder="Enter your phone number"
                                labelStyle="text-sm sm:text-lg font-medium text-[#344054] col-span-2"
                                updateFormValue={updateFormValue}
                                updateType="phone"
                                styleP="py-2 sm:py-[10px] rounded-[10px]"
                            />
                            <InputText
                                labelTitle="Password:"
                                type="password"
                                containerStyle="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                                defaultValue={formValues.password}
                                placeholder="Enter your password"
                                labelStyle="text-sm sm:text-lg font-medium text-[#344054] col-span-2"
                                updateFormValue={updateFormValue}
                                updateType="password"
                                styleP="py-2 sm:py-[10px] rounded-[10px]"
                            />
                            <InputText
                                labelTitle="Address:"
                                containerStyle="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                                defaultValue={formValues.address}
                                placeholder="Enter your address"
                                labelStyle="text-sm sm:text-lg font-medium text-[#344054] col-span-2"
                                updateFormValue={updateFormValue}
                                updateType="address"
                                styleP="py-2 sm:py-[10px] rounded-[10px]"
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-12 text-center">
                                <button type="submit" className="bg-[#009FF5] text-white px-4 leading-9 sm:py-1 rounded-[10px] hover:bg-blue-500 col-span-4 sm:col-span-3 col-start-5 sm:col-start-3 text-center text-sm sm:text-[20px] mt-6 sm:mt-8">
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
