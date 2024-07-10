import userInstance from '../../axios_instaces/userInstance'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import instance from '../../axios_instaces/userInstance'
import { FaAsterisk } from 'react-icons/fa'

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

export const googleAuthLoginError = async () => {
    console.log(error);
}