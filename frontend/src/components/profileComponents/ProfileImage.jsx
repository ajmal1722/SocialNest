import { useState } from "react";
import { useSelector } from "react-redux";
import PopConfirm from "../reusable/PopConfirm";

const ProfileImage = () => {
  const [showModal, setShowModal] = useState(false);
  const userInfo = useSelector(state => state.auth.userInfo);

  const handleUpdateProfilePhoto = () => {
    // Logic to update the profile photo
    console.log('Updating profile photo...');
    setShowModal(false);
  };

  const handleCancelUpdate = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className='mt-10 flex justify-center'>
      <img
        onClick={openModal}
        src={userInfo.profilePicture} alt=""
        className='rounded-full w-auto max-w-52 cursor-pointer object-cover'
      />
      {showModal && (
        <PopConfirm
          title='Update Profile Photo'
          description='Do you want to update your profile photo?'
          onConfirm={handleUpdateProfilePhoto}
          onCancel={handleCancelUpdate}
          buttonText='Update'
          okText='Yes, update'
          cancelText='No, cancel'
        />
      )}
    </div>
  );
}

export default ProfileImage;