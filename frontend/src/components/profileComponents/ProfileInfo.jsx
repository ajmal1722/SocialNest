import { useState } from "react";
import { useSelector } from "react-redux";
import { LiaUserEditSolid } from "react-icons/lia";
import { fetchFollowers, fetchFollowing } from "../../utils/api/follow_api";
import DateFormatter from "../reusable/DateFormatter";
import ContentDisplayingModal from "../reusable/ContentDisplayingModal";
import LogoutButton from "../authentication/LogoutButton";

const ProfileInfo = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState([]);

    const userInfo = useSelector(state => state.auth.userInfo);
    const followers = userInfo.followers;
    const following = userInfo.following;

    const showFollowers = async () => {
        const followersDetails = await fetchFollowers()
        setModalContent(followersDetails);
        setIsModalVisible(true);
    };

    const showFollowing = async () => {
        const followingDetails = await fetchFollowing()
        setModalContent(followingDetails);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setModalContent([]);
    };
    console.log('date:', userInfo);

    return (
        <div className="flex justify-center mt-5">
            <div >
                <div className='md:flex my-4 gap-2 items-center'>
                    <h1 className='text-2xl font-semibold mb-3 text-center mt-2'>
                        {userInfo.name}
                    </h1>
                    <div className="flex gap-4">
                        <button className='text-lg md:px-6 px-3 py-1 md:ml-8 rounded-lg bg-ternary-dark dark:bg-secondary-dark text-white flex items-center gap-2'>
                            Edit Profile
                            <LiaUserEditSolid className="text-2xl " />
                        </button>
                        <LogoutButton />
                    </div>
                </div>
                <div className="flex justify-center md:block">
                    <div className="">
                        <h1 className='font-semibold mb-4 text-center md:text-start'>
                            <span className='font-bold text-2xl m-1'>@</span>
                            {userInfo.username}
                        </h1>
                        <div className='flex gap-6 my-4 text-center '>
                            <div className='cursor-pointer'>
                                <h1 className='text-2xl font-bold'>
                                    0
                                </h1>
                                <h1>
                                    Posts
                                </h1>
                            </div>
                            <div onClick={showFollowers} className='cursor-pointer'>
                                <h1 className='text-2xl font-bold'>
                                    {followers.length}
                                </h1>
                                <h1>
                                    Followers
                                </h1>
                            </div>
                            <div onClick={showFollowing} className='cursor-pointer'>
                                <h1 className='text-2xl font-bold'>
                                    {following.length}
                                </h1>
                                <h1>
                                    Following
                                </h1>
                            </div>
                        </div>
                        {
                            userInfo.createdAt &&
                            <div className="flex items-center gap-1 md:justify-normal justify-center">
                                Member since
                                <DateFormatter date={userInfo.createdAt} />

                            </div>
                        }
                    </div>
                </div>

                <ContentDisplayingModal
                    isVisible={isModalVisible}
                    onClose={closeModal}
                    content={modalContent}
                />
            </div>
        </div>
    )
}

export default ProfileInfo;