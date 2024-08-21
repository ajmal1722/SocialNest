import { useState } from "react";
import { useSelector } from "react-redux";
import PopConfirm from "../reusable/PopConfirm";

const ProfileImage = () => {
  const userInfo = useSelector(state => state.auth.userInfo);
  
  return (
    <div className='mt-10 flex justify-center'>
      <img
        src={userInfo.profilePicture} alt=""
        className='rounded-full w-auto max-w-52 object-cover'
      />
    </div>
  );
}

export default ProfileImage;