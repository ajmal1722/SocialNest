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

    return (
        <div>
            <div className='flex my-4 gap-2'>
                <h1 className='text-2xl font-semibold'>
                    { userInfo.name } 
                </h1>
                <button className='text-lg px-6 py-1 ml-8 rounded-lg bg-ternary-dark dark:bg-secondary-dark text-white flex items-center gap-2'>
                    Edit Profile
                    <LiaUserEditSolid className="text-2xl " />
                </button>
                <LogoutButton />
            </div>
            <h1 className='font-semibold mb-4'>
                <span className='font-bold text-2xl m-1'>@</span>
                { userInfo.username }
            </h1>
            <div className='flex text-center gap-6 my-4'>
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
                        { followers.length }
                    </h1>
                    <h1>
                        Followers
                    </h1>
                </div>
                <div onClick={showFollowing} className='cursor-pointer'>
                    <h1 className='text-2xl font-bold'>
                        { following.length }
                    </h1>
                    <h1>
                        Following
                    </h1>
                </div>
            </div>
            <div className="flex items-center gap-1">
                Member since
                <DateFormatter date={userInfo.createdAt} />
            </div>

            <ContentDisplayingModal
                isVisible={isModalVisible}
                onClose={closeModal}
                content={modalContent}
            />
        </div>
    )
}

export default ProfileInfo;