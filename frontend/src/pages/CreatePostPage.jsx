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
    const { reset } = methods;

    const submitTextPost = async (data) => {
        console.log('Post Data:', data);  // Check if this logs the data
        createPost(data, contentType);
        reset()
    };

    const titleValidation = {
        required: 'This field is required',
        minLength: {
            value: 3,
            message: 'Title must be at least 3 characters long'
        },
    };

    const contentValidation = {
        required: 'This field is required',
        minLength: {
            value: 6,
            message: 'Content must be at least 6 characters long'
        },
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
                    <TextInput
                        name="blogTitle"
                        validation={titleValidation}
                        maxLength={35}
                        placeholder="Type your blog title here"
                        className="bg-primary-light dark:bg-primary-dark text-ternary-dark dark:text-primary-light my-3"
                    />
                    {contentType === 'Blog' ? (
                        <TextInput
                            name="blogContent"
                            validation={contentValidation}
                            maxLength={300}
                            placeholder="Type your message here"
                            className="p-2 h-32"
                        />
                    ) : <ImageInput />
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