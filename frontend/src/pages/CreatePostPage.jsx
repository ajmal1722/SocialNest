import { useState, useEffect } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { ToastContainer } from "react-toastify";
import NavigationButton from '../components/reusable/NavigationButton'
import TextInput from "../components/reusable/TextInput";
import SubmitButton from "../components/reusable/SubmitButton";
import ImageInput from "../components/reusable/ImageInput";
import { createPost, updatePostApi } from "../utils/api/post_api";

const CreatePostPage = ({ initialData = null }) => {
    const [contentType, setContentType] = useState('Blog')
    const [files, setFiles] = useState([]);
    const methods = useForm();
    const { reset } = methods;

    useEffect(() => {
        if (initialData) {
            reset({
                caption: initialData.caption,
                blogContent: initialData.blogContent,
                files: initialData.files
            });
            setContentType(initialData.contentType);
            setFiles(initialData.files || []);
        }
    }, [initialData, reset]);

    const submitTextPost = async (data) => {
        const postData = { contentType, ...data }
        // console.log('Post Data:', postData);
        if (initialData) {
            console.log('updata:', postData);
            
            // If initialData is provided, update the post
            await updatePostApi(initialData._id, postData);
        } else {
            // Otherwise, create a new post
            await createPost(postData);
        }

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
                {initialData ? 'Edit Post' : 'Create Post'}
            </h1>
            <NavigationButton 
                navOptions={['Blog', 'Image']}
                activeLink={contentType}
                setActiveLink={setContentType}
            />
            <ToastContainer />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(submitTextPost)}>
                    <TextInput
                        name="caption"
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
                    ) : <ImageInput onFilesChange={setFiles} />
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