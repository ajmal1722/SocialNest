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
            setShowOtpInput(true)
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
        toast.success(response.data.message);

    } catch (error) {
        console.log('Error during password reset:', error);
        toast.error(error.response.data.error)
    }
}

export const singleUserDetailsApi = async (id) => {
    try {
        const response = await userInstance.get(`/${id}`)
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('Error during password reset:', error);
        toast.error(error.response.data.error)
    }
}

export const updateUserProfileApi = async (data) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };

    try {
        const formData = new FormData();
        
        if (data.image) {
            formData.append('image', data.image);
        }
        if (data.name) {
            formData.append('name', data.name);
        }
        if (data.bio) {
            formData.append('bio', data.bio);
        }

        // Replace the following line with the actual API call
        // const response = await userInstance.put('/update-data', formData, config)
        console.log('Form Data:', data);
        // return response.data;
    } catch (error) {
        console.log('Error during profile update:', error);
        toast.error(error.response?.data?.error || 'Failed to update profile');
    }
};

export const searchUserApi = async (searchText) => {
    try {
        const response = await userInstance.post('/search', searchText)
        console.log('response for searching user: ', response.data);
        return response.data.users;
    } catch (error) {
        console.log('Error during searching user:', error);
    }
}