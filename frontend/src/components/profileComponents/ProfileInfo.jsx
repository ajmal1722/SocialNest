import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchFollowers } from "../../utils/api/follow_api";
import ContentDisplayingModal from "../reusable/ContentDisplayingModal";

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

    const showFollowing = () => {
        setModalContent(following);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setModalContent([]);
    };

    return (
        <div>
            <div className='flex my-4'>
                <h1 className='text-2xl font-semibold'>
                    { userInfo.name }
                </h1>
                <button className='px-4'>
                    Edit Profile
                </button>
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
            <h1>
                Member since July 2023
            </h1>

            <ContentDisplayingModal
                isVisible={isModalVisible}
                onClose={closeModal}
                content={modalContent}
            />
        </div>
    )
}

export default ProfileInfo;