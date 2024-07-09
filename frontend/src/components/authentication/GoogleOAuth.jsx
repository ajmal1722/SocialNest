import { GoogleLogin } from '@react-oauth/google';

const GoogleOAuth = () => {
    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}

export default GoogleOAuth

// client id = 1055536125565-teftfkurdnm5pipbmi24aujk3lph4mv6.apps.googleusercontent.com
// client secret = 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