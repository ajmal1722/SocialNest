import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { GoMail } from "react-icons/go";
import { adminLoginApi, checkAdminAuthenticatedApi } from '../../utils/api/admin_api';
import Input from '../../components/reusable/Input'
import PasswordInput from '../../components/reusable/PasswordInput';
import useCheckAuth from '../../utils/auth/AuthenticatedRedirect';
import { ToastContainer } from 'react-toastify';

const AdminLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = async () => {
            const response = await checkAdminAuthenticatedApi();
            if (response.isAuthenticated) {
                navigate('/admin');
            }     
        }

        isAuthenticated()
    }, [])

    const methods = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { handleSubmit, reset } = methods; 

    const userLogin = async (data) => {
        try {
            const response = await adminLoginApi(data);
            if (response) {
                reset()
                navigate('/admin')
            }
        } catch (error) {
            console.log('error while login:', error)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className='pt-10 pb-6 px-6 max-w-md min-w-80 shadow-2xl shadow-gray-500/40'>
                <div className="textcenter text-3xl my-8 text-center font-semibold">
                    Login
                </div>
                < ToastContainer />
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
                        <PasswordInput placeholder={'Enter your password'} />
                        <button type='submit' className='bg-green-300 hover:bg-green-500 text-white w-full rounded-full p-2 '>
                            Login
                        </button>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default AdminLogin