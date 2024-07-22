import { useForm, FormProvider } from "react-hook-form"
import PasswordInput from "../reusable/PasswordInput"

const CreateNewPassword = () => {
    const methods = useForm(); 
    
    const changePassword = (data) => {
        console.log(data);
    }
    return (
        <>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(changePassword)}>
            <PasswordInput placeholder={'Create a new password'} />
            <PasswordInput placeholder={'Confirm password'} />
            </form>
            </FormProvider>
        </>
    )
}

export default CreateNewPassword
