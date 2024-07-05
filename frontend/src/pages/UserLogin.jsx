import { useForm, FormProvider } from 'react-hook-form';
import { GoMail } from "react-icons/go";
import instance from '../axios_instaces/userInstance';
import Input from '../components/reusable/Input';
import PasswordInput from '../components/reusable/PasswordInput';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useSelector, useDispatch } from 'react-redux';
import { set_credentials } from '../redux/slices/authSlice';

const UserLogin = () => {
    const methods = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { handleSubmit, reset } = methods; 

    const { userInfo } = useSelector(state => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = async (data) => {
        try {
            const response = await instance.post('/login', data)
            console.log(response.data)

            const { username, email } = response.data

            if (username && email) {
                dispatch(set_credentials({ username, email }))
                reset()
                navigate('/')
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
                        <PasswordInput />
                        <div className='flex justify-end mx-2 text-blue-600 text-sm mb-5 hover:font-semibold cursor-pointer forgotten-password' >
                            Forgotten Your Password?
                        </div>
                        <button type='submit' className='bg-green-300 hover:bg-green-500 text-white w-full rounded-full p-2 '>
                            Login
                        </button>
                    </form>
                </FormProvider>
                <div className='bord my-6 flex justify-center'>
                    <h1 className='text-gray-500'>
                        Or
                    </h1>
                </div>
                <div className='bg-gray-100 hover:bg-gray-200 p-3 rounded-lg flex justify-center gap-4 cursor-pointer'>
                    <FcGoogle className='text-2xl' />
                    <h1 className='font-semibold text-gray-600'>
                        Login with Google
                    </h1>
                </div>
                <div className="my-4">
                    <h1 className='text-gray-600 text-center'>
                        Don't have an account? 
                        <Link to={'/user/signup'} className='text-blue-600 hover:text-blue-800 font-semibold cursor-pointer px-2'>
                            Sign Up
                        </Link>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default UserLogin