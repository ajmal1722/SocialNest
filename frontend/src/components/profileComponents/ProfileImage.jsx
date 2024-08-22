import { useState } from "react";
import { useSelector } from "react-redux";
import PopConfirm from "../reusable/PopConfirm";

const ProfileImage = ({ initialUser }) => {
  const userInfo = useSelector(state => state.auth.userInfo);
  console.log(initialUser, 'initial user');
  
  return (
    <div className='mt-10 flex justify-center'>
      <img
        src={initialUser ? initialUser.profilePicture : userInfo.profilePicture} alt=""
        className='rounded-full w-auto max-w-52 object-cover'
      />
    </div>
  );
}

export default ProfileImage;