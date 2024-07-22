import { useForm, FormProvider } from "react-hook-form"
import PasswordInput from "../reusable/PasswordInput";
import SubmitButton from "../reusable/SubmitButton";
import { toast } from "react-toastify";

const CreateNewPassword = () => {
    const methods = useForm(); 
    
    const changePassword = (data) => {
        console.log(data);
        if (data.password === data.confirmPassword) {
            toast.success('hello')
        } else {
            toast.error('Password does not match')
        }
    }
    return (
        <>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(changePassword)}>
            <PasswordInput placeholder={'Create a new password'} />
            <PasswordInput placeholder={'Confirm password'} name={'confirmPassword'} />
            <SubmitButton content={'Submit'} />
            </form>
            </FormProvider>
        </>
    )
}

export default CreateNewPassword
