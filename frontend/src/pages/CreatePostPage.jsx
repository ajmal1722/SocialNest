import { useState } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { ToastContainer } from "react-toastify";
import TextInput from "../components/reusable/TextInput";
import SubmitButton from "../components/reusable/SubmitButton";
import ImageInput from "../components/reusable/ImageInput";
import { createPost } from "../utils/api/post_api";

const CreatePostPage = () => {
    const [contentType, setContentType] = useState('Blog')
    const methods = useForm();

    const submitTextPost = async (data) => {
        console.log('Post Data:', data);  // Check if this logs the data
        createPost(data, contentType)
    };

    return (
        <div className='text-primary-dark dark:text-primary-light md:col-span-6 col-span-10 sm:m-6 m-4'>
            <h1 className='text-2xl font-semibold my-6'>
                Create Post
            </h1>
            <button onClick={() => setContentType('Blog')}>
                Text
            </button>
            <button onClick={() => setContentType('Image')} className="mx-3">
                Images & Video
            </button>
            <ToastContainer />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(submitTextPost)}>
                    {
                        contentType === 'Blog' ? 
                            <TextInput /> : <ImageInput />
                    }
                    
                    <div className="flex justify-end my-6">
                        <SubmitButton content={'Post'} />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default CreatePostPage;