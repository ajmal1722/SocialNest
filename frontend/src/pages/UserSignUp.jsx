import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { FaRegUser, FaLock, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import instance from '../axios_instaces/userInstance';
import Input from '../components/reusable/Input';

const UserSignUp = () => {
    const methods = useForm({
        defaultValues: {
            email: "",
            username: "",
            name: "",
            password: ""
        }
    });

    const { handleSubmit, formState: { errors } } = methods;

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
                    Sign Up
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(userLogin)} >
                        <Input
                            type='text'
                            name='email'
                            placeholder='Enter your email'
                            Icon={GoMail}
                            errorMessage='Email is required'
                            validation={{ 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address'
                                }
                            }}
                        />
                        <Input
                            type='text'
                            name='username'
                            placeholder='Create a username'
                            Icon={FaRegUser}
                            errorMessage='Username is required'
                            validation={{
                                required: 'Username is required',
                                minLength: {
                                    value: 3,
                                    message: 'Username must be at least 3 characters long'
                                }
                            }}
                        />
                        <Input
                            type='text'
                            name='name'
                            placeholder='Enter your Full Name'
                            Icon={FaRegUser}
                            errorMessage='Your name is required'
                            validation={{
                                required: 'Name is required',
                                minLength: {
                                    value: 3,
                                    message: 'Name must be at least 3 characters long'
                                }
                            }}
                        />
                        <div className='flex items-center border-b-2 text-gray-400 mb-6'>
                            <FaLock />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                {...methods.register('password', { required: true })}
                                placeholder='Password'
                                className='p-3 w-full focus:outline-none'
                                validation={{
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be 8 characters long'
                                    },
                                    maxLength: {
                                        value: 14,
                                        message: 'Password should less than 14 characters long'
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="focus:outline-none"
                            >
                                {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                        {errors.password && <p className='error-message'>Password is required</p>}
                        <button type='submit' className='bg-green-400 hover:bg-green-500 text-white w-full rounded-full p-2 '>
                            Sign Up
                        </button>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default UserSignUp
