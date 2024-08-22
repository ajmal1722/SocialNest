import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider, } from 'react-hook-form';
import { Spin, message } from 'antd';
import { updateUserProfileApi } from '../utils/api/user_api';
import { set_credentials } from '../redux/slices/authSlice';
import TextInput from '../components/reusable/TextInput';
import ReusableModal from '../components/reusable/ReusableModal';
import ImageCropper from '../components/editProfilePage/ImageCropper';
import SubmitButton from '../components/reusable/SubmitButton';

const EditProfilePage = () => {
    const methods = useForm();
    const dispatch = useDispatch()
    const { reset } = methods;
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const userData = useSelector(state => state.auth.userInfo);

    const closeModal = () => {
        setShowModal(false)
    }
    const submitProfileData = async (data) => {
        await updateUserProfileApi(data);
        reset();
    };

    const nameValidation = {
        required: 'This field is required',
        minLength: {
            value: 3,
            message: 'Name must be at least 3 characters'
        },
    };

    const uploadImage = async (formData) => {
        try {
            setLoading(true)
            const response = await updateUserProfileApi(formData);
            if (response) {
                setLoading(false);
                console.log(response);
                dispatch(set_credentials(response.user))
                message.success('Profile image updated');
            }
        } catch (error) {
            setLoading(false)
            message.error('Failed to update profile image');
        }
    };

    return (
        <div className='min-h-[70vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            <div className='lg:w-9/12 w-full'>
                <div className='flex items-center justify-between border p-3 my-4 mt-8 rounded-lg'>
                    <img
                        alt={userData?.name}
                        src={userData?.profilePicture}
                        className='rounded-full max-h-20'
                    />
                    {loading ?
                        (<Spin className='mr-5 sm:mr-14 md:mr-18' />) : (
                            <button
                                onClick={() => setShowModal(true)}
                                className='mx-2 sm:mr-5 md:mr-8 px-3 p-1 rounded-lg text-primary-light bg-ternary-dark '
                            >
                                Change Photo
                            </button>
                        )}
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(submitProfileData)}>
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
            {showModal &&
                <ReusableModal
                    isVisible={showModal}
                    onClose={closeModal}
                    Content={() => (
                        <ImageCropper
                            onClose={closeModal}
                            uploadImage={uploadImage}
                        />
                    )}
                />
            }
        </div>
    );
};

export default EditProfilePage;