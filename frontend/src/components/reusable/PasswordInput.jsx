import { useFormContext } from 'react-hook-form'
import { useState } from 'react';
import { FaLock, FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const PasswordInput = ({ name = 'password', placeholder }) => {

    const {
        register,
        formState: { errors }
    } = useFormContext();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const validation = {
        required: 'Password is required',
        minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long'
        },
        maxLength: {
            value: 14,
            message: 'Password should be less than 14 characters long'
        }
    };

    return (
        <>
            <div className='flex items-center border-b-2 text-gray-400 mb-6'>
                <FaLock />
                <input
                    type={passwordVisible ? "text" : "password"}
                    {...register(name, validation)}
                    placeholder={placeholder}
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
            {errors.password && (
                <p className='error-message'>
                    {errors.password.type === 'required' && validation.required}
                    {errors.password.type === 'minLength' && validation.minLength.message}
                    {errors.password.type === 'maxLength' && validation.maxLength.message}
                </p>
            )}
        </>
    )
}

export default PasswordInput