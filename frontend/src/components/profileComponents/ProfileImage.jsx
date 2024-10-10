import { useSelector } from "react-redux";

const ProfileImage = ({ initialUser }) => {
  const userInfo = useSelector(state => state.auth.userInfo);
  
  return (
    <div className='mt-10 flex justify-center'>
      <img
        src={initialUser ? initialUser.profilePicture : userInfo.profilePicture} alt=""
        className='rounded-full max-h-56'
      />
    </div>
  );
}

export default ProfileImage;