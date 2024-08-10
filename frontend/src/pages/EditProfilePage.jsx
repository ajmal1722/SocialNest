import { useForm, FormProvider } from 'react-hook-form';
import Input from 'antd/es/input/Input';
import TextInput from '../components/reusable/TextInput';
import SubmitButton from '../components/reusable/SubmitButton';


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

    const nameValidation = {
        required: 'This field is required',
        minLength: {
            value: 3,
            message: 'Name must be at least 3 characters'
        },
    };

    return (
        <div className='min-h-[90vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            <h1 className='text-center'>
                Edit Profile
            </h1>
            <div className='lg:w-9/12 w-full'>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(submitTextPost)}>
                        <div className='flex border p-3 my-4 mt-8 rounded-lg'>
                            <img  alt="" 
                                src=""
                                className='rounded-full max-h-28'
                            />
                        </div>
                        <TextInput
                            name="name"
                            validation={nameValidation}
                            maxLength={30}
                            placeholder="Enter your name"
                            className="bg-primary-light dark:bg-primary-dark text-ternary-dark dark:text-primary-light my-3 "
                        />
                        <TextInput
                            name="bio"
                            maxLength={150}
                            placeholder="Type your message here"
                            className="p-2 h-32"
                        />
                        <div className="flex justify-end my-6">
                            <SubmitButton content={'Post'} />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default EditProfilePage