import { useSelector } from "react-redux";

const ProfileImage = () => {
  const userInfo = useSelector(state => state.auth.userInfo);
  console.log('user pic:', userInfo);

  return (
    <div className='mt-10 flex justify-center' >
      <img
        src={userInfo.profilePicture} alt=""
        className='rounded-full w-auto max-w-52'
      />
    </div>
  )
}

export default ProfileImage
