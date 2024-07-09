import userInstance from '../../axios_instaces/userInstance'
import { useNavigate } from 'react-router-dom'
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