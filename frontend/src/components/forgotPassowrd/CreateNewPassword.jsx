import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import PasswordInput from "../reusable/PasswordInput";
import SubmitButton from "../reusable/SubmitButton";
import { changePasswordApi } from "../../utils/api/user_api";

const CreateNewPassword = ({ email }) => {
    const methods = useForm(); 
    
    const checkPassword = (data) => {
        const userData = { email, ...data }
        if (data.password === data.confirmPassword) {
            changePasswordApi(userData)
        } else {
            toast.error('Password does not match')
        }
    }
    return (
        <>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(checkPassword)}>
            <PasswordInput placeholder={'Create a new password'} />
            <PasswordInput placeholder={'Confirm password'} name={'confirmPassword'} />
            <SubmitButton content={'Submit'} />
            </form>
            </FormProvider>
        </>
    )
}

export default CreateNewPassword
