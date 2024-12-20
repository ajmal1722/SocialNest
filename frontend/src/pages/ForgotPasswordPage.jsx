import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { GoMail } from "react-icons/go";
import CustomInput from "../components/reusable/Input";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import OtpInput from '../components/reusable/OtpInput';
import { generateOtp } from '../utils/api/user_api';
import { ToastContainer } from 'react-toastify';

const ForgotPasswordPage = () => {
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const methods = useForm({
        defaultValues: {
            email: ""
        }
    });

    const { handleSubmit } = methods;

    const handleForgotPassword = async (data) => {
        console.log('data from:', data);
        setEmail(data.email)
        const otp = await generateOtp(data, setShowOtpInput)
        setOtp(otp);
    }

    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="pt-4 pb-6 px-6 sm:px-12 max-w-md min-w-80 sm:min-w-96 shadow-2xl shadow-gray-500/40">
                <div className="flex justify-end w-full text-2xl mt-8 hover:text-3xl">
                    <Link to={'/user/login'}>
                        <IoMdArrowRoundBack />
                    </Link>
                </div>
                <ToastContainer />
                <div className="text-center text-3xl my-8 font-semibold">
                    Forgot Password
                </div>
                {
                    showOtpInput ?
                        <OtpInput email={email} initialOtp={otp} showOtpInput={showOtpInput} setShowOtpInput={setShowOtpInput} /> : (
                            <FormProvider {...methods}>
                                <form onSubmit={handleSubmit((data) => handleForgotPassword(data, setShowOtpInput))} >
                                    <CustomInput
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
                                    <button type='submit' className='bg-gray-600 hover:bg-gray-700 text-white rounded-md p-2 '>
                                        Genereate Otp
                                    </button>
                                </form>
                            </FormProvider>
                        )
                }
            </div>
        </div>
    )
}

export default ForgotPasswordPage;