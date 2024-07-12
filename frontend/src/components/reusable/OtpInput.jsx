import { Input } from 'antd'
import { generateOtp } from '../../utils/api/user_api';

const OtpInput = () => {
    const onChange = (text) => {
        console.log('onChange:', text);
    };
    const sharedProps = {
        onChange,
        generateOtp
    };
    return (
        <div className='my-4'>
            <Input.OTP {...sharedProps} />
        </div>
    )
}

export default OtpInput
