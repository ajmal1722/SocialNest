import { useForm } from "react-hook-form"
import PasswordInput from "../reusable/PasswordInput"

const CreateNewPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(); 
    
    const changePassword = (data) => {
        console.log(data);
    }
    return (
        <>
            <form onSubmit={handleSubmit(changePassword)}>
            <PasswordInput placeholder={'Create a new password'} />
            <PasswordInput placeholder={'Confirm password'} />
            </form>
        </>
    )
}

export default CreateNewPassword
