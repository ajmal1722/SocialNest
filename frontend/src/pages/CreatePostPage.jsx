import { NavLink } from "react-router-dom";
import { useForm, FormProvider } from 'react-hook-form';
import TextInput from "../components/reusable/TextInput";
import SubmitButton from "../components/reusable/SubmitButton";
import PasswordInput from "../components/reusable/PasswordInput";

const CreatePostPage = () => {
    const methods = useForm();

    const submitTextPost = async (data) => {
        console.log('Post Data:', data);  // Check if this logs the data
    };

    return (
        <div className='text-primary-dark dark:text-primary-light col-span-6 sm:m-6 m-4'>
            <h1 className='text-2xl font-semibold my-6'>
                Create Post
            </h1>
            <NavLink to="/create-post/text">
                Text
            </NavLink>
            <NavLink to="/create-post/images-video" className='mx-6'>
                Images & Video
            </NavLink>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(submitTextPost)}>
                    <TextInput />
                    <div className="flex justify-end my-6">
                        <SubmitButton content={'Post'} />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default CreatePostPage;