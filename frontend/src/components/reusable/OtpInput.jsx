import { Input } from 'antd';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {  toast } from 'react-toastify';
import CreateNewPassword from '../forgotPassowrd/CreateNewPassword';

const OtpInput = ({ email, otp, showOtpInput, setShowOtpInput }) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onChange = (text) => {
        console.log('onChange:', text);
    };
    const sharedProps = {
        onChange,
    };

    const checkOtp = (data) => {
        if (otp == data.otp) {
            setShowPassword(true)
            toast.success('OTP verification is Successfull')
        } else {
            toast.error('OTP verification failed')
        }
    }
    return (
        <div className='my-4'>
            {
                showPassword ? <CreateNewPassword email={email} /> : (
                    <form onSubmit={handleSubmit(checkOtp)}>
                        <Controller
                            name="otp"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'OTP is required' }}
                            render={({ field }) => (
                                <Input.OTP
                                    {...field}
                                />
                            )}
                        /><br />
                        {errors.otp && <span className="text-red-500">{errors.otp.message}</span>}<br />
                        <button type='submit' className='bg-gray-600 hover:bg-gray-700 text-white rounded-md p-2 mt-5'>
                            Genereate Otp
                        </button>
                    </form>
                )
            }
        </div>
    )
}

export default OtpInput
