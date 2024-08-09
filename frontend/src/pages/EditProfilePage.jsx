import { useForm, FormProvider } from 'react-hook-form';

const EditProfilePage = () => {
    const methods = useForm();
    const { reset } = methods;

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
    return (
        <div className='min-h-[90vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            <h1 className='text-center'>
                Edit Profile
            </h1>
            {/* <FormProvider {...methods}>
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
            </FormProvider> */}
        </div>
    )
}

export default EditProfilePage