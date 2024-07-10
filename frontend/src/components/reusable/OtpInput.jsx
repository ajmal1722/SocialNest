import { Input } from 'antd'

const OtpInput = () => {
    const onChange = (text) => {
        console.log('onChange:', text);
    };
    const sharedProps = {
        onChange,
    };
    return (
        <div className='my-4'>
            <Input.OTP {...sharedProps} />
        </div>
    )
}

export default OtpInput
