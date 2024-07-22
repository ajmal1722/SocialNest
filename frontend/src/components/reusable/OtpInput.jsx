import { Input } from 'antd';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {  toast } from 'react-toastify';
import CreateNewPassword from '../forgotPassowrd/CreateNewPassword';
import { generateOtp } from '../../utils/api/user_api';
import axios from 'axios';

const OtpInput = ({ email, otp, showOtpInput, setShowOtpInput }) => {
    const [enteredOtp, setEnteredOtp] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onChange = (text) => {
        console.log('onChange:', text);
        setEnteredOtp(text)
    };
    const sharedProps = {
        onChange,
    };

    const checkOtp = (data) => {
        setEnteredOtp(data.otp);
        console.log(otp, data.otp);
        if (otp == data.otp) {
            // setShowOtpInput(false)
            toast.success('OTP verification is Successfull')
        } else {
            toast.error('OTP verification failed')
        }
    }
    return (
        <div className='my-4'>
            {
                showOtpInput ? (
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
                ) : <CreateNewPassword />
            }
        </div>
    )
}

export default OtpInput
