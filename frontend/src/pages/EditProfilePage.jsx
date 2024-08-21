import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { updateUserProfileApi } from '../utils/api/user_api';
import TextInput from '../components/reusable/TextInput';
import ImageInput from '../components/reusable/ImageInput';
import SubmitButton from '../components/reusable/SubmitButton';

const EditProfilePage = () => {
    const methods = useForm();
    const { reset } = methods;
    const userData = useSelector(state => state.auth.userInfo);

    const submitProfileData = async (data) => {

        const response = await updateUserProfileApi(data);

        console.log('update user profile Data:', response);

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
        <div className='min-h-[70vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            <div className='lg:w-9/12 w-full'>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(submitProfileData)}>
                        <div className='flex items-center justify-between border p-3 my-4 mt-8 rounded-lg'>
                            <img  alt={userData?.name} 
                                src={userData?.profilePicture}
                                className='rounded-full max-h-20'
                            />
                            <ImageInput />
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
                            <SubmitButton content={'Update'} />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default EditProfilePage