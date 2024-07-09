import { useForm, FormProvider } from 'react-hook-form';
import { FaRegUser } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import instance from '../axios_instaces/userInstance';
import Input from '../components/reusable/Input';
import PasswordInput from '../components/reusable/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import useCheckAuth from '../utils/auth/AuthenticatedRedirect';

const UserSignUp = () => {
    useCheckAuth()

    const methods = useForm({
        defaultValues: {
            email: "",
            username: "",
            name: "",
            password: ""
        }
    });

    const navigate = useNavigate()

    const { handleSubmit, reset } = methods;

    const userSigningUp = async (data) => {
        try {
            const response = await instance.post('/signup', data)
            console.log(response.data)

            const { user } = response.data

            if (user) {
                console.log('token is present')
                reset()
                navigate('/user/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className=' pt-4 pb-6 px-6 max-w-md min-w-80 shadow-2xl shadow-gray-500/40'>
                <div className="textcenter text-3xl my-6 text-center font-semibold">
                    Sign Up
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(userSigningUp)} >
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
                        <PasswordInput/>
                        <button type='submit' className='bg-green-300 hover:bg-green-500 text-white w-full rounded-full p-2 '>
                            Sign Up
                        </button>
                    </form>
                </FormProvider>
                <div className="my-4">
                    <h1 className='text-gray-600 text-center'>
                        Already have an account? 
                        <Link to={'/user/login'} className='text-blue-600 hover:text-blue-800 font-semibold cursor-pointer px-2'>
                            Login
                        </Link>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default UserSignUp