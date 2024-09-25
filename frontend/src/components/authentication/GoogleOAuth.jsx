import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { set_credentials } from '../../redux/slices/authSlice';
import { googleAuthLoginSuccess } from '../../utils/api/user_api';
import { useNavigate } from 'react-router-dom';

const GoogleOAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSuccess = async (credentialResponse) => {
        try {
            const response = await googleAuthLoginSuccess(credentialResponse, navigate);
            console.log('Google Auth Response:', response);

            if (response) {
                dispatch(set_credentials(response));
                navigate('/');
            } else {
                console.error('Google authentication failed');
            }
        } catch (error) {
            console.error('Error during Google authentication:', error);
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
                console.error('Google Login Failed');
            }}
        />
    );
};

export default GoogleOAuth;