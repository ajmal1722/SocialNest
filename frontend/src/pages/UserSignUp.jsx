import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { FaRegUser, FaLock, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import instance from '../axios_instaces/userInstance';
import Input from '../components/reusable/Input';

const UserSignUp = () => {
    const methods = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { handleSubmit } = methods;

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const userLogin = async (data) => {
        try {
            const response = await instance.post('/login', data)
            console.log(response.data)

            const { token } = response.data

            if (token) {
                console.log('token is present')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className=' pt-10 pb-6 px-6 max-w-md min-w-80 shadow-2xl shadow-gray-500/40'>
                <div className="textcenter text-3xl my-8 text-center font-semibold">
                    Sigu Up
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(userLogin)} >
                    <Input
                        type='text'
                        name='email'
                        placeholder='Enter your email'
                        Icon={FaRegUser}
                        errorMessage='Email is required'
                    />
                    <div className='flex items-center border-b-2 text-gray-400 mb-6'>
                        <FaLock />
                        <input
                            type={passwordVisible ? "text" : "password"}
                            {...methods.register('password', { required: true })}
                            placeholder='Password'
                            className='p-3 w-full focus:outline-none'
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="focus:outline-none"
                        >
                            {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                    <button type='submit' className='bg-green-400 hover:bg-green-500 text-white w-full rounded-full p-2 '>
                        Login
                    </button>
                </form>
                </FormProvider>
                
            </div>
        </div>
    )
}

export default UserSignUp
