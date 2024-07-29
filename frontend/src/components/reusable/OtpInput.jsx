import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {  toast } from 'react-toastify';
import { generateOtp } from '../../utils/api/user_api';
import CreateNewPassword from '../forgotPassowrd/CreateNewPassword';

const OtpInput = ({ email, initialOtp, setShowOtpInput }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [count, setCount] = useState(60);
    const [otp, setOtp] = useState(initialOtp);
    const [showResendOtpButton, setShowResendOtpButton] = useState(false);

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

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount((prev) => {
                if (prev === 1) {
                    setShowResendOtpButton(true);
                    clearInterval(intervalId);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [otp]);
    
    const resendOtp = async () => {
        const newOtp = await generateOtp({ email }, setShowOtpInput);
        setOtp(newOtp);
        setShowResendOtpButton(false)
        setCount(60)
    }

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
            <h1 className='my-4 text-center '>
                Otp is sent to 
                <span className='font-semibold text-blue-500 mx-1'>
                    { email }
                </span>
            </h1>
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
                        <div className="flex justify-between">
                            <button type='submit' className='bg-gray-600 hover:bg-gray-700 text-white rounded-md p-2 mt-5'>
                                Verify Otp
                            </button>
                            {
                                showResendOtpButton ? 
                                <button type='button' onClick={resendOtp} className='bg-green-500 hover:bg-green-700 text-white rounded-md p-2 mt-5'>
                                    Resend Otp
                                </button> : <h1 className='text-gray-500'>{ count }</h1>
                            }
                        </div>
                    </form>
                )
            }
        </div>
    )
}

export default OtpInput