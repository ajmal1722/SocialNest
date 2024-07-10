import { GoogleLogin } from '@react-oauth/google';
import { googleAuthLoginSuccess } from '../../utils/api/user_api';
import { useNavigate } from 'react-router-dom';

const GoogleOAuth = () => {
    const navigate = useNavigate()

    const handleSuccess = (credentialResponse) => {
        googleAuthLoginSuccess(credentialResponse, navigate)
    }
    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}

export default GoogleOAuth