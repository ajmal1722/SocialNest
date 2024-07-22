import userInstance from '../../axios_instaces/userInstance'
import { toast } from 'react-toastify'

export const userLogin = async (data) => {
    try {
        const response = await userInstance.post('/login', data)
        console.log(response.data)
        
    } catch (error) {
        toast.error(error.response.data.error)
    }
}

export const handleLogout = async (navigate) => {
    try {
        await userInstance.post('/logout');
        navigate('/user/login');
        toast.success('Successfully logged out');
    } catch (error) {
        console.error('Logout failed', error);
        toast.error('Logout failed');
    }
};

export const googleAuthLoginSuccess = async (credentialResponse, navigate) => {
    try {
        const response = await userInstance.post(
            '/login',
            { token: credentialResponse.credential },
            { withCredentials: true }
        )

        if (response) {
            navigate('/')
        } else {
            console.log('response not received');
        }

    } catch (error) {
        console.log('google auth error:', error);
        toast.error(error.response.data.error);
    }
}

export const generateOtp = async (data, setShowOtpInput) => {
    // console.log('Forgot Password Data:', data);

    try {
        const response = await userInstance.post('/generate-otp', data)
        if (response) {
            setShowOtpInput(prevState => !prevState)
            return response.data.otp;
        }
    } catch (error) {
        console.log('Error during password reset:', error);
        toast.error(error.response.data.error)
    }
}

export const changePasswordApi = async (data) => {
    // console.log('Forgot Password Data:', data);

    try {
        const response = await userInstance.post('/change-password', data)
        console.log(response.data);
    } catch (error) {
        console.log('Error during password reset:', error);
        toast.error(error.response.data.error)
    }
}