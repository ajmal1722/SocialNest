import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { FaRegUser, FaLock, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import instance from '../axios_instaces/userInstance';

const UserLogin = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

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
                    Login
                </div>
                <form onSubmit={handleSubmit(userLogin)} >
                    <div className='flex min-w-72 items-center border-b-2 text-gray-400 mb-6 '>
                        <FaRegUser />
                        <input
                            type="text"
                            {...register('email', { required: true })}
                            placeholder='Username or email'
                            className='p-3 w-full focus:outline-none'
                        />
                    </div>
                    {errors.email && <p className='error-message'>This field is required</p>}
                    <div className='flex items-center border-b-2 text-gray-400 mb-6'>
                        <FaLock />
                        <input
                            type={passwordVisible ? "text" : "password"}
                            {...register('password', { required: true })}
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
                    {errors.password && <p className='error-message'>Enter Password</p>}
                    <button type='submit' className='bg-blue-400 hover:bg-blue-500 text-white w-full rounded-full p-2 '>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserLogin